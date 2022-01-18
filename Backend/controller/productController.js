import { productModel, userModel } from "../models";
import { ErrorHandler, APIFeatures } from "../utils";

const productController = {
  async AddProduct(req, res, next) {
    try {
      // console.log(req.body);
      req.body.user = req.user.id;
      const data = await userModel.findById(req.user.id);
      req.body.userEmail = data.email;
      const product = await productModel.create(req.body);
      res.status(200).json({ success: true, msg: "Created Successfully" });
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  },
  // Get All Product Details
  async AllProduct(req, res, next) {
    try {
      let resultPerPage = 8;
      let productCount = await productModel.countDocuments();
      const apiFeature = new APIFeatures(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
      // const product = await productModel.find();
      const product = await apiFeature.query;
      res.status(200).json({ success: true, product, productCount });
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  },
  async EditProduct(req, res, next) {
    try {
      let product = await productModel.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ success: true, msg: "Updated Successfully" });
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  },

  // Remove Product
  async RemoveProduct(req, res, next) {
    try {
      let product = await productModel.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      product = await productModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, msg: "Deleted Successfully" });
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  },

  async SpecificProduct(req, res, next) {
    try {
      let product = await productModel.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      product = await productModel.findById(req.params.id);
      res.status(200).json({ success: true, product });
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  },
};

export default productController;
