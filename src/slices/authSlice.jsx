import {createSlice} from "@reduxjs/toolkit";

const initialState={
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
          setToken(state, action) {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("token", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("token"); // Remove token on logout
            }
        },
    }
})

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer