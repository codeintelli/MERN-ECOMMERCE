import React from "react";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../Actions/orderAction";
import "./productList.css";
import Sidebar from "./Sidebar";

import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_ORDER_REQUEST } from "../../Constants/orderConstant";
const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  let deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "OrderID",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "proname", headerName: "Product Name", minWidth: 150, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.5 },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 250,
    },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 250 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      type: "number",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/orders/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteOrderHandler(params.getValue(params.id, "id"));
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      const data = item.totalPrice;
      console.log(item);
      let prod_name = item.orderItems.map((item) => item.name);
      // const data = (Math.round(item.totalPrice * 100) / 100).toLocaleString();
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        proname: prod_name.toString(),
        email: item.user.email,
        amount: `₹${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      });
    });

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_REQUEST });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  return (
    <>
      <MetaData title={`Admin | All Orders`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
