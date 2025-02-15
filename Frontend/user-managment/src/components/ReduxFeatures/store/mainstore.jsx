import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combinestore";


const store=configureStore({
    reducer:rootReducer,
})

export default store;