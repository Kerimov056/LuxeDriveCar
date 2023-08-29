import { httpClient } from "../utils/HttpClient";

export const postComments = (data) => {
    return httpClient.post("api/CarCommets/commentPost",data)
};