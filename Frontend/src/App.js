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
  Dashboard,
  OrderDetails,
  ProductList,
  OrderList,
  NewProduct,
  UpdateProduct,
  ProcessOrder,
  UsersList,
  UpdateUser,
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
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid Sans", "Chilanka"],
    //   },
    // });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        {/* product routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/product-list/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        {/* core routes */}
        <Route exact path="/account" component={LoginSignup} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        {/* cart routes */}
        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
        <ProtectedRoute
          exact
          path="/password/edit"
          component={ChangePassword}
        />
        {/* shipping routes */}
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        {/* order routes */}
        <ProtectedRoute
          exact
          path="/userorder/confirm"
          component={ConfirmOrder}
        />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <ProtectedRoute
          exact
          path="/userorder/success"
          component={OrderSuccess}
        />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        {/* Admin Routes */}
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path="/admin/orders/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
      </Router>
    </>
  );
};

export default App;
