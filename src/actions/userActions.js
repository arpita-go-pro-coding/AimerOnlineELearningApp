import axios from 'axios'
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode"

export const startRegister=(formData,navigateToLogin)=>{
    console.log('actionCreator-',formData)
    return(
        (dispatch)=>{
            axios.post(`https://dct-e-learning.herokuapp.com/api/admin/register`,formData)
                .then((response)=>{
                    dispatch(clearAlert())
                    dispatch(clearError())
                    console.log('Reg response',response.data)
                    const registerResult=response.data
                    if(registerResult.hasOwnProperty('errors')){
                        alert(registerResult.errors)
                        Swal.fire({
                            icon : 'error',
                            title: "Can't register!",
                            text: registerResult.errors
                        })
                        dispatch(addError(registerResult.errors))
                    }else {
                        dispatch(storeAlert(registerResult))
                        // alert(registerResult.notice)
                        Swal.fire({
                            icon : 'success',
                            title: 'Congratulations!',
                            text: registerResult.notice
                        })
                        dispatch(clearError())
                        navigateToLogin()
                    }
                }).catch((err)=>{
                    alert(err.notice)
                })
        }
    )
}
export const addError =(errorText) =>{
    return{
        type: 'ADD_ERROR',
        payload: errorText
    }
}

export const storeAlert =(result) =>{
    return{
        type: 'STORE_ALERT',
        payload: result
    }
}

export const startLogin =(formData,navigateToHome,handleAuth) =>{
    return(
        (dispatch)=>{
            axios.post(`https://dct-e-learning.herokuapp.com/api/admin/login`,formData)
                .then((response)=>{
                    const loginResult=response.data
                    const decoded = jwt_decode(loginResult.token)
                    console.log('Login token decode-',decoded)
                    // console.log('Login resp',loginResult)
                    if(loginResult.hasOwnProperty('errors')){
                        // alert(loginResult.errors)
                        Swal.fire({
                            icon : 'error',
                            title: 'Login Failed!',
                            text: loginResult.errors
                        })
                        dispatch(addError(loginResult.errors))
                    }else{
                        Swal.fire({
                            icon : 'success',
                            title: 'Welcome',
                            text: 'You are successfully logged in.'
                        })
                        localStorage.setItem('token',loginResult.token)
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

export const clearError =() =>{
    return{
        type: 'CLEAR_ERROR',
    }
}
export const clearAlert =() =>{
    return{
        type: 'CLEAR_ALERT',
    }
}

export const startGetUserInfo =() =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/admin/account`,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const result=response.data
                // console.log('result account info-',result)
                dispatch(addUser(result))
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const addUser=(userInfo) =>{
    return{
        type:'ADD_USER',
        payload: userInfo
    }
}
export const startUpdateAccount =(updatedForm,handleCancel)=>{
    return(
        (dispatch)=>{
            axios.put(`https://dct-e-learning.herokuapp.com/api/admin`,updatedForm,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                // console.log('Updated Account Info response',response.data)
                const updatedAccountResp=response.data
                if(updatedAccountResp.hasOwnProperty('errors')){
                    // alert(updatedAccountResp.message)
                    Swal.fire({
                        icon : 'error',
                        title: 'Save Failed!',
                        text: updatedAccountResp.message
                    })
                    dispatch(addError(updatedAccountResp.message))
                }else{
                    Swal.fire({
                        icon : 'success',
                        title: 'Account Details Saved',
                        text: 'Successfully saved the changes.'
                    })
                    dispatch(updateAccountInfo(updatedAccountResp))
                    handleCancel()
                }
                
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const updateAccountInfo =(updatedAccountResp)=>{
    return{
        type: 'UPDATE_ACCOUNT_INFO',
        payload: updatedAccountResp
    }
}
