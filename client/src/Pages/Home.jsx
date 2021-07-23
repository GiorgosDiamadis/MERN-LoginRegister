import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../useAuth";
const { postRequest } = require("../RequestController");

export default function Home() {
  const { user } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    postRequest("/pipes", {})
      .then((res) => {
        console.log(res);
      })
      .catch((reason) => {
        const status = reason.response.status;
        if (status === 401) {
          history.push("/login");
        }
      });
  });

  return (
    <div>
      <h1 style={{ color: "white" }}>{user ? user.username : "guest"}</h1>
      <button
        onClick={() => {
          postRequest("/pipes", {})
            .then((res) => {
              console.log(res);
            })
            .catch((reason) => {
              const status = reason.response.status;
              if (status === 401) {
                history.push("/login");
              }
            });
        }}
      ></button>
    </div>
  );
}
