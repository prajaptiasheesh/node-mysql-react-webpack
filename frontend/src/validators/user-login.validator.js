import * as yup from "yup";


const loginSchema = yup.object({
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup.string().required('Please enter a password'),
  }); 

export default loginSchema