import yup from "yup";

export const createReceiptValidator = yup.object().shape({
  price: yup.number().required(),
  description: yup.string().notRequired().max(512),
});
