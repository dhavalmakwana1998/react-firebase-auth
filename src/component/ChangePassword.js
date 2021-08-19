import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";

const ChangePassword = () => {
  const [register, setRegister] = useState({
    nwPassword: "",
    cnPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useAuth();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { nwPassword, cnPassword } = register;
    if (nwPassword !== cnPassword) {
      toast.error("password do not match");
    } else {
      try {
        setLoading(true);
        await updatePassword(nwPassword);
        toast.success("Changed Successfully");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      }
    }
    setLoading(false);
  };
  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="p-4 w-100" style={{ maxWidth: "360px" }}>
        <h2 className="my-2">Change Password </h2>

        <Form onSubmit={onHandleSubmit}>
          <Form.Group id="nwPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              onChange={onInputChange}
              name="nwPassword"
              value={register.nwPassword}
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
            Change
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
