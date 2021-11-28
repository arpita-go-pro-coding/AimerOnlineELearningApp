import axios from 'axios'
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode"

export const startStudRegister =(formData,clearForm) =>{
    return(
        (dispatch)=>{
            axios.post(`https://dct-e-learning.herokuapp.com/api/admin/students`,formData,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const studRegisterResponse=response.data
                console.log('studRegisterResponse',studRegisterResponse)
                if(studRegisterResponse.hasOwnProperty('errors')){
                    // alert(studRegisterResponse.errors)
                    Swal.fire({
                        icon : 'error',
                        title: Object.keys(studRegisterResponse).length===1 ? 'Registration Failed' : studRegisterResponse._message,
                        text: Object.keys(studRegisterResponse).length===1 ? studRegisterResponse.errors :
                        studRegisterResponse.message
                    })
                    dispatch(addError(studRegisterResponse.errors))
                }else{
                    Swal.fire({
                        icon : 'success',
                        title: 'Student Registered',
                        text: 'Student is successfully registered to your academy!'
                    })
                    dispatch(addStudent(studRegisterResponse))
                    clearForm()
                }
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const addStudent =(studRegisterResponse)=>{
    return{
        type: 'REGISTER_STUDENT',
        payload: studRegisterResponse
    }
}

export const addError =(errorText) =>{
    return{
        type: 'ADD_ERROR',
        payload: errorText
    }
}

export const startGetAllStudsInfo =() =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/admin/students`,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const allStudGetResp=response.data
                // console.log('allStudGetResp',allStudGetResp)
                dispatch(getAllStudsInfo(allStudGetResp))
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const getAllStudsInfo =(allStudGetResp) =>{
    return{
        type: 'ALL_STUDENTS_INFO',
        payload: allStudGetResp
    }
}
export const startDeleteStud=(id) =>{
    return(
        (dispatch) =>{
            axios.delete(`https://dct-e-learning.herokuapp.com/api/admin/students/${id}`,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const deleteStudResp=response.data
                // console.log('deleteStudResp',deleteStudResp)
                Swal.fire({
                    icon:'warning',
                    title: 'Are you sure you want to delete?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteStud(deleteStudResp))
                        Swal.fire('Deleted!', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Your record is safe', '', 'info')
                    }
                  })
                
            }).catch((err)=>{
                alert(err.message)
            })

        }
    )
}
export const deleteStud =(deleteStudResp) =>{
    return{
        type: 'DELETE_STUDENT',
        payload: deleteStudResp
    }
}

// export const startViewStud =(studId)=>{
//     return(
//         (dispatch)=>{
//             axios.get(`https://dct-e-learning.herokuapp.com/api/students/${studId}`,{
//                 headers:{
//                     'Authorization' : localStorage.getItem('token')
//                 } 
//             }).then((response)=>{
//                 const viewStudResp=response.data
//                 console.log('viewStudResp',viewStudResp)
//                 dispatch(getStudInfo(viewStudResp))
//             }).catch((err)=>{
//                 console.log(err.message)
//             })
//         }
//     )
// }

// export const getStudInfo =(viewStudResp) =>{
//     return{
//         type: 'VIEW_STUDENT_INFO',
//         payload: viewStudResp
//     }
// }

export const startEditStud =(studId,formData,handleClose)=>{
    return(
        (dispatch)=>{
            axios.put(`https://dct-e-learning.herokuapp.com/api/students/${studId}`,formData,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                } 
            }).then((response)=>{
                const editStudResp=response.data
                console.log('editStudResp',editStudResp)
                dispatch(editStudInfo(editStudResp))
                handleClose()
            }).catch((err)=>{
                console.log(err.message)
            })
        }
    )
}

export const editStudInfo =(editStudResp) =>{
    return{
        type: 'EDIT_STUDENT_INFO',
        payload: editStudResp
    }
}

export const startStudLogin= (formData,navigateToHome,handleAuth)=>{
    return(
        (dispatch)=>{
            axios.post(`https://dct-e-learning.herokuapp.com/api/students/login`,formData)
                .then((response)=>{
                    const studLoginResp=response.data
                    const decoded = jwt_decode(studLoginResp.token)
                    console.log('studLoginResp',studLoginResp)
                    if(studLoginResp.hasOwnProperty('errors')){
                        Swal.fire({
                            icon : 'error',
                            title: 'Login Failed!',
                            text: studLoginResp.errors
                        })
                    }else{
                        Swal.fire({
                            icon : 'success',
                            title: 'Welcome',
                            text: 'You are successfully logged in.'
                        })
                        localStorage.setItem('token',studLoginResp.token)
                        localStorage.setItem('user',JSON.stringify(decoded))
                        navigateToHome()
                        handleAuth()
                        window.location.reload()
                    }
                }).catch((err)=>{
                    alert(err.message)
                })
        }
    )
}

export const startGetStudInfo = (id) =>{
    return(
        (dispatch)=>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response )=>{
                    const studAccResp=response.data
                    console.log('studAccResp',studAccResp)
                    dispatch(addStud(studAccResp))
                }).catch((err)=>{
                    alert(err.message)
                })
        }
    )
}

export const addStud =(studAccResp) =>{
    return{
        type: 'ADD_STUDENT',
        payload: studAccResp
    }
}