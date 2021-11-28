import {createStore, combineReducers,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'  
import userReducer from '../reducers/userReducer'
import studentReducer from '../reducers/studentReducer'
import thunk from 'redux-thunk'

const configureStore= ()=>{
    const store=createStore(combineReducers({
        user: userReducer,
        student: studentReducer
        }
    ),composeWithDevTools(applyMiddleware(thunk)))
    return store
}
export default configureStore
