import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";

const Signup = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    cnPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup, currentUser } = useAuth();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, cnPassword } = register;
    if (password !== cnPassword) {
      toast.error("password do not match");
    } else {
      setLoading(true);
      try {
        const res = await signup(email, password);
        if (res) {
          history.push("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
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
        <h2 className="my-2">Sign Up </h2>

        <Form onSubmit={onHandleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={onInputChange}
              value={register.email}
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
              value={register.password}
              required
            />
          </Form.Group>
          <Form.Group id="cnPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="cnPassword"
              onChange={onInputChange}
              value={register.cnPassword}
              type="text"
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
            Register
          </Button>
        </Form>
        <hr />
        <div className="w-100 text-center my-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
