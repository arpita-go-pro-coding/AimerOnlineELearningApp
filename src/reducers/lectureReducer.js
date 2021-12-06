const lectureInitialState={
    isLoading: true,
    role: '',
    lecturesData: [],
    errors: {},
    alerts: ''
}

const lectureReducer= (state=lectureInitialState, action) =>{
    switch(action.type){
        case 'ALL_LECTURES_INFO' :{
            return {...state,lecturesData: [...action.payload]}
        }
        case 'ADD_LECTURE' :{
            return {...state,lecturesData:[...state.lecturesData,action.payload]}
        }
        default : {
            return state
        }
    }
}
export default lectureReducer