import {api} from "../api";

export const GetMovie = async(id)=>{
    var movie = await api.get(`${id}`);
    console.log(`the movie is, ${movie.data}`);
    return movie.data;
}

export const GetMatches = async(str)=>{
    var matches = await api.get(`matches/${str}`);
    console.log(`the matches are, ${matches.data}`);
    return matches.data;
}
