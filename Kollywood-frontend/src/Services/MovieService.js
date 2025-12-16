import { api } from "../api"
export const GetMovies=async (id)=>{
    var response = await api.get(`${id}`);
    return response.data;
}

export const GetMatches = async (input)=>{
    var response = await api.get(`Matches/${input}`);
    return response.data;
}

