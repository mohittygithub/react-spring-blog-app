import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homePage";
import NewUserPage from "./pages/newUserPage";
import UpdateUserPage from "./pages/homepage/updateUserPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users/new" component={NewUserPage} />
        <Route path="/users/update/:id" component={UpdateUserPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
