import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RgbaColorPicker } from "react-colorful";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Switch from "react-switch";
const DeviceContainer = ({ device }) => {
  const [isOn, setOn] = useState(false);
  const [isDone, setDone] = useState(false);
  const user = useSelector((state) => state.token.user._id);
  const ioSocket = useSelector((state) => state.client.socket);
  const dispatch = useDispatch();
  const [devColor, setDevColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [modalState, setModal] = useState(false);
  const mapTypeToIcon = {
    light: ["fas", "lightbulb"],
    tv: ["fas", "tv"],
    rgb: ["fas", "lightbulb"],
    coffee: ["fas", "mug-hot"],
    lamp: ["fas", "lightbulb"],
  };
  const turnHandler = (state) => {
    const payload =
      device.type === "rgb"
        ? `${devColor.r.toString().padStart(3, "0")} ${devColor.g
            .toString()
            .padStart(3, "0")} ${devColor.b.toString().padStart(3, "0")} ${
            state ? (devColor.a * 100).toString().padStart(3, "0") : "000"
          } ${device.number.toString().padStart(2, "0")}`
        : `${state ? 1 : 0} ${device.number.toString().padStart(2, "0")}`;
    const data = {
      user: user,
      topic: device.topic,
      device: device._id,
      name: `${state ? "ON" : "OFF"} ${device.name}`,
      payload: payload,
    };
    dispatch({
      type: "SEND",
      payload: {
        event: "device",
        data: data,
      },
    });
  };
  const onChangeHandler = () => {
    setOn(!isOn);
    isOn ? turnHandler(false) : turnHandler(true);
  };
  const modalCloseHandler = () =>
    isOn ? (setModal(false), turnHandler(true)) : setModal(false);

  useEffect(() => {
    isOn &&
      ioSocket.on("reply", (a) => {
        setDone(a === "true");
      });
    return () => {
      isOn && ioSocket.off("reply");
    };
  }, [isOn]);
  return (
    <>
      <div className="section card">
        <div className="icon">
          {isOn ? (
            isDone ? (
              <FontAwesomeIcon
                icon={mapTypeToIcon[device.type]}
                style={{
                  color:
                    device.type === "rgb"
                      ? `rgba(${devColor.r},${devColor.g},${devColor.b},${devColor.a})`
                      : "#f5f3f4",
                  fontSize: "50px",
                }}
              />
            ) : (
              <CircularProgress size="40px" color="#979dac" thickness={2} />
            )
          ) : (
            <FontAwesomeIcon icon={mapTypeToIcon[device.type]} />
          )}
        </div>
        <p>{device.name}</p>
        <p>{device.group && device.group.name}</p>
        <div className="state-cont">
          <Switch
            onChange={onChangeHandler}
            checked={isOn}
            uncheckedIcon={false}
            className={"switch"}
            checkedIcon={false}
            onColor="#f5f3f4"
            offColor="#7D8597"
            onHandleColor="#7D8597"
            offHandleColor="#f5f3f4"
          />
          {device.type === "rgb" && (
            <FontAwesomeIcon
              icon={["fas", "tint"]}
              style={
                isOn && {
                  color: `rgba(${devColor.r},${devColor.g},${devColor.b},${devColor.a})`,
                }
              }
              onClick={() => setModal(true)}
            />
          )}
        </div>
      </div>
      <Modal open={modalState} onClose={modalCloseHandler}>
        <div className="card modal-container">
          <h3>Pick a color</h3>
          <RgbaColorPicker color={devColor} onChange={setDevColor} />
          <button onClick={modalCloseHandler}>ok</button>
        </div>
      </Modal>
    </>
  );
};
export default DeviceContainer;
