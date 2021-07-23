import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../useAuth";

export default function PrivateRoute({ Component, ...rest }) {
  const user = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.user !== null ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
