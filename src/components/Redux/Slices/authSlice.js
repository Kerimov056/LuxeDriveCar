import  { createSlice } from "@reduxjs/toolkit"

const initialState = { token:null, name:null, surname:null, email:null};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginAction:(state, action) => {
            return action.payload;
        },
        logoutAction:(state, action) => {
            return initialState;
        },
    }
})

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;