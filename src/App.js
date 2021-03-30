import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Albums from "./pages/Albums";
import CreateAlbum from "./pages/CreateAlbum";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Albums />
            </Route>
            <Route path="/createalbum">
              <CreateAlbum />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
