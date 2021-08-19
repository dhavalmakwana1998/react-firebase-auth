import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const { resetPassword, currentUser } = useAuth();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email)
      .then((res) => {
        setAlert("Please Check you email for reset link.");
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          toast.error("Email not valid");
        } else {
          toast.error("Something went wrong!");
        }
        setLoading(false);
      });
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
        <h2 className="my-2">Forgot Password</h2>
        {alert && <Alert variant="success">{alert}</Alert>}
        <Form onSubmit={onHandleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
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
            Forgot Password
          </Button>
        </Form>
        <hr />
        <div className="w-100 text-center my-2">
          Back to <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
