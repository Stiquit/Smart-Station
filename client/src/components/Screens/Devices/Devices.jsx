import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import DeviceContainer from "./DeviceContainer";
import "./Devices.scss";

const Devices = ({  }) => {
  const [devices, setDevices] = useState({ data: [], state: false });
  const user = useSelector((state) => state.token.user);
  const devs =
    devices.state &&
    devices.data.map((d) => (
      <DeviceContainer device={d} key={d._id}  />
    ));
  useEffect(() => {
    axios.get("http://localhost:8888/devices").then(
      (resp) => setDevices({ data: resp.data.devices, state: true }),
      (err) => console.error(err)
    );
  }, [user]);
  return (
    <div className="devices">
      <h2>Devices</h2>
      <div className="dev-cont card">
        <div className="legends">
          <p>Device</p>
          <p>Name</p>
          <p>Location</p>
          <p>State</p>
        </div>
        {devs}
      </div>
    </div>
  );
};
export default Devices;
