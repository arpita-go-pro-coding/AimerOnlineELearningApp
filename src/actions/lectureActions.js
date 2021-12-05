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