import React from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import aimers_logo from '../assets/aimer.png'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import InputBase from '@mui/material/InputBase'
import { Link, Route,withRouter,Switch } from "react-router-dom"
import Login from "./user/Login"
import Register from "./user/Register"
import Swal from 'sweetalert2'
import Student from "./user/student/Student";
import Dashboard from "./Dashboard";
import Account from "./user/Account";
import LoginOption from './user/LoginOption'
import RegisterStudent from "./user/student/RegisterStudent";
import StudentAccount from "./user/student/StudentAccount";
// import { useSelector,useDispatch } from "react-redux";
import Home from "./Home";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '2px solid grey',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));
const ColorAppBar = styled(AppBar)(() => ({
    color: "black",
    backgroundColor: "#57cfed",
    '&:hover': {
      backgroundColor: "white",
    },
  }));
const ColorButton = styled(Button)(() => ({
    color: "#d3d8df",
    backgroundColor: "#5788ed",
    '&:hover': {
      backgroundColor: "grey",
    },
  }));
const NavBar =(props) =>{
    const {userLoggedIn, handleAuth} = props
    const userLogged= JSON.parse(localStorage.getItem('user'))
    // console.log('NavBar role',userLogged)
    return (
        <>
            <ColorAppBar position='fixed'>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box
                        component="img"
                        sx={{
                        // height: 50,
                        mt: '2px',
                        padding: '4px',
                        width:100
                        }}
                        alt="Logo"
                        src={aimers_logo}  
                
                    >
                        {/* <Link to="/" style={{ textDecoration: "none" }}/> */}
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Stack spacing={2} direction="row">
                        <ColorButton variant="contained">
                            <Link to="/" style={{ textDecoration: "none",color: "#d3d8df" }}>
                                Home
                            </Link>
                        </ColorButton>
                        {userLoggedIn ? (

                                    <>
                                        {userLogged.role==='admin' && (
                                        
                                        <>
                                            <ColorButton variant="contained">
                                            <Link to='/student' 
                                                style={{ textDecoration: "none",color: "#d3d8df" }}   
                                            >
                                                Student
                                            </Link>
                                            </ColorButton>
                                            <ColorButton variant="contained">
                                                <Link to='/dashboard' 
                                                    style={{ textDecoration: "none",color: "#d3d8df" }}   
                                                >
                                                    Dashboard
                                                </Link>
                                            </ColorButton>
                                            <ColorButton variant="contained">
                                                <Link to='/admin/account' style={{ textDecoration: "none",color: "#d3d8df" }}>
                                                    Account
                                                </Link>
                                            </ColorButton>
                                        </>
                                        )}
                                        
                                        {userLogged.role==='student' && (
                                            <>
                                                <ColorButton variant="contained">
                                                    <Link to='/student/account' style={{ textDecoration: "none",color: "#d3d8df" }}>
                                                        Account
                                                    </Link>
                                                </ColorButton>
                                            </>
                                        )

                                        }
                                        <ColorButton variant="contained">
                                            <Link to='/' onClick={()=>{
                                                localStorage.clear()
                                                // localStorage.setItem('token','')
                                                Swal.fire({
                                                    icon : 'success',
                                                    title: 'See you later!',
                                                    text: 'You have successfully logged out.'
                                                })
                                                handleAuth()
                                            }} style={{ textDecoration: "none",color: "#d3d8df" }}>
                                                Logout
                                            </Link>
                                        </ColorButton>
                                    </>
                                
                            
                        ): (
                            <>
                                <ColorButton variant="contained">
                                    <Link to="/admin/register"  style={{ textDecoration: "none",color: "#d3d8df" }}>
                                        Register
                                    </Link>
                                </ColorButton>
                                <ColorButton variant="contained">
                                    <Link to="/login" style={{ textDecoration: "none",color: "#d3d8df" }}>
                                        Login
                                    </Link>    
                                </ColorButton>
                            </>
                        )}
                    </Stack>
                    
                </Toolbar>
            
            </ColorAppBar>
            <Switch>
                <Route path='/'  component={Home} exact />
                <Route path='/admin/register'  component={Register} />
                <Route path='/dashboard'  component={Dashboard} />
                <Route path='/student'  component={Student} exact />
                <Route path='/admin/students'  component={RegisterStudent} />
                <Route path='/admin/account'  component={Account} />
                <Route path='/student/account'  component={StudentAccount}  />
                <Route path='/login'  component={LoginOption} />
                <Route path='/admin/login'  exact render={
                    (props) =>{
                        return  <Login 
                            {...props}
                            handleAuth={handleAuth}
                        />
                    }
                } />
                <Route path='/students/login' exact render={
                    (props) =>{
                        return  <Login 
                            {...props}
                            handleAuth={handleAuth}
                        />
                    }
                } />
            </Switch>
        </>
    )
}
export default withRouter(NavBar)