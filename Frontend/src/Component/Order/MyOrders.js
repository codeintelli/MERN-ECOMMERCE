import React from "react";
import "./myOrder.css";
import Loader from "../Layout/Loader";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import DescriptionIcon from "@material-ui/icons/Description";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.getOrder);
  const { user } = useSelector((state) => state.user);
  let rows = [];

  let columns = [
    {
      field: "id",
      headerName: "OrderID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 250,
    },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 250 },
    {
      field: "actions",
      headerName: "Bill",
      flex: 0.3,
      minWidth: 50,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <DescriptionIcon />
          </Link>
        );
      },
    },
  ];

  orders &&
    orders.forEach((item, index) => {
      const data = item.totalPrice;
      let prod_name = item.orderItems.map((item) => item.name);
      // const data = (Math.round(item.totalPrice * 100) / 100).toLocaleString();
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        name: prod_name.toString(),
        amount: `₹${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      });
    });

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <MetaData title={`${user.name}-Orders`} />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
