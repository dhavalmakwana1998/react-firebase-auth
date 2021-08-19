import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <div className="row my-4 justify-content-center">
        <Card className="p-4 w-100" style={{ maxWidth: "360px" }}>
          <h5 className="my-2">Dashboard</h5>
          <h4 className="text-success">
            {currentUser?.email}
            <br /> You are loged in successfully!
          </h4>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
