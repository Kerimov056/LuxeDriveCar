import { httpClient } from "../utils/HttpClient";


export const PostCommunications = (data) => {
    return httpClient.post('api/Communications', data);
};
