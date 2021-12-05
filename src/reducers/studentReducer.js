const studentInitialState={
    isLoading: true,
    role: '',
    studentsData: [],
    // registerDataResponse: [],
    errors: {},
    alerts: ''
}

const studentReducer= (state=studentInitialState,action) =>{
    switch(action.type){
        case 'ADD_ERROR' :{
            // console.log('ADD_ERROR',{...state,studentsData: [...state.studentsData], errors:{...action.payload}})
            return {...state, errors:action.payload}
        }
        case 'REGISTER_STUDENT' :{
            console.log('role check',state.studentsData)
            // console.log('role check',uniqBy(state.studentsData,'role'))
            return {...state,studentsData:[...state.studentsData,action.payload]}
        }
        case 'ALL_STUDENTS_INFO':{
            return {...state,studentsData: [...action.payload]}
        }
        case 'DELETE_STUDENT':{
            const result=state.studentsData.filter((eachStud)=>{
                // console.log('result-DELETE_STUDENT',eachStud._id,action.payload._id)
                return eachStud._id !==action.payload._id
            })
            // console.log('after result',result)
            // console.log('after result new obj now',{...state, studentsData:[...result]})
            return {...state, studentsData:[...result]}
        }
        // case 'VIEW_STUDENT_INFO' :{
        //     // const result=state.studentsData.map((eachStud)=>{
        //     //     return eachStud._id ===action.payload._id
        //     // })
        //     console.log('after result VIEW_STUDENT_INFO',[action.payload])
        //     return {...state,studentsData:[action.payload]}
        // }
        case 'EDIT_STUDENT_INFO' :{
            const result= state.studentsData.map((stud)=>{
                if(stud._id===action.payload._id){
                    return action.payload
                }else{
                    return stud
                }
            })
            return {...state, studentsData:[...result]}
        }
        case 'ADD_STUDENT' :{
            console.log('studRed ',{...state,role: action.payload.role,studentsData: action.payload,})
            return {...state,role: action.payload.role,studentsData: action.payload,}
        }
        default : {
            return state
        }
    }
}
export default studentReducer