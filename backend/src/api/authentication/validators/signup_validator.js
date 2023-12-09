import yup from "yup";

export const signUpValidator = yup.object().shape({
  companyName: yup.string().required().min(8).max(255),
  userName: yup.string().required().min(6).max(32),
  password: yup.string().min(6).max(32),
  taxNumber: yup.string().min(10).max(11),
  taxAdministration: yup.string().required().max(255),
  taxAdministrationCity: yup.string().required().max(255),
});
