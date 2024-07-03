import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";

export const store = configureStore({
    reducer:{
        auth : authSliceReducer
    }
});


export default store;