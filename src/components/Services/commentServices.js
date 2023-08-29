import { httpClient } from "../utils/HttpClient";

export const postComments = (data) => {
    console.log(",,,,,,,,",data);
    data.carid = "c842fbd2-1df4-4995-319f-08dba864d5f3";
    return httpClient.post("api/CarCommets/commentPost",data)
};

