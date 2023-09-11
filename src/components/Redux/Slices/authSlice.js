import { createSlice } from "@reduxjs/toolkit"

const initialState = { token: null, expireDate:null, username: null, email: null, appuserid: null, ProfileImage: null };
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            return action.payload;
        },
        logoutAction: (state, action) => {
            return initialState;
        },
    }
})

// console.log("dsddddd",initialState.ProfileImage);
export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;