import { orderModel, productModel } from "../models";
import { ErrorHandler } from "../utils";

async function updateStock(id, quantity) {
  try {
    const product = await productModel.findById(id);
    // product.stock = product.stock - quantity
    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
}

const orderController = {
  // create new Order
  async createNewOrder(req, res, next) {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  //   Get Single Order
  async GetSingleOrder(req, res, next) {
    try {
      // here we are using populate means in database we have stored user id from that user id they will find in another table name user and from that table they can take name and email so in sql we can call it foreign key value
      const order = await orderModel
        .findById(req.params.id)
        .populate("user", "name email");

      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  //   Get Login User Order
  async GetLoginUserOrder(req, res, next) {
    try {
      const orders = await orderModel.find({ user: req.user._id });
      const totalOrder = await orderModel.countDocuments();
      res.status(200).json({
        success: true,
        totalOrder,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  //   Get All Order-Admin
  async GetAllOrder(req, res, next) {
    try {
      const orders = await orderModel.find();
      const totalOrder = await orderModel.countDocuments();
      let totalAmount = 0;

      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res.status(200).json({
        success: true,
        totalOrder: totalOrder,
        totalAmount,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  //   Update Order Status - admin
  async UpdateOrderStatus(req, res, next) {
    try {
      const order = await orderModel.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }

      if (order.orderStatus === "Delivered") {
        return next(
          new ErrorHandler("You have already delivered this order", 400)
        );
      }

      if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
  //   Delete Order - Admin
  async DeleteOrder(req, res, next) {
    try {
      const order = await orderModel.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }

      await order.remove();

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },
};

export default orderController;
