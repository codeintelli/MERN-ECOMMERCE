import React, { useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../Actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../Constants/productConstant";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.EditDelProduct);
  const { product, error } = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Laptop",
    "Cloths",
    "Watch",
    "AI Products",
    "Camera",
    "Speaker",
    "SmartPhone",
    "Shoes",
    "Accessories",
    "Smart Watch",
  ];

  const productID = match.params.id;
  let updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(match.params.id, myForm));
  };

  let updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setOldImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  React.useEffect(() => {
    if (product && product._id !== productID) {
      dispatch(getProductDetails(productID));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push(`/product-list/${productID}`);
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    error,
    history,
    dispatch,
    isUpdated,
    product,
    productID,
    updateError,
  ]);

  return (
    <>
      <MetaData title={`Create Product`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => {
                  return (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="crateProductFormFile">
              <input
                type="file"
                name="avatar"
                onChange={updateProductImagesChange}
                multiple
                accept="image/*"
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => {
                return (
                  <img key={index} src={image} alt="New Product Preview" />
                );
              })}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
