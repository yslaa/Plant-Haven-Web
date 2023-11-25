import * as yup from "yup";

export default yup.object({
  company_name: yup.string("Enter your Company Name").required("Company Name is required"),
  date: yup
    .date("Enter a valid date")
    .required("Date is required"),
  price: yup
    .number("Enter a number")
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(10000, "Price must not exceed at 10000"),
  quantity: yup
    .number("Enter a number")
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .max(10000, "Quantity must not exceed at 10000"),
});