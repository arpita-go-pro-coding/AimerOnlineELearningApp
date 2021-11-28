import React from "react"
import { useFormik,getIn  } from "formik"
import * as yup from 'yup'
import Box from '@mui/material/Box'
import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startRegister } from "../../actions/userActions"

const HeadingTypography = styled(Typography)(() => ({
    color: "black",
    fontFamily: 'Georgia,Times,serif'
}));

const ColorButton = styled(Button)(() => ({
    color: "#E4E7EB",
    backgroundColor: "#4E83A3",
    '&:hover': {
      backgroundColor: "grey",
    },
}));
const validationSchema=yup.object({
    username: yup.string().required("User Name mandatory!"),
    email: yup.string().email("Enter a valid email!").required("Email mandatory!"),
    password: yup.string().required("Password mandatory!"),
    // academyName: yup.string().required("Academy Name mandatory!"),
    academy: yup.object().shape({
        name: yup.string()
          .required('Academy Name mandatory!'),
      }),
})
const Register =(props) =>{
    const dispatch=useDispatch()
    const formik=useFormik({
        initialValues : {
            username : '',
            email : '',
            password : '',
            academy :{
                name : '',
                website: ''
            }
        },
        onSubmit : (values) =>{
            // console.log("Register Form data in Register comp",JSON.stringify(values))
            const registerFormData=values
            dispatch(startRegister(registerFormData,navigateToLogin))
        },
        validationSchema : validationSchema
    })
    const navigateToLogin=()=>{
        props.history.push('/admin/login')
    }
    return(
        <Box
            component="form"
            onSubmit ={formik.handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                mt: '105px'
            }}
            noValidate
            autoComplete="off"
        >
            <HeadingTypography variant="h4" color="secondary" gutterBottom>
                Welcome to Aimer
            </HeadingTypography>
            <HeadingTypography variant="h5" color="secondary" gutterBottom>
                Create an account or {" "}
                <Link to="/admin/login"  style={{ textDecoration: "none",color: "#6287F0" }}>
                    Login
                </Link>
            </HeadingTypography>
            <TextField
                required
                id="username"
                name="username"
                label="User Name"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username  && formik.errors.username}
                onBlur={formik.handleBlur}
            /><br/>
            <TextField
                required
                id="email"
                name="email"
                label="E-mail"
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email  && formik.errors.email}
                onBlur={formik.handleBlur}
            /><br/>
            <TextField
                required
                id="password"
                name="password"
                label="Password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password  && formik.errors.password}
                onBlur={formik.handleBlur}
            /><br/>
            <TextField
                required
                id="name"
                name="academy.name"
                label="Academy Name"
                value={formik.values.academy.name}
                onChange={formik.handleChange}
                error={Boolean(getIn(formik.touched, 'academy.name') &&
                getIn(formik.errors, 'academy.name'))}
                helperText={getIn(formik.touched, 'academy.name') &&
                            getIn(formik.errors, 'academy.name')}
                onBlur={formik.handleBlur}
            /><br/>
            <TextField
                id="website"
                name="academy.website"
                label="Website"
                value={formik.values.academy.website}
                onChange={formik.handleChange}
                error={Boolean(getIn(formik.touched, 'academy.website') &&
                getIn(formik.errors, 'academy.website'))}
                helperText={getIn(formik.touched, 'academy.website') &&
                      getIn(formik.errors, 'academy.website')}
                onBlur={formik.handleBlur}
            /><br/>
            <HeadingTypography variant="h6" color="secondary" paragraph gutterBottom>
                By clicking the "Register" button, you are creating an Aimer account, and you agree to Aimer's Terms of Use and Privacy Policy.
            </HeadingTypography>
            <ColorButton type='submit'>Register</ColorButton>
        </Box>
    )
}
export default Register