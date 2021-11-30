import React from "react"
import { styled } from '@mui/material/styles'
import { Typography } from "@mui/material"
import { useSelector,useDispatch } from "react-redux";
import CourseItem from "./CourseItem";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const HeadingTypography = styled(Typography)(() => ({
    color: "black",
    fontFamily: 'Georgia,Times,serif'
}));
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(3),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

const CourseOperations =(props) =>{
    const dispatch=useDispatch()
    const allCoursesInfo=useSelector((state)=>{
        // console.log('allCoursesInfo in CourseOperations ',state.course.coursesData)
        return state.course.coursesData
    })
    return(
        <div style={{ height: 400, width: '60%' }}>
            <HeadingTypography variant="h5" color="secondary" gutterBottom
                sx={{textAlign: 'center'}}
            >
                <strong>Listing All Available Courses -{allCoursesInfo.length}</strong>
            </HeadingTypography>

        <Grid sx={{mt:5}} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {allCoursesInfo.length >0 && allCoursesInfo.map((course)=>{
                return (
                    <Grid item xs={3} key={course._id}>
                        <CourseItem   {...course} />
                    </Grid>
                    
                )
            })}
        </Grid>
        </div>
    )
}
export default CourseOperations