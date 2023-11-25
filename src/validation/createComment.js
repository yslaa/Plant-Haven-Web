import * as yup from "yup";

export default yup.object({
  ratings: yup.string("Enter your Ratings ").required("Ratings  is required"),
  text: yup.string("Enter your Text").required("Text is required"),
});