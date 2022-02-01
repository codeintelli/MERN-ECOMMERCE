import React from "react";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../Actions/productAction";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import { DELETE_PRODUCT_RESET } from "../../Constants/productConstant";
const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.adminProduct);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.EditDelProduct
  );

  let deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            {params.id}
            <Link
              to={`/product-list/${params.getValue(params.id, "id")}`}
              style={{
                color: "tomato",
                textDecoration: "none",
                marginLeft: "10px",
              }}
            >
              <VisibilityIcon />
            </Link>
          </>
        );
      },
    },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 250,
      type: "number",
      flex: 0.5,
    },
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteProductHandler(params.getValue(params.id, "id"));
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
  products &&
    products.forEach((item) =>
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: `₹ ${item.price}`,
        name: item.name,
      })
    );

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
      alert.success("Product Deleted Successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  return (
    <>
      <MetaData title={`Admin | All Products`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All products</h1>
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

export default ProductList;
