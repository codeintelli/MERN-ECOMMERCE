import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { Home, Header, ProductDetails, Products } from "./Component";
const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
      </Router>
    </>
  );
};

export default App;
