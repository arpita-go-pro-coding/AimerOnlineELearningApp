const courseInitialState={
    isLoading: true,
    role: '',
    coursesData: [],
    // singleCourseData: [],
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
        // case 'GET_SINGLE_COURSE_INFO' :{
        //     // console.log('GET_SINGLE_COURSE_INFO',{...state, singleCourseData: [action.payload]})
        //     return {...state, singleCourseData: action.payload}
        // }
        default : {
            return state
        }
    }
}

export default courseReducer