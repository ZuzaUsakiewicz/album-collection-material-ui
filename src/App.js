import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Albums from "./pages/Albums";
import CreateAlbum from "./pages/CreateAlbum";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Albums />
        </Route>
        <Route path="/createalbum">
          <CreateAlbum />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
