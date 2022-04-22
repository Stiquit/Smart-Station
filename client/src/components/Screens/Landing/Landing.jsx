import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoBig from "../../../images/LogoBlue.png";
import LogoUMNG from "../../../images/LOGO_UMNG.png";
import PreBg from "../../../images/register-bg.jpg";
import Form from "./Form.jsx";
import "./Landing.scss";
const Landing = () => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const pathToForm = {
    "/Register/Signin": (
      <Form
        type="Sign in"
        inputs={{
          si_0: {
            name: "username",
            type: "text",
            label: "Username",
            placeholder: "username",
          },
          si_1: {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "password",
          },
          si_2: { type: "submit" },
        }}
        btns={{
          sib_0: {
            html: <p>Forgot your password?</p>,
            onClick: () => history.push("/Register/Recover"),
          },
          sib_1: {
            html: (
              <p>
                Are you new here? <span>Sign up</span>
              </p>
            ),
            onClick: () => history.push("/Register/Signup"),
          },
        }}
        submitFnc={setUser}
      />
    ),
    "/Register/Signup": (
      <Form
        type="Sign up"
        inputs={{
          su_0: {
            name: "username",
            type: "text",
            label: "Username",
            placeholder: "username",
          },
          su_1: {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "password",
          },
          su_2: {
            name: "fullname",
            label: "Full name",
            type: "text",
            placeholder: "full name",
          },
          su_3: { type: "submit" },
        }}
        btns={{
          sub_0: {
            html: (
              <p>
                Already have an account? <span>Sign in</span>
              </p>
            ),
            onClick: () => history.push("/Register/Signin"),
          },
        }}
        submitFnc={setUser}
      />
    ),
    "/Register/Recover": (
      <Form
        type="Recover password"
        inputs={{
          su_0: {
            name: "username",
            type: "text",
            label: "Username",
            placeholder: "username",
          },
          su_1: { type: "submit" },
        }}
        btns={{
          sub_0: {
            html: <p>Go back</p>,
            onClick: () => history.goBack(),
          },
        }}
        submitFnc={setUser}
      />
    ),
  };
  useEffect(() => {
    if (user.token) {
      dispatch({
        type: "ADD_TOKEN",
        payload: { token: user.token, user: user.user },
      });
      history.push("/Home");
    }
  }, [user]);

  return (
    <div className="landing">
      <div
        className="presentation"
        style={{ backgroundImage: `url(${PreBg})` }}
      >
        <div className="op"></div>
        <div className="info">
          <img src={LogoBig} alt="SmartSt logo big" />
          <div>
            <h2>
              <span> Automate</span> your home
            </h2>
            <h2>
              Improve your <span>life</span>
            </h2>
          </div>
          <img src={LogoUMNG} alt="UMNG logo" />
        </div>
      </div>
      <div className="form">{pathToForm[location.pathname]}</div>
    </div>
  );
};
export default Landing;
