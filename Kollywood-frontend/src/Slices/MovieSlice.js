import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {GetMovie,GetMatches} from "../Services/MovieService";
import { act } from "react";
export const FetchMovie = createAsyncThunk("fetch/movies",async(id)=>{
    var movie = await GetMovie(id);
    console.log(`The movie is, ${movie.title}.`);
    return movie;
})

export const FetchMatches = createAsyncThunk("fetch/matches",async(str)=>{
    var matches = await GetMatches(str);
    console.log(`The matches are, `);
    console.log(matches);
    return matches;

})

const MovieSlice = createSlice({
    name : "movie",
    initialState:{
        error:null,
        loading:false,
        movie:null,
        matches: []
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(FetchMovie.fulfilled,(state,action)=>{
                state.loading=false;
                state.movie = action.payload;
            })
            .addCase(FetchMatches.fulfilled,(state,action)=>{
                state.loading=false;
                state.matches=action.payload;
            })
    }
})

export default MovieSlice.reducer;