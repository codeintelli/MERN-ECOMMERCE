import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import {
  Home,
  Header,
  ProductDetails,
  Products,
  Search,
  LoginSignup,
  UserOption,
  Profile,
  ProtectedRoute,
  EditProfile,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  Cart,
  OrderSuccess,
  ConfirmOrder,
  Shipping,
  Payment,
  MyOrders,
  OrderDetails,
} from "./Component";
import { loadUser } from "./Actions/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = React.useState("");
  async function getStripeApiKey() {
    const token_Data = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token_Data}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/stripeApikey",
      config
    );
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Route exact path="/" component={Home} />
        <Route exact path="/product-list/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/account" component={LoginSignup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
        <ProtectedRoute
          exact
          path="/password/edit"
          component={ChangePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <ProtectedRoute exact path="/order/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Router>
    </>
  );
};

export default App;
