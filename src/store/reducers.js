// reducers.js
import { combineReducers } from 'redux';

// Import your reducers here
import user from './slice/user.slice';
import task from './slice/tasks.slice';

const rootReducer = combineReducers({
    user : user,
    task: task,
});

export default rootReducer;
