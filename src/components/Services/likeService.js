import { httpClient } from "../utils/HttpClient";

export const postLike = (data) => {
    return httpClient.post("api/Likes",data)
};  