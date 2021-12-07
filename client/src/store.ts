import {createStore, applyMiddleware, combineReducers} from 'redux';
import { deparmentReducer,employeeReducer} from './reducers';

import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    departments: deparmentReducer,
    employees: employeeReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
