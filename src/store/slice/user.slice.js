import { createSlice } from '@reduxjs/toolkit';

const userData = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        changeUserData : (state, action) => {
            return {...action.payload}
        }
    }
})

export const { changeUserData} = userData.actions;
export default userData.reducer;

