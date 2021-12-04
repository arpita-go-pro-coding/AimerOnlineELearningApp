import axios from 'axios'
import Swal from 'sweetalert2'

export const startAddCourse= (formData,clearForm) =>{
    return(
        (dispatch) =>{
            console.log('token now',localStorage.getItem('token'))
            axios.post(`https://dct-e-learning.herokuapp.com/api/courses`,formData,{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const addCourseResp= response.data
                // console.log('addCourseResp',addCourseResp)
                if(addCourseResp.hasOwnProperty('errors')){
                    Swal.fire({
                        icon : 'error',
                        title: addCourseResp.errors.category.message,
                        text: 'Choose values from '- addCourseResp.errors.category.properties.enumValues.join(',')
                    })
                    dispatch(addError(addCourseResp))
                }else{
                    dispatch(addCourse(addCourseResp))
                    clearForm()
                }
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const addError =(errorObj) =>{
    return{
        type: 'ADD_ERROR',
        payload: errorObj
    }
}

export const addCourse =(courseResp) =>{
    return{
        type: 'ADD_COURSE',
        payload: courseResp
    }
}

export const startGetAllCourses =() =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/courses`,{
                "headers" : {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const allCoursesGetResp= response.data
                // console.log('allCoursesGetResp',allCoursesGetResp)
                dispatch(getAllCoursesInfo(allCoursesGetResp))
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const getAllCoursesInfo =(allCoursesGetResp) =>{
    return{
        type: 'ALL_COURSES_INFO',
        payload: allCoursesGetResp
    }
}

export const startDeleteCourse = (id) =>{
    return(
        (dispatch) =>{
            axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${id}`,{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response) =>{
                const deleteCourseResp = response.data
                // console.log('deleteCourseResp',deleteCourseResp)
                Swal.fire({
                    icon:'warning',
                    title: 'Are you sure you want to delete?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteCourse(deleteCourseResp))
                        Swal.fire('Deleted!', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Your Course is safe', '', 'info')
                    }
                  })
            }).catch((err) =>{
                alert(err.message)
            })

        }
    )
}
export const deleteCourse =(deleteCourseResp) =>{
    return{
        type: 'DELETE_COURSE',
        payload: deleteCourseResp
    }
}

export const startGetCourseInfo =(id) =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${id}`,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response) =>{
                const courseInfoResp= response.data
                console.log('courseInfoResp',courseInfoResp)
                dispatch(getSingleCourseInfo(courseInfoResp))
            }).catch((err) =>{
                alert(err.message)
            })
        }
    )
}
export const getSingleCourseInfo =(courseInfoResp) =>{
    return{
        type: 'GET_SINGLE_COURSE_INFO',
        payload: courseInfoResp
    }
}

export const startEnrollCourse =(courseId, studId) =>{
    return(
        (dispatch) =>{
            axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${courseId}&studentId=${studId}`,{},{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response) =>{
                const enrollCourseResp= response.data
                console.log('enrollCourseResp',enrollCourseResp)
                // dispatch(enrollCourse(enrollCourseResp))
                Swal.fire({
                    icon : 'success',
                    title: 'Enrolled!',
                    text: 'Student successfully enrolled'
                })
                // handleChange()
                window.location.reload()
                
            }).catch((err) =>{
                alert(err.message)
            })

        }
    )
}

export const startUnenrollCourse =(courseId, studId) =>{
    return(
        (dispatch) =>{
            axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${courseId}&studentId=${studId}`,{},{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response) =>{
                const unenrollCourseResp= response.data
                console.log('unenrollCourseResp',unenrollCourseResp)
                // dispatch(enrollCourse(enrollCourseResp))
                Swal.fire({
                    icon : 'success',
                    title: 'Unenrolled!',
                    text: 'Student successfully unenrolled'
                })
                // handleChange()
                window.location.reload()
                
            }).catch((err) =>{
                alert(err.message)
            })

        }
    )
}