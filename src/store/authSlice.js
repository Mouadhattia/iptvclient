import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    status: STATUS.IDLE,
  },

  reducers: {
    setAuth(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    logOut(state, action) {
        state.data = {};
        localStorage.removeItem("token")
        window.location.href ="/login"
        console.log("chej")
        localStorage.removeItem("role")
       
      },
  },
});

export const { setAuth, setStatus,logOut } = authSlice.actions;
export default authSlice.reducer;


export const updateProfile = (user) => {
  return async function updateProfileThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {

     const response = await axios.post(`${BASE_URL}user/update`,user);
        const token = response.data.data.api_token

        if(response.data?.data?.role !=="admin"){
          localStorage.setItem("token",token)
        
          dispatch(setAuth(response.data.data))
        }
        
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
     
    }
  };
};
  

export const auth = () => {
  return async function authThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.get(`${BASE_URL}auth/current`);
      const data = await response.data.data.payload
      const res= await axios.post(`${BASE_URL}user/getOne`, data);
      
       const current = res.data.data

       

     
     dispatch(setAuth(current))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const logIn = ({userName,password}) => {
    return async function logInThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await axios.post(`${BASE_URL}auth/login`,{userName,password});
        const token = response.data.data.api_token
        const role = response.data.data.role
         localStorage.setItem("token",token)
         window.location.href ="/"
         if(role!=="admin"){
          localStorage.setItem("role",role)
         }
         
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
        throw error.response.data.message
      }
    };
  };
  export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }

