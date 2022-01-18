import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../Images/fossa.png";
const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "10vmax",
  navColor1: "#635dc0",
  logoHoverSize: "10px",
  logoHoverColor: "#635dc0",
  // logoHoverColor: "#000",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#000",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "white",
  searchIconColor: "white",
  cartIconColor: "white",
  profileIconColorHover: "#000",
  searchIconColorHover: "#000",
  cartIconColorHover: "#000",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <div>
      <ReactNavbar {...options} />
    </div>
  );
};

export default Header;
