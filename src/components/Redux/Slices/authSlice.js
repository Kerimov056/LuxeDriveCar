import  { createSlice } from "@reduxjs/toolkit"

const initialState = { token:null, name:null, surname:null, email:null};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            return action.payload;
        },
        logout:(state, action) => {
            return initialState;
        },
    }
})

export const { changeTheme } = authSlice.actions;
export default authSlice.reducer;