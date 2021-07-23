import React, { useContext } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/arya-orange/theme.css";
import "primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthContext } from "./useAuth";

function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" Component={Home} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
