import * as yup from 'yup';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email( "* Email must be valid; ex: example@gmail.com" )
    .required( "Email is required" ),
  name: yup
    .string()
    .min( 3, "* Name must be at least 3 characters long" )
    .required( "Name is Required" ),
  password: yup
    .string()
    .min( 3, "* Password must be at least 3 characters" )
    .required( "Password is Required" ),
  terms: yup
    .boolean()
    .oneOf( [true], "* You must accept the Terms and Conditions" )
})

export default formSchema;