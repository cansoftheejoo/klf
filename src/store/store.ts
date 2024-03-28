import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "../redux/alert";
import classReducer from "../redux/class";

//redux store
export const store = configureStore({
  reducer: {
    alert: alertReducer, // alert modal
    class: classReducer, // class modal
  },
});