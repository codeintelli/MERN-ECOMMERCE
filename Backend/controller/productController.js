import { productModel, userModel } from "../models";
import { ErrorHandler, APIFeatures } from "../utils";

const productController = {
  async AddProduct(req, res, next) {
    try {
      req.body.user = req.user.id;
      const data = await userModel.findById(req.user.id);
      req.body.userEmail = data.email;
      const name_data = req.body.name.trim();
      const { price, description, category } = req.body;
      const product = await productModel.create({
        name: name_data,
        price,
        description,
        category,
        user: req.user.id,
        images: {
          public_id: "sample Image" || req.body.public_id,
          url: "Sample URL" || req.body.url,
        },
      });
      res.status(200).json({
        success: true,
        message: "Created Successfully",
        name_data: name_data,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
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
      let ProductCategories = await productModel
        .find({ __v: 0 }, { _id: 0, category: 1 })
        .distinct("category");

      const product = await apiFeature.query;
      res.status(200).json({
        success: true,
        product,
        productCount,
        resultPerPage,
        ProductCategories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
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
      res.status(200).json({ success: true, message: "Updated Successfully" });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
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
      res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
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
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
};

export default productController;
