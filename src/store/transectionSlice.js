import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const transectionSlice = createSlice({
  name: "transection",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    backMessage:""
  },

  reducers: {
    settransections(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setMessage(state,action){
      state.backMessage =action.payload;
    }
  },
});

export const { settransections, setStatus ,setMessage} = transectionSlice.actions;
export default transectionSlice.reducer;

export const fetchtransections = (trans) => {
  return async function fetchtransectionThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
    
      const response = await axios.post(`${BASE_URL}transection/getALl`,trans);
    
       const data = await response.data.data
     
     dispatch(settransections(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const addtransections = (data) => {
    return async function addtransectionThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {

        await axios.post(`${BASE_URL}transection/create`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      dispatch(setMessage(error.response.data.message))
        throw error
      }
    };
  };

  export const deletetransections = (data) => {
    return async function deletetransectionThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}transection/delete`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const gettransection = (data) => {
    return async function gettransectionThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}transection/getOne`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const updateTransection= (data) => {
    return async function updateTransectionThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}transection/update`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };


