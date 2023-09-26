import * as Yup from "yup";

const ResetPasswordSchema = Yup.object({
  Password: Yup.string()
    .min(8, "Too Short")
    .max(255, "Too Long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]+$/,
      "Must contain at least one uppercase letter, one digit and one special character"
    )
    .required("Required"),

  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    .required("Required")
});

export default ResetPasswordSchema;
