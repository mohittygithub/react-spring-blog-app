import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homePage";
import NewUserPage from "./pages/login-logout/newUserPage";
import UpdateUserPage from "./pages/homepage/updateUserPage";
import LoginPage from "./pages/login-logout/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users/new" component={NewUserPage} />
        <Route path="/users/update/:id" component={UpdateUserPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={NewUserPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
