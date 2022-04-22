import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Home from "./Screens/Home";
import Devices from "./Screens/Devices";
import Routines from "./Screens/Routines";
import Profiles from "./Screens/Profiles";
import History from "./Screens/History";
import "./MainLayout.scss";
const MainLayout = ({ comp }) => {
  const isLogged = useSelector((state) => state.token.isLogged);
  const socket = useSelector((state) => state.client.socket);
  const objComponents = {
    Home: <Home />,
    Devices: <Devices />,
    Routines: <Routines />,
    Profiles: <Profiles />,
    History: <History />,
  };
  const [isNavOpen, openNav] = useState(false); 
  return (
    <div className="app-container">
      {isLogged ? (
        <>
          <div
            className={isNavOpen ? "open" : "closed"}
            onMouseEnter={() => openNav(true)}
            onMouseLeave={() => openNav(false)}
          >
            <NavBar />
          </div>
          <div className={isNavOpen ? "short" : "long"}>
            <div className="cont">{objComponents[comp]}</div>
          </div>
        </>
      ) : (
        <Redirect to="/Register/Signin" />
      )}
    </div>
  );
};
export default MainLayout;
