import { httpClient } from "../utils/HttpClient";

export const postComments = (data) => {
    console.log(",,,,,,,,",data);
    return httpClient.post("api/CarCommets/commentPost",data)
};

