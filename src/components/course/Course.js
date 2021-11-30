import React from "react"
import Box from "@mui/material/Box"
import AddCourse from "./AddCourse"
import CourseOperations from "./CourseOperations"


const Course =(props) =>{
    return(
        <Box sx={{mt:'150px',display:'flex',justifyContent: "space-evenly"}}>
            <CourseOperations/>
            <AddCourse/>
            
            
        </Box>
    )
}
export default Course