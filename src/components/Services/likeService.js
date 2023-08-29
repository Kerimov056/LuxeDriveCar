import { httpClient } from "../utils/HttpClient";

export const postLike = (carCommentId,AppUserId) => {
    return httpClient.post(`api/Likes?AppUserId=${AppUserId}&CarCommentId=${carCommentId}`)
};  