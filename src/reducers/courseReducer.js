const courseInitialState={
    isLoading: true,
    role: '',
    coursesData: [],
    errors: {},
    alerts: ''
}


const courseReducer=(state=courseInitialState,action) =>{
    switch(action.type){
        case 'ADD_ERROR' :{
            return {...state, errors:action.payload}
        }
        case 'ADD_COURSE':{
            return {...state,coursesData:[...state.coursesData,action.payload]}
        }
        case 'ALL_COURSES_INFO' :{
            return {...state,coursesData: [...action.payload]}
        }
        case 'DELETE_COURSE':{
            const result=state.coursesData.filter((eachCourse)=>{
                return eachCourse._id !==action.payload._id
            })
            return {...state, coursesData:[...result]}
        }
        default : {
            return state
        }
    }
}

export default courseReducer