import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosGetRequest } from "./utils";
import { Link, useLocation, useHistory } from "react-router-dom";
import smallLogo from "../images/StLogo.png";
import bigLogo from "../images/LogoBlue.png";
import "./NavBar.scss";
const NavBar = ({}) => {
  const navRef = useRef();
  let location = useLocation();
  let history = useHistory();
  const user = useSelector((state) => state.token.user);
  const dispatcher = useDispatch();
  const handleLogOut = async () => {
    const resp = await axiosGetRequest("users/logout");
    if (resp.success) {
      dispatcher({
        type: "DELETE_TOKEN",
      });
    }
  };
  useEffect(() => {
    [...navRef.current.children].forEach((c) =>
      c.children[1].innerText === location.pathname.replace("/", "")
        ? c.classList.add("selected")
        : c.classList.remove("selected")
    );
  }, [location, navRef]);

  return (
    <div className="nav-bar">
      <div className="section img-holder" onClick={() => history.push("/Home")}>
        <img src={smallLogo} alt="SmartSt logo" />
        <p>SmartHome</p>
      </div>
      <div className="navigation" ref={navRef}>
        <div className="section" onClick={() => history.push("/Home")}>
          <FontAwesomeIcon icon={"home"} />
          <p>Home</p>
        </div>
        <div className="section" onClick={() => history.push("/Devices")}>
          <FontAwesomeIcon icon={["fas", "tablet-alt"]} />
          <p>Devices</p>
        </div>
        <div className="section" onClick={() => history.push("/Routines")}>
          <FontAwesomeIcon icon={["fas", "recycle"]} />
          <p>Routines</p>
        </div>
        <div className="section" onClick={() => history.push("/Profiles")}>
          <FontAwesomeIcon icon={["fas", "lightbulb"]} />
          <p>Profiles</p>
        </div>
        <div className="section" onClick={() => history.push("/History")}>
          <FontAwesomeIcon icon={["fas", "history"]} />
          <p>History</p>
        </div>
      </div>
      <div className="section profile">
        <div>
          <span></span>
          <span className="user">{user.user.charAt(0)}</span>
        </div>
        <p>{user.user}</p>
        <FontAwesomeIcon icon={["fa", "sign-out-alt"]} onClick={handleLogOut} />
      </div>
    </div>
  );
};
export default NavBar;
