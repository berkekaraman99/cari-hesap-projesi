import yup from "yup";

export const createCustomerValidator = yup.object().shape({
  customerName: yup.string().required().min(8).max(255),
  taxNumber: yup.string().min(10).max(11),
});
