import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GetMatches,GetMovies} from "../Services/MovieService";


export const FetchMovies = createAsyncThunk("fetch/movies",async(id)=>{
    const movies = await GetMovies(id);
    console.log("the response is",movies);
    return movies;
})

export const FetchMatches = createAsyncThunk("fetch/matches",async(inp)=>{
    const response = await GetMatches(inp);
    console.log("the response is",response[0]);
    return response;
})


const MovieSlice = createSlice({
    name:"movies",
    initialState:{
        loading : false,
        error:null,
        movie : null,
        matches : []
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(FetchMovies.fulfilled,(state,action)=>{
                state.loading = false;
                  console.log("✅ Reducer received:", action.payload);

                state.movie = action.payload;

            })
        builder
            .addCase(FetchMatches.fulfilled,(state,action)=>{
                state.loading  = false;
                  console.log("✅ Reducer received:", action.payload);

                state.matches = action.payload;
            })
    }
})

export default MovieSlice.reducer;