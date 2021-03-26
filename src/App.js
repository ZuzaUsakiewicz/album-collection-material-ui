import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Albums from "./pages/Albums";
import CreateAlbum from "./pages/CreateAlbum";

function App() {
  return (
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
  );
}

export default App;
