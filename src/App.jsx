import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  RootLayout,
  NotFound,
  Welcome,
  HomeLayout,
  AdminLayout,
  EmployeeLayout,
  CustomerLayout,
} from "@/layouts";
import {
  CustomerWelcome,
  LoginUser,
  CustomerRegister,
  EmployeeRegister,
  User,
  UserGetById,
  EditUser,
  UpdateUserInfo,
  UpdateUserPassword,
  ForgotPassword,
  ResetPassword,
  Delivery,
  DeliveryGetById,
  EditDelivery,
  CreateDelivery,
  Product,
  ProductGetById,
  EditProduct,
  CreateProduct,
  Transaction,
  EditTransaction,
  TransactionAll,
  TransactionGetById,
  TransactionHistory,
  CreateTransaction,
  CartPreview,
  Comment,
  CommentGetById,
  EditComment,
  CreateComment,
  CommentAll,
  Dashboard,
} from "@/page";

import { ProtectedRoute, UnprotectedRoute } from "@/components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route element={<HomeLayout />}>
        <Route
          index
          element={
            <UnprotectedRoute>
              <Welcome />
            </UnprotectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <UnprotectedRoute>
              <LoginUser />
            </UnprotectedRoute>
          }
        />
        <Route
          path="customerRegister"
          element={
            <UnprotectedRoute>
              <CustomerRegister />
            </UnprotectedRoute>
          }
        />
        <Route
          path="employeeRegister"
          element={
            <UnprotectedRoute>
              <EmployeeRegister />
            </UnprotectedRoute>
          }
        />
        <Route
          path="forgotPassword"
          element={
            <UnprotectedRoute>
              <ForgotPassword />
            </UnprotectedRoute>
          }
        />
        <Route
          path="resetPassword/:id"
          element={
            <UnprotectedRoute>
              <ResetPassword />
            </UnprotectedRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="user"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <UserGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Delivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <DeliveryGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ProductGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactionAll"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TransactionAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TransactionGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="commentAll"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CommentAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CommentGetById />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Employee Routes */}
      <Route path="employee" element={<EmployeeLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/create"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <ProductGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/edit/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactionAll"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <TransactionAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <TransactionGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="commentAll"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <CommentAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <CommentGetById />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Customer Routes */}
      <Route path="customer" element={<CustomerLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerWelcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Admin", "Employee", "Customer"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/create"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CreateTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CartPreview />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactionHistory"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Comment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/create"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CreateComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/edit/:id"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <EditComment />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
