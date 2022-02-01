// Layout folder Routes
export { default as Header } from "./Layout/Header";
export { default as UserOption } from "./Layout/Header/UserOption";
// Home folder Routes
export { default as Home } from "./Home";
// Product folder Routes
export { default as ProductDetails } from "./Product/ProductDetails";
export { default as Products } from "./Product/Products";
export { default as Search } from "./Product/Search";
// User folder Routes
export { default as LoginSignup } from "./User/LoginSignup";
export { default as Profile } from "./User/Profile";
export { default as EditProfile } from "./User/EditProfile";
export { default as ChangePassword } from "./User/ChangePassword";
export { default as ForgotPassword } from "./User/ForgotPassword";
export { default as ResetPassword } from "./User/ResetPassword";
// ProtectedRoute folder Routes
export { default as ProtectedRoute } from "./Route/protectedRoute";
// Cart folder Routes
export { default as Cart } from "./Cart/Cart";
export { default as Shipping } from "./Cart/Shipping";
export { default as ConfirmOrder } from "./Cart/ConfirmOrder";
export { default as Payment } from "./Cart/Payment";
export { default as OrderSuccess } from "./Cart/OrderSuccess";

// order routes
export { default as MyOrders } from "./Order/MyOrders";
export { default as OrderDetails } from "./Order/OrderDetails";

// ADMIN ROUTES
export { default as Dashboard } from "./Admin/Dashboard";
export { default as ProductList } from "./Admin/ProductList";
export { default as NewProduct } from "./Admin/NewProduct";
export { default as UpdateProduct } from "./Admin/UpdateProduct";
export { default as OrderList } from "./Admin/OrderList";
export { default as ProcessOrder } from "./Admin/ProcessOrder";
export { default as UsersList } from "./Admin/UsersList";
export { default as UpdateUser } from "./Admin/UpdateUser";
export { default as ProductReviews } from "./Admin/ProductReviews";
