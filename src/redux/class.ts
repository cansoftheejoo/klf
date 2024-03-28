import { categoryClassListFilterType } from "@/type/class";
import { createSlice } from "@reduxjs/toolkit";

const initialState:{
    value: boolean,
    filter?:categoryClassListFilterType
} = {
  value: false,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setCategoryClassListFilter: (state, action) => {
      state.filter = action.payload;
    },
 
  },
});

export const { 
    setCategoryClassListFilter
 } = classSlice.actions;

export default classSlice.reducer;