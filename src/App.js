import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import ForgotPassword from "./component/ForgotPassword";
import ChangePassword from "./component/ChangePassword";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} newestOnTop={false} pauseOnHover />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute
              exact
              path="/changepassword"
              component={ChangePassword}
            />

            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              render={() => {
                return <h1 className="text-center">Not Found</h1>;
              }}
            />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
