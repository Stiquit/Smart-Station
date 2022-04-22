/*Dependencies*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

/*Components */
import MainLayout from "./components/MainLayout";
import Landing from "./components/Screens/Landing";

import "materialize-css";

/**Fontawesome library */
library.add(fab, fas);
/**WebSocket server */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Register">
            <Landing />
          </Route>
          <Route path="/Home">
            <MainLayout comp={"Home"} />
          </Route>
          <Route path="/Devices">
            <MainLayout comp={"Devices"} />
          </Route>
          <Route path="/Routines">
            <MainLayout comp={"Routines"} />
          </Route>
          <Route path="/Profiles">
            <MainLayout comp={"Profiles"} />
          </Route>
          <Route path="/History">
            <MainLayout comp={"History"} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
