import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    userData:[],
    backMessage:""
  },

  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setUserProducts(state, action) {
      state.userData = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setMessage(state,action){
      state.backMessage =action.payload;
    }
  },
});

export const { setProducts,setUserProducts, setStatus,setMessage } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = (filter) => {
  return async function fetchProductThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.post(`${BASE_URL}price/getAll`,filter);
    
       const data = await response.data.data
     
     dispatch(setProducts(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const fetchUserProducts = (filter) => {
  return async function fetchUserProductThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.post(`${BASE_URL}price/getAllPrices`,filter);
    
       const data = await response.data.data
     
     dispatch(setUserProducts(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
export const updateProducts = (price) => {
  return async function updateProductThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
       await axios.post(`${BASE_URL}price/update`,price);
    
   
     
    
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
      dispatch(setMessage(error.response.data.message))
      throw error
    }
  };
};
