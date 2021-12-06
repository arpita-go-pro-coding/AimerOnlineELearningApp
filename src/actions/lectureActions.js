import axios from 'axios'
import Swal from 'sweetalert2'

export const startGetAllLectures =(id) =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${id}/lectures`,{
                headers :{
                    'Authorization' : localStorage.getItem('token')
                }
            })
                .then((response) =>{
                    const allGetLecturesResp= response.data
                    console.log('allGetLecturesResp',allGetLecturesResp)
                    dispatch(getAllLecturesInfo(allGetLecturesResp))
                })
                .catch((err) =>{
                    alert(err.message)
                })
        }
    )
}
export const getAllLecturesInfo =(allGetLecturesResp) =>{
    return{
        type: 'ALL_LECTURES_INFO',
        payload: allGetLecturesResp
    }
}
export const startAddLecture =(formData,courseId,closeModal) =>{
    return(
        (dispatch) =>{
            console.log('URL',`https://dct-e-learning.herokuapp.com/api/courses/${courseId}/lectures`,typeof closeModal)
            axios.post(`https://dct-e-learning.herokuapp.com/api/courses/${courseId}/lectures`,formData,{
                headers :{
                    'Authorization' : localStorage.getItem('token')
                }
            })
                .then((response) =>{
                    const createLectureResp= response.data
                    console.log('createLectureResp',createLectureResp)
                    // dispatch(getAllLecturesInfo(allGetLecturesResp))
                    dispatch(addLecture(createLectureResp))
                    closeModal('add')
                    Swal.fire({
                        icon : 'success',
                        title: 'Lecture Addded',
                        text: 'Lecture Addded successfully to your course!'
                    })
                    
                    
                })
                .catch((err) =>{
                    alert(err.message)
                })
        }
    )
}

export const addLecture =(createLectureResp) =>{
    return{
        type: 'ADD_LECTURE',
        payload: createLectureResp
    }
}