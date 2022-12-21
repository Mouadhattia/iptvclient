import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    status: "zabv",
    orders:[],
    backMessage:""
  },

  reducers: {
    setOrders(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setHistory(state,action){
      state.orders = action.payload;
    },
    setMessage(state,action){
      state.backMessage =action.payload;
    }
  },
});

export const { setOrders, setStatus,setHistory,setMessage } = orderSlice.actions;
export default orderSlice.reducer;

export const fetchorders = (orderData) => {
  return async function fetchorderThunk(dispatch) {
 
    dispatch(setStatus(STATUS.LOADING));
    try {
  
      const response = await axios.post(`${BASE_URL}order/getAll`,orderData);
    
       const data = await response.data.data
     
     dispatch(setOrders(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const addorder = (data) => {
    return async function addorderThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
    
        await axios.post(`${BASE_URL}order/create`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
        dispatch(setMessage(error.response.data.message))
        throw error
      }
    };
  };
  export const updateorder = (data) => {
    return async function updateorderThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}order/update`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const deleteorder = (data) => {
    return async function deleteorderThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}order/delete`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const getorder = (data) => {
    return async function getorderThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        await axios.post(`${BASE_URL}order/getOne`,data);
      
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };
  export const getHistory = (orderData) => {
    return async function getHistoryrThunk(dispatch) {
    
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await axios.post(`${BASE_URL}order/getProvider`,orderData);
    
        const data = await response.data.data.orders
      
      dispatch(setHistory(data))
        
        dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  };


