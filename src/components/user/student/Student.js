import React from "react"
import Box from "@mui/material/Box"
import RegisterStudent from "./RegisterStudent"
import StudentOperations from "./StudentOperations"



const Student= (props) =>{
  return(
    <Box sx={{mt:'150px',display:'flex',justifyContent: "space-evenly"}}>
      <StudentOperations/>
      <RegisterStudent/>
      
    </Box>
    )
}
export default Student