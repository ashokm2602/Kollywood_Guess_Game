import { configureStore } from "@reduxjs/toolkit";
import moviereducer from "./Slices/MovieSlice";

const store = configureStore({
    reducer:{
        movie : moviereducer
    }
})

export default store;