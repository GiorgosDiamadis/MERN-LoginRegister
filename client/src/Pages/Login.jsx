import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../useAuth";

const { postRequest } = require("../RequestController");
const { addClass, removeClass } = require("../domManipulation");

export default function Login(props) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  const auth = useContext(AuthContext);

  const handleOnClick = () => {
    setIsLoading(true);
    postRequest("user/login", { ...loginData }).then((response) => {
      setIsLoading(false);
      const errorMessages = response.data.error;
      if (errorMessages) {
        Object.keys(errorMessages).forEach((key) => {
          addClass(key, "p-invalid");
          removeClass(`${key}-help`, "invisible");
        });
      } else {
        auth.login(
          {
            ...response.data.user,
          },
          response.headers.authorization
        );
        history.push("/");
      }
    });
  };

  return (
    <div
      className="p-d-flex p-flex-row p-jc-center p-ai-center"
      style={{ height: "100vh" }}
    >
      <Card
        title="Log in"
        className="p-shadow-10 p-p-3 login-register-card"
        id="login"
      >
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
          <div className="p-inputgroup ">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <span className="p-float-label">
              <InputText
                id="username"
                tooltip="Enter your username"
                tooltipOptions={{ position: "top" }}
                aria-describedby="username-help"
                onChange={(e) => {
                  removeClass("username", "p-invalid");
                  addClass(`username-help`, "invisible");
                  setLoginData((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
              />
              <label htmlFor="username">Username</label>
            </span>
          </div>
          <small id="username-help" className="p-error p-mr-auto invisible">
            Username is empty.
          </small>
          <div className="p-mt-4 p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <span className="p-float-label">
              <InputText
                id="password"
                tooltip="Enter your password"
                tooltipOptions={{ position: "top" }}
                aria-describedby="password-help"
                onChange={(e) => {
                  removeClass("password", "p-invalid");
                  addClass(`password-help`, "invisible");
                  setLoginData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                type="password"
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <small id="password-help" className="p-error p-mr-auto invisible">
            Password is empty.
          </small>

          <small id="login-help" className="p-error invisible">
            Username or password is incorrect.
          </small>
          <Button
            label="Log in"
            loading={isLoading}
            className="p-mt-2"
            onClick={handleOnClick}
          />
        </div>

        <Button
          label="I don't have an account"
          className="p-button-text p-mr-auto p-ml-auto p-d-block p-mt-2"
          onClick={() => history.push("/register")}
        />
      </Card>
    </div>
  );
}
