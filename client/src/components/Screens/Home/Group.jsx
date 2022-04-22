import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Group = ({ name, devices }) => {
  const mapTypeToIcon = {
    light: ["fas", "lightbulb"],
    tv: ["fas", "tv"],
    rgb: ["fas", "lightbulb"],
    coffee: ["fas", "mug-hot"],
    lamp: ["fas", "lightbulb"],
  };
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="card group">
      <h3 onClick={() => setOpen(!isOpen)}>{name}</h3>
      <div className="devs" style={{ display: isOpen ? "flex" : "none" }}>
        {devices.map((d) => (
          <div className="dev card" key={d._id}>
            <FontAwesomeIcon icon={mapTypeToIcon[d.type]} />
            <p>{d.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
