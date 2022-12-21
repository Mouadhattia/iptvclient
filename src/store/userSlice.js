import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    notification :{},
    backMessage:""
  },

  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setNotification(state,action){
      state.notification =action.payload;
    },
    setMessage(state,action){
      state.backMessage =action.payload;
    }
  },
});

export const { setUsers, setStatus,setNotification,setMessage } = userSlice.actions;
export default userSlice.reducer;

export const fetchusers = (userData) => {
  return async function fetchuserThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
    
      const response = await axios.post(`${BASE_URL}user/`,userData);
    
       const data = await response.data.data
     
     dispatch(setUsers(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const addusers = (data) => {
 
    return async function adduserThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
      
  await axios.post(`${BASE_URL}user/create`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
        dispatch(setMessage(error.response.data.message))
       throw error
      }
    };
  };
  export const updateUsers = (data) => {
    return async function updateUserThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}user/update`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const deleteUsers = (data) => {
    return async function deleteUserThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}user/delete`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const getUser = (data) => {
    return async function getUserThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}user/getOne`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const uploadImg = async(data) => {
    const formData = new FormData()
    formData.append('image', data)
    try {
        await axios.post(`${BASE_URL}upload`,data);
      
        
     
      } catch (error) {
        console.log(error);
      }
 
  };
  export const fetchNotifications = (userData) => {
    return async function fetchNotificationThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
      
        const response = await axios.post(`${BASE_URL}notification/getAll`,userData);
      
         const data = await response.data.data
       
       dispatch(setNotification(data))
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };


