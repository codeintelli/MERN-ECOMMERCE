import React from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../Actions/productAction";
import { getAllOrders } from "../../Actions/orderAction";
import { getAllUsers } from "../../Actions/userAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProduct);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUser);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  React.useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  let lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#3498db", "#2ecc71"],
        hoverBackgroundColor: ["#2980b9", "#27ae60"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>User</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
