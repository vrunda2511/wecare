import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/HomePage.jsx";
import "antd/dist/antd.css";
import SignInPage from "./views/sign-in-sign-up-page/sign-in.component";
import SignUpPage from "./views/sign-in-sign-up-page/sign-up.component";
import SubServeicePage from "./views/subServicePage/subServicePage";
import OrderPage from "./views/ordersPage/orderPage";
import ProfilePage from "./views/Profilepage/profilepage";
import ForgetPassword from "./views/ForgetPasswordpage/Forgetpassword";
import ResetPassword from "./views/ResetPasswordPage/ResetPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/orders" component={OrderPage} />
        <Route path="/ForgetPassword" component={ForgetPassword} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route
          path="/subservices"
          component={props => <SubServeicePage {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
