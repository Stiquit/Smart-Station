import { useAxiosGet } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Group from "./Group";
import Action from "./Action";
import "./Home.scss";
const Home = () => {
  const groups = useAxiosGet("devices/groups");
  const topActions = useAxiosGet("actions/top");
  return (
    <>
      <h2>Welcome to your smart home</h2>
      <div className="home-grid">
        <div className="card ai-container">
          <div className="card-content ">
            <span className="card-title">Card Title</span>
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
        </div>
        <div className="card routine-container">
          <div className="card-content ">
            <span className="card-title">Card Title</span>
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
        </div>
        <div className="card actions-container">
          <div className="card-content ">
            <h4>Frequently activated:</h4>
            <div className="actions">
              {topActions.success &&
                topActions.data.map((action) => (
                  <Action key={action._id} action={action} />
                ))}
            </div>
          </div>
        </div>
        <div className="card group-container">
          <div className="card-content ">
            <h4>Your groups</h4>
            {groups.success &&
              groups.groups.map((g) => (
                <Group
                  name={g.name}
                  devices={g.devices}
                  key={`${g.name}_group`}
                />
              ))}
            <button className="card">
              <FontAwesomeIcon icon={["fas", "plus"]} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
