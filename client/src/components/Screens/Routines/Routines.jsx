import React, { useState, useRef, useEffect } from "react";
import { useAxiosGet } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoutineContainer from "./RoutineContainer";
import "./Routines.scss";

const Routines = () => {
  const [content, setContent] = useState(0);
  const userRoutines = useAxiosGet("routines");

  const selectorRef = useRef(null);
  const contentMap = {
    0: {
      title: <h2>Manage your routines</h2>,
      content: userRoutines.success && (
        <div className="routine-container">
          {userRoutines.routines.map((r) => (
            <RoutineContainer routine={r} key={r._id} />
          ))}
        </div>
      ),
    },
    1: { title: <h2>Add new routines</h2>, content: <p>New routines</p> },
    2: { title: <h2>Find ew routines</h2>, content: <p> routines finder</p> },
  };
  useEffect(() => {
    if (selectorRef.current) {
      [...selectorRef.current.children].forEach((child, index) =>
        content === index
          ? child.classList.add("selected")
          : child.classList.remove("selected")
      );
    }
  }, [selectorRef, content]);
  return (
    <div className="routines">
      {contentMap[content].title}
      <div className="card view-content">
        <div className="card-content">{contentMap[content].content}</div>
      </div>
      <div className="content-selectors" ref={selectorRef}>
        <button onClick={() => setContent(0)}>
          <FontAwesomeIcon icon={["fas", "home"]} />
        </button>
        <button onClick={() => setContent(1)}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
        <button onClick={() => setContent(2)}>
          <FontAwesomeIcon icon={["fas", "search"]} />
        </button>
      </div>
    </div>
  );
};
export default Routines;
