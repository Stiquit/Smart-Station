import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Action = ({ action }) => {
  const mapTypeToIcon = {
    light: ["fas", "lightbulb"],
    tv: ["fas", "tv"],
    rgb: ["fas", "lightbulb"],
    coffee: ["fas", "mug-hot"],
    lamp: ["fas", "lightbulb"],
  };

  return (
    <div className="card action">
      <FontAwesomeIcon
        icon={
          action.device ? mapTypeToIcon[action.device.type] : ["fas", "recycle"]
        }
      />
      <p>{action._id}</p>
      <p>
        Activated: <span>{action.howMany}</span> times
      </p>
    </div>
  );
};

export default Action;
