import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { Typography, Paper, Avatar } from "@mui/material"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { styled } from '@mui/material/styles'
import { useFormik  } from "formik"
import * as yup from 'yup'
import { useDispatch,useSelector } from "react-redux"
import { startLogin } from '../../actions/userActions'
import { startStudLogin } from '../../actions/studentActions'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const StyledPaper = styled(Paper)(() => ({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px'
}));

const StyledAvatar = styled(Avatar)((theme) => ({
    margin: 1,
    backgroundColor: 'secondary.main',
}));

const validationSchema=yup.object({
    email: yup.string().email("Enter a valid email!").required("Email mandatory!"),
    password: yup.string().required("Password mandatory!"),
})

const Login= (props) =>{
    const {handleAuth} = props
    // console.log('Login comp', props.location)
    const dispatch=useDispatch()
    const alertMsg= useSelector((state)=>{
        // console.log('Inside alertMsg', state.user.alerts)
        return state.user.alerts
    })
    const formik=useFormik({
        initialValues : {
            email : '',
            password : '',
        },
        onSubmit : (values) =>{
            const loginFormData=values
            console.log('loginform data',loginFormData,props.location.pathname)
            if(props.location.pathname==='/admin/login'){
                dispatch(startLogin(loginFormData,navigateToHome,handleAuth))
            }else if(props.location.pathname==='/students/login'){
                dispatch(startStudLogin(loginFormData,navigateToHome,handleAuth))
            }
            
        },
        validationSchema : validationSchema
    })
    const navigateToHome=()=>{
        props.history.push('/')
    }
    
    const showRegisterLink =() =>{
        if(props.location.pathname==='/admin/login'){
            return <Link to="/admin/register" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
        }else if(props.location.pathname==='/students/login'){
            return <Link to="/admin/students" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
        }
    }
    return(
        <div>
            {alertMsg.length >0 && <p> {alertMsg.notice} </p>}
            <Container component="main" maxWidth="xs" sx={{mt:'100px'}}>
            <CssBaseline />
                <StyledPaper>
                    <StyledAvatar>
                        <LockOutlinedIcon />
                    </StyledAvatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit ={formik.handleSubmit}
                    // sx={{ width: '100%', // Fix IE 11 issue 
                    // mt: (theme) =>theme.spacing(100),}} 
                        noValidate
                    >
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email  && formik.errors.email}
                        // onBlur={formik.handleBlur}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        // autoComplete="current-password"
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password  && formik.errors.password}
                        // onBlur={formik.handleBlur}
                        />
                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        /> */}
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        
                        >
                        Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                {showRegisterLink()}
                                {/* <Link to="/admin/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link> */}
                            </Grid>
                        </Grid>
                    </form>
                </StyledPaper>
            <Box mt={8}>
            <Copyright />
            </Box>
            </Container>
        </div>
    )
}
export default Login