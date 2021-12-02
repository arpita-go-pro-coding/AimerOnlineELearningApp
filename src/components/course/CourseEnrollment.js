import React,{useState,useEffect} from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import category from "./courseCategory";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Button,Typography } from "@mui/material";
import {HiChevronDoubleRight} from "react-icons/hi";
import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useDispatch , useSelector } from "react-redux"
import { startGetCourseInfo } from "../../actions/courseActions";
import _ from 'lodash'
import UnenrolledStuds from "./UnenrolledStuds";
import { getNamesIds, getStudIds } from '../helperFunctions/allStudsInfo'
import { getEnrolledStudsIds } from '../helperFunctions/enrolledStudsInfo'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height : 700,
  width: 500,
  background : '#9dc6cf'
}));


const CourseEnrollment =(props) =>{
    const dispatch= useDispatch()
    const [selectCategory, setSelectCategory] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [singleCourse, setSingleCourse] =useState([])
    const [unenrolledStudsDetails, setUnenrolledStudsDetails] = useState([])

    const allStuds=useSelector((state) =>{
        // console.log('allStuds',state.student.studentsData)
        return state.student.studentsData
    })
    // const allStudsNamesIds= allStuds.length >0 && allStuds.map((stud)=>{
    //     return {name:stud.name, id: stud._id}
    // })
    const allStudsNamesIds= allStuds.length >0 && getNamesIds(allStuds)
    console.log('allStudsNamesIds', allStudsNamesIds) //0: {name: 'Chaminda Vaas', id: '619ffe928d77d4ed3e3f8bc4'}

    // const allStudsIds= allStudsNamesIds.length > 0 && allStudsNamesIds.map((stud)=>{
    //     return stud.id
    // })
    const allStudsIds = allStudsNamesIds.length > 0 && getStudIds(allStudsNamesIds)
    console.log('allStudsIds',allStudsIds)
    const allCoursesDetails=useSelector((state) =>{
        return state.course.coursesData
    })

    const getCourseId =(selectCategory) =>{
        const result= allCoursesDetails.find((ele) =>{
            return ele.category===selectCategory || ele.category.toLowerCase()===selectCategory
        })
        return result._id
    }
    
    useEffect (()=>{
        if(selectCategory){
            console.log('selectCategory',selectCategory,allStudsNamesIds)
            dispatch(startGetCourseInfo(getCourseId(selectCategory)))
        }
    },[selectCategory])


    const singleCourseInfo=useSelector((state) =>{
        return state.course.singleCourseData
    })
    console.log('singleCourseInfo NOW---', singleCourseInfo)

    const enrolledStuds=Object.keys(singleCourseInfo).length >0 && singleCourseInfo.students
    console.log('enrolledStuds',enrolledStuds)
    // const enrolledStudsIds= Object.keys(singleCourseInfo).length >0 && singleCourseInfo.students.map((stud)=>{
    //     return stud.student
    // })
    const enrolledStudsIds =Object.keys(singleCourseInfo).length >0 &&  getEnrolledStudsIds(singleCourseInfo)
    console.log('enrolledStudsIds',enrolledStudsIds)
    // console.log('difference IDs', enrolledStudsIds.length>0 && allStudsIds.length>0 && _.difference(allStudsIds,enrolledStudsIds))

    let unerolledStudIds=[]
    let unerolledStuds=[]
    if(enrolledStudsIds.length>0 && allStudsIds.length>0){
        unerolledStudIds=_.difference(allStudsIds,enrolledStudsIds)
        unerolledStuds = allStudsNamesIds.filter((stud)=>{
            if(unerolledStudIds.includes(stud.id)){
                return {id:stud.id, name:stud.name}
            }
        })
    }
    // console.log('unerolledStudIds',unerolledStudIds)
    // console.log('unerolledStuds',unerolledStuds)
    const resultMapLeft= unerolledStuds.length >0 ? unerolledStuds : allStudsNamesIds

    // console.log('example---', _.difference([1, 2, 3, 4, 5], [5, 2, 10]))

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (event) => {
        // console.log('selected cat',event.target.value)
        setSelectCategory(event.target.value);
    }
    return(
        <div>
            <FormControl sx={{ m: 20, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectCategory}
                    label="Category"
                    onChange={handleChange}
                    >
                    {category.map((eachCategory)=>{
                        return <MenuItem key ={eachCategory.value} value={eachCategory.value}> 
                                    {eachCategory.label} 
                                </MenuItem>
                    })}
                </Select>
                <FormHelperText>Select Category</FormHelperText>
                <Box variant="div" sx={{ flexGrow: 1, mt:15 ,}}>
                    <Grid container  spacing={25}>
                        <Grid item xs={5}>
                            <Item>
                            <Typography variant="h6" color="secondary" paragraph>
                                Unenrolled
                            </Typography>
                            {/* <List component="div" aria-label="unenrolled studs">
                                <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                                >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                                </ListItemButton>
                                <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                                >
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                                </ListItemButton>
                            </List> */}
                                <List component="div" aria-label="unenrolled studs">
                                    {selectCategory && resultMapLeft && 
                                        
                                        
                                           <Box>
                                               {resultMapLeft.map((stud)=>{
                                               return <UnenrolledStuds  key={stud.id} {...stud} />
                                            })}
                                            </Box>
                                            
                                      
                                      
                                    }
                                </List>
                            </Item>
                        </Grid>
                        <Grid item xs={2} sx={{justifyContent: 'center', mt:30}}>
                            <Button variant="contained" style={{fontSize: '30px'}}>    <HiChevronDoubleRight />    </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Item>xs=4</Item>
                        </Grid>
                        
                    </Grid>
                </Box>
            </FormControl>
            
        </div>
    )
}
export default CourseEnrollment