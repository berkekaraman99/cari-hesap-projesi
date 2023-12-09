import yup from "yup";

export const loginValidator = yup.object().shape({
  userName: yup.string().required().min(6).max(20),
  password: yup.string().required().min(6).max(32),
});
