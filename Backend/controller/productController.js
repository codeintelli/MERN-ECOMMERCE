import { productModel, userModel } from "../models";
import { ErrorHandler, APIFeatures } from "../utils";
import cloudinary from "cloudinary";
const productController = {
  async AddProduct(req, res, next) {
    try {
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
      const imagesLink = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "eComProduct",
        });
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLink;
      req.body.user = req.user.id;
      const data = await userModel.findById(req.user.id);
      req.body.userEmail = data.email;
      const name_data = req.body.name.trim();
      const { price, description, category, Stock } = req.body;
      const product = await productModel.create({
        name: name_data,
        price,
        description,
        category,
        Stock,
        user: req.user.id,
        images: imagesLink,
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
  async AdminAllProducts(req, res, next) {
    try {
      let products = await productModel.find();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  async EditProduct(req, res, next) {
    try {
      console.log(req.body);
      let product = await productModel.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }
      // Images Start Here
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        req.body.images = imagesLinks;
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
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
