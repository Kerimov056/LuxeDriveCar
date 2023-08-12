import * as Yup from "yup";



const registerSchema = Yup.object({

    fullName: Yup.string()
    .min(2,"Too Short")
    .max(120, "Too Long")
    .required("Required"),

    userName: Yup.string()
    .min(3,"Too Short")
    .max(255, "Too Long")
    .required("Required"),

    email: Yup.string()
    .email()
    .min(5,"Too Short!")
    .max(255,"Too Long")
    .required("Required"),

    password: Yup.string()
    .min(5,"Too Short")
    .max(255,"Too Long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
        message: "1 upper case letter, 1 lower case letter, 1 numeric digit.",
      })
    .required("Required")
});

export default registerSchema