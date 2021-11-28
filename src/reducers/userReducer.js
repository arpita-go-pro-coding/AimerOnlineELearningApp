const userInitialState={
    isLoading: true,
    role: '',
    userData: {},
    errors: {},
    alerts: ''
}

const userReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'STORE_ALERT' :{
            console.log('STORE_ALERT',action.payload)
            return {...state, alerts: action.payload.notice}
        }
        case 'ADD_ERROR' :{
            console.log('ADD_ERROR',{...state, errors:action.payload})
            return {...state, errors:action.payload}
        }
        case 'CLEAR_ERROR' :{
            return {...state, errors:{}}
        }
        case 'CLEAR_ALERT' :{
            return {...state, alerts:{}}
        }
        case 'ADD_USER' :{
            return {...state,role: action.payload.role,userData: action.payload,}
        }
        case 'UPDATE_ACCOUNT_INFO' :{
            return {...state,role: action.payload.role,userData: action.payload,}
        }
        default : {
            return state
        }
    }
}
export default userReducer