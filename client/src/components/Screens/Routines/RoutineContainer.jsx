import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import { useDate } from "../../utils";
const RoutineContainer = ({ routine }) => {
  const mapTypeToIcon = {
    light: ["fas", "lightbulb"],
    tv: ["fas", "tv"],
    rgb: ["fas", "lightbulb"],
    coffee: ["fas", "mug-hot"],
    lamp: ["fas", "lightbulb"],
  };
  const timeMapper = {
    ms: 1,
    s: 1000,
    min: 60000,
    h: 3600000,
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.token.user._id);
  const ioSocket = useSelector((state) => state.client.socket);
  const [isOpen, setOpen] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const activationDate = useDate(routine.day, routine.hour, routine.minutes);
  const handleRoutine = () => {
    setRunning(true);
    var actions = [];
    routine.actions.forEach((a) => {
      actions.push({
        topic: a.topic,
        type: a.topic === "wait" ? "time" : "turn",
        payload:
          a.topic === "wait"
            ? a.payload.split(" ")[0] * timeMapper[a.payload.split(" ")[1]]
            : a.payload,
        device: a.device && a.device._id,
      });
    });
    const data = {
      user: user,
      actions: actions,
      routine: routine._id,
      name: routine.name,
    };
    dispatch({
      type: "SEND",
      payload: {
        event: "routine",
        data: data,
      },
    });
  };
  useEffect(() => {
    isRunning &&
      ioSocket.on("routineReply", (a) => {
        a === "true" && setRunning(!isRunning);
      });
    return () => {
      isRunning && ioSocket.off("routineReply");
    };
  }, [isRunning]);
  return (
    <div className="card routine">
      <div className={`card-content ${isOpen ? "expanded" : "closed"}`}>
        {isRunning ? (
          <CircularProgress size="60px" color="#979dac" thickness={5} />
        ) : (
          <>
            <h4 onClick={() => setOpen(!isOpen)}>{routine.name}</h4>
            <FontAwesomeIcon icon={["fas", "edit"]} className="svg edit" />
            <FontAwesomeIcon
              icon={["fas", "trash-alt"]}
              className="svg delete"
            />
            <div className="actions">
              {routine.actions.map((a) => (
                <div className=" action" key={a._id}>
                  {a.device ? (
                    a.topic === "switch" ? (
                      <>
                        <FontAwesomeIcon
                          icon={["fas", "power-off"]}
                          style={{
                            color: a.payload.split(" ")[0] === "1" && "#f5f3f4",
                          }}
                        />
                        <p
                          style={{
                            color: a.payload.split(" ")[0] === "1" && "#f5f3f4",
                          }}
                        >
                          {a.payload.split(" ")[0] === "1" ? "ON" : "OFF"}
                        </p>
                        <span>{a.device.name}</span>
                        <FontAwesomeIcon
                          icon={mapTypeToIcon[a.device.type]}
                          style={{
                            color: a.payload.split(" ")[0] === "1" && "#f5f3f4",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={["fas", "power-off"]}
                          style={{
                            color:
                              a.payload.split(" ")[3] > 0
                                ? `rgba(${a.payload.split(" ")[0]},${
                                    a.payload.split(" ")[1]
                                  },${a.payload.split(" ")[2]},${
                                    a.payload.split(" ")[3]
                                  })`
                                : "#5c677d",
                          }}
                        />
                        <p
                          style={{
                            color: a.payload.split(" ")[3] > 0 && "#f5f3f4",
                          }}
                        >
                          {a.payload.split(" ")[3] > 0 ? "ON" : "OFF"}
                        </p>
                        <span>{a.device.name}</span>

                        <FontAwesomeIcon
                          icon={mapTypeToIcon[a.device.type]}
                          style={{
                            color:
                              a.payload.split(" ")[3] > 0
                                ? `rgba(${a.payload.split(" ")[0]},${
                                    a.payload.split(" ")[1]
                                  },${a.payload.split(" ")[2]},${
                                    a.payload.split(" ")[3]
                                  })`
                                : "#5c677d",
                          }}
                        />
                      </>
                    )
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={["fas", "stopwatch"]}
                        style={{
                          color: "#f5f3f4",
                        }}
                      />
                      <p>wait for</p>
                      <span>{a.payload.split(" ")[0]}</span>
                      <p>{a.payload.split(" ")[1]}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <span className="date">Activated at: {activationDate}</span>
            <button onClick={handleRoutine}>
              <FontAwesomeIcon icon={["fas", "play"]} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default RoutineContainer;
