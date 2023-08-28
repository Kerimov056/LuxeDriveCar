import { createSlice } from "@reduxjs/toolkit"

const initialState = { token: null, name: null, surname: null,FullName: null, email: null };
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

console.log(initialState);
export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;