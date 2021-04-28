import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/navbar/header";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage";
import NewPostPage from "./pages/NewPostPage";
import MyPostsPage from "./pages/MyPostsPage";

toast.configure();
const App = () => {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login">
          {userInfo ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="/signup">
          {userInfo ? <Redirect to="/" /> : <SignupPage />}
        </Route>
        <Route path="/posts/my" component={MyPostsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/posts/new" component={NewPostPage} />
        <Route exact path="/" component={Homepage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
