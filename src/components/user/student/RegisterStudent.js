import React from "react"
import { useFormik  } from "formik"
import * as yup from 'yup'
import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from "@mui/material/Box"
import { useDispatch } from "react-redux"
import { startStudRegister } from "../../../actions/studentActions"


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
    name: yup.string().required("Name mandatory!"),
    email: yup.string().email("Enter a valid email!").required("Email mandatory!"),
    password: yup.string().required("Password mandatory!"),
    isAllowed: yup.boolean()
})

const RegisterStudent =(props) =>{
    const dispatch= useDispatch()
    const name = 'selectedOption'
    const formik=useFormik({
        initialValues : {
            name : '',
            email : '',
            password : '',
            isAllowed : ''
        },
        onSubmit : (values) =>{
            // console.log("Register Form data in Register comp",JSON.stringify(values))
            const registerFormData=values
            // console.log('Register Stud Form',registerFormData)
            dispatch(startStudRegister(registerFormData,clearForm))
            // clearForm()
        },
        onChange: (e,setFieldValue) => {
            // console.log('onChange name and e.currentTarget.value',e.currentTarget.value)
            setFieldValue(name, e.currentTarget.value)},
        validationSchema : validationSchema
    })
    // const navigateToLogin=()=>{
    //     props.history.push('/students/login')
    // }
    const clearForm =() =>{
        formik.resetForm()
        // formik.values.isAllowed=true
    }

    return(
        <FormControl
            component="form"
            onSubmit ={formik.handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch'}, 
            }}
            noValidate
            autoComplete="off"
        >
            
            <HeadingTypography variant="h5" color="secondary" gutterBottom>
                Create Student or {" "}
                <Link to="/students/login"  style={{ textDecoration: "none",color: "#6287F0" }}>
                    Login
                </Link>
            </HeadingTypography>
            <TextField
                required
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name  && formik.errors.name}
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
            />
            <Typography variant="h6" color="secondary" paragraph gutterBottom
                
            >
                 <FormLabel component="legend">Allowed Access</FormLabel>
            </Typography>
            
            <RadioGroup row aria-label="allowed" name="isAllowed"
                defaultValue="true" onChange={(e)=>formik.handleChange(e)}
                sx={{justifyContent: 'center'}}
            >
                <FormControlLabel value="true" control={<Radio />}  label="true" />
                <FormControlLabel value="false" control={<Radio />}  label="false" />
                {/* <FormControlLabel value="na" control={<Radio />}  label="na" /> */}
                
            </RadioGroup>
            <Box variant='button' sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <ColorButton onClick={formik.resetForm}>Reset</ColorButton>
                <ColorButton type='submit'>Register</ColorButton> 
            </Box>
        </FormControl>
    )
}
export default RegisterStudent