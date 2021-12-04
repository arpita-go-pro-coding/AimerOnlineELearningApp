import React,{useState,useEffect,useRef} from "react"
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
import {HiChevronDoubleLeft} from "react-icons/hi";
import List from '@mui/material/List';
import { useDispatch , useSelector } from "react-redux"
import UnenrolledStuds from "./UnenrolledStuds";
import EnrolledStuds from "./EnrolledStuds";
import { startEnrollCourse } from "../../actions/courseActions";
import { startUnenrollCourse } from "../../actions/courseActions";

const ItemUnerolled = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height : 700,
  width: 500,
  background : '#f0db7d'
}));

const ItemEnrolled = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height : 700,
    width: 500,
    background : '#b5f5b3'
  }));


const CourseEnrollment =(props) =>{
    const dispatch= useDispatch()
    const buttonControlUnenroll = useRef('')
    const buttonControlEnroll = useRef('')
    const selectCategoryOption= useRef('')
    const [selectCategory, setSelectCategory] = useState('');
    const [selectOnRefresh, setSelectOnRefresh] = useState('');
    const [enrolled, setEnrolled] = useState([])
    const [unenrolled, setUnenrolled] = useState([])
    const [disabledUnenroll, setDisabledUnenroll] = useState(true)
    const [disabledEnroll, setDisabledEnroll] = useState(true)
    const [selectedStudToEnroll, setSelectedStudToEnroll] = useState('')

    const allStuds=useSelector((state) =>{
        // console.log('allStuds',state.student.studentsData)
        return state.student.studentsData
    })
    const allCoursesDetails=useSelector((state) =>{
        return state.course.coursesData
    })


    const getEnrolledStudsInfo= (selectCategory) =>{
        const result= allCoursesDetails.find((course)=>{
            if(selectCategory===course.category){
                return course.students
            }
        })
        return result.students
    }
    const getEnrolledStudsNames= (enrolledIds) =>{
        const onlyIds= enrolledIds.map((stud)=>stud.student)
        const result= allStuds.filter((stud)=>{
            if(onlyIds.includes(stud._id)){
                return stud
            }
        })
        return result
    }

    const getUnenrolledStudsNames= (enrolledIds) =>{
        const onlyIds= enrolledIds.map((stud)=>stud.student)
        const result= allStuds.filter((stud)=>{
            if(!onlyIds.includes(stud._id)){
                return stud
            }
        })
        return result
    }

    const getCourseId =(selectCategory) =>{
        const result= allCoursesDetails.find((ele) =>{
            return ele.category===selectCategory || ele.category.toLowerCase()===selectCategory
        })
        return result._id
    }

    
    let enrolledDetails,unenrolledDetails=[]
    useEffect (()=>{
        if(selectCategory && allCoursesDetails.length>0 && allStuds.length>0){
            const enrolledIds=getEnrolledStudsInfo(selectCategory)
            // console.log('New2 enrollled-----------', getEnrolledStudsNames(enrolledIds))
            enrolledDetails=getEnrolledStudsNames(enrolledIds) ////////////Enrolled final
            // console.log('New3 unenrolled-----------', getUnenrolledStudsNames(enrolledIds))
            unenrolledDetails=getUnenrolledStudsNames(enrolledIds) ////////////Unenrolled final
            setEnrolled(enrolledDetails)
            setUnenrolled(unenrolledDetails)
            // dispatch(startGetCourseInfo(getCourseId(selectCategory)))
        }
    },[selectCategory,allCoursesDetails,allStuds])


    const singleCourseInfo=useSelector((state) =>{
        return state.course.singleCourseData
    })

    // console.log('example---', _.difference([1, 2, 3, 4, 5], [5, 2, 10]))

  
  const handleChange = (event) => {
        console.log('Inside handleChange')
        setSelectCategory(event.target.value);
        
    }

    const enrollToCourse =(studId) =>{
        if(selectCategory){
            setDisabledUnenroll(!disabledUnenroll)
            setSelectedStudToEnroll(studId)
        }
            
    }
    const unenrollToCourse =(studId) =>{
        if(selectCategory){
            setDisabledEnroll(!disabledEnroll)
            setSelectedStudToEnroll(studId)
        }
            
    }
    // const preSelect=() =>{
    //     setSelectOnRefresh(localStorage.getItem('selectOption'))
    // }

    // useEffect(()=>{
    //     localStorage.setItem('selectOption',selectCategory)
    // })

    // useEffect(()=>{
    //     console.log('useEff1')
    //     const selectOption=localStorage.getItem('selectOption')
    //     console.log('useEff2')
    //     setSelectCategory(selectOption)
    // },[])

    const handleEnrollCourse =() =>{
        console.log('handleEnrollCourse',selectedStudToEnroll)
        // localStorage.setItem('selectOption',selectCategory)
        dispatch(startEnrollCourse(getCourseId(selectCategory),selectedStudToEnroll))
    }
    const handleUnenrollCourse =() =>{
        dispatch(startUnenrollCourse(getCourseId(selectCategory),selectedStudToEnroll))
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
                    ref={selectCategoryOption}
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
                            <ItemUnerolled>
                            <Typography variant="h6" color="secondary" paragraph>
                                <em>Unenrolled</em>
                            </Typography>
                                <List component="div" aria-label="unenrolled studs">
                                    {selectCategory && unenrolled.length >0 && 
                                        
                                        
                                           <Box>
                                               {unenrolled.map((stud)=>{
                                               return <UnenrolledStuds  key={stud._id} {...stud} enrollToCourse={enrollToCourse} />
                                            })}
                                            </Box>
                                            
                                      
                                      
                                    }
                                </List>
                            </ItemUnerolled>
                        </Grid>
                        <Grid item xs={2} sx={{justifyContent: 'center', mt:30}}>
                            <Button variant="contained" style={{fontSize: '30px'}} ref={buttonControlUnenroll} disabled={disabledUnenroll}
                                onClick={handleEnrollCourse}
                            >    
                                <HiChevronDoubleRight />    
                            </Button>
                            <Button variant="contained" style={{fontSize: '30px'}} ref={buttonControlEnroll} disabled={disabledEnroll}
                                onClick={handleUnenrollCourse}
                            >    
                                <HiChevronDoubleLeft />    
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <ItemEnrolled>
                                <Typography variant="h6" color="secondary" paragraph>
                                    <em>Enrolled</em>
                                </Typography>
                                <List component="div" aria-label="unenrolled studs">
                                    {selectCategory && enrolled.length>0 && 
                                        
                                        
                                           <Box>
                                               {enrolled.map((stud)=>{
                                               return <EnrolledStuds  key={stud._id} {...stud} unenrollToCourse={unenrollToCourse} />
                                            })}
                                            </Box>
                                            
                                      
                                      
                                    }
                                </List>
                            </ItemEnrolled>
                        </Grid>
                        
                    </Grid>
                </Box>
            </FormControl>
            
        </div>
    )
}
export default CourseEnrollment