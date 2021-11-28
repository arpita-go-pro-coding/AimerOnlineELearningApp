import React,{useState,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline'
import NavBar from "./components/NavBar"


function App(props) {
  const [userLoggedIn,setUserLoggedIn]= useState(false)

  const handleAuth =() =>{
    setUserLoggedIn(!userLoggedIn)
  }
  useEffect (()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])
  return (
    <div className="App">
      <CssBaseline />
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
      
    </div>
  );
}

export default App;
