import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { RgbaColorPicker } from "react-colorful";
import axios from "axios";

const SingleDevice = ({ device, client }) => {
  const [isFetching, setFetched] = useState(false);
  const [show, setShow] = useState(false);
  const [devState, setDevState] = useState(false);
  const [devColor, setDevColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const user = useSelector((state) => state.token.user);

  const colorPickerHandler = () => setShow(!show);
  useEffect(() => {
    client.onmessage = (message) => {
      console.log(JSON.parse(message.data));
      JSON.parse(message.data).Reply === "true"
        ? setTimeout(() => setFetched(false), 1000)
        : setTimeout(() => setFetched(true), 1000);
    };
  });
  const turnHandler = () => {
    setFetched(true);
    const r = devColor.r.toString().padStart(3, "0");
    const g = devColor.g.toString().padStart(3, "0");
    const b = devColor.b.toString().padStart(3, "0");
    const a = devState
      ? show
        ? (devColor.a * 100).toString().padStart(3, "0")
        : "000"
      : (devColor.a * 100).toString().padStart(3, "0");
    const number = device.number.toString().padStart(2, "0");
    var data = JSON.stringify({
      user: user._id,
      topic: device.topic,
      device: device._id,
      payload:
        device.type === "rgb"
          ? `${r} ${g} ${b} ${a} ${number}`
          : `${devState ? 0 : 1} ${number}`,
      action: `${show ? 1 : devState ? 0 : 1}`,
    });
    client.send(data);
  };

  const typeHandler = (type = "") => {
    switch (type) {
      case "coffee":
        return "mug-hot";
      case "tv":
        return "tv";
      case "rgb":
        return "tint";
      default:
        return ["fa", "lightbulb"];
    }
  };
  return (
    <div className=" col l4 card device-wrapper">
      <div className="card-content device-container">
        {isFetching ? (
          <CircularProgress size={30} />
        ) : (
          <FontAwesomeIcon
            icon={typeHandler(device.type)}
            style={
              device.type === "rgb" &&
              devState && {
                color: `rgba(${devColor.r},${devColor.g},${devColor.b},${devColor.a})`,
              }
            }
            className={`dev-icon  ${devState ? "on" : "off"}`}
          />
        )}
        {isFetching ? (
          <CircularProgress size={30} />
        ) : (
          <h3 className={devState ? "on" : "off"}>{device.name}</h3>
        )}
        <div>
          <div className="buttons-container">
            <button
              className={"power-button"}
              onClick={() => {
                setDevState(!devState);
                turnHandler();
              }}
            >
              {isFetching ? (
                <CircularProgress size={25} />
              ) : devState ? (
                <FontAwesomeIcon icon={"toggle-on"} />
              ) : (
                <FontAwesomeIcon icon={"toggle-off"} />
              )}
            </button>
            {device.type === "rgb" && (
              <button className="brigth-button" onClick={colorPickerHandler}>
                <FontAwesomeIcon
                  icon={"palette"}
                  style={{
                    color: `rgba(${devColor.r},${devColor.g},${devColor.b},${devColor.a})`,
                  }}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {device.type === "rgb" && show && (
        <RgbaColorPicker
          color={devColor}
          onMouseLeave={() => {
            setShow(!show);
            devState && turnHandler();
          }}
          onChange={setDevColor}
          className={show ? "active" : ""}
        />
      )}
    </div>
  );
};
export default SingleDevice;
