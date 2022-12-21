import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const softwareSlice = createSlice({
  name: "software",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },

  reducers: {
    setSoftwares(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setSoftwares, setStatus } = softwareSlice.actions;
export default softwareSlice.reducer;

export const fetchSoftwares = () => {
  return async function fetchSoftwareThunk(dispatch) {
  
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.post(`${BASE_URL}software/getAll`);
    
       const data = await response.data.data
     
     dispatch(setSoftwares(data))
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};


