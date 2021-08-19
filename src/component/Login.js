import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, currentUser } = useAuth();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = user;
    try {
      const res = await login(email, password);
      if (res) {
        setLoading(false);
        toast.success("Login Successfully");
        history.push("/");
      }
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Email / Password Invalid");
      } else {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    }
  };
  if (currentUser) {
    return <Dashboard />;
  }
  return (
    <div
      className="bg-primary d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="p-4 w-100" style={{ maxWidth: "360px" }}>
        <h2 className="my-2">Login</h2>
        <Form onSubmit={onHandleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={onInputChange}
              value={user.email}
              type="email"
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              onChange={onInputChange}
              name="password"
              value={user.password}
              required
            />
          </Form.Group>
          <Button disabled={loading} className="my-2" type="submit">
            {loading && (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp;
              </>
            )}
            Login
          </Button>
          <hr />
          <div className="w-100 text-center my-2">
            <Link to="/forgotpassword">Forgot Password </Link>
          </div>
        </Form>
        <div className="w-100 text-center my-2">
          Need create an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
