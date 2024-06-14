import { createSlice } from '@reduxjs/toolkit';

const taskData = createSlice({
    name : 'task',
    initialState : [],
    reducers : {
        addAllTasks: (state, action) => {
            return [...action.payload]
        },
        addSingleTask: (state, action) => {
            return [action.payload, ...state]
        },
        updateSingleTask: (state, action) => {
            const { _id } = action.payload;
            const index = state.findIndex(task => task._id === _id);
            state[index] = action.payload;
            return state;
        },
        deleteSingleTask: (state, action) => {
            const { _id } = action.payload;
            return state.filter(task => task._id !== _id);
        }
    }
})

export const { addAllTasks, addSingleTask, updateSingleTask, deleteSingleTask} = taskData.actions;
export default taskData.reducer;

