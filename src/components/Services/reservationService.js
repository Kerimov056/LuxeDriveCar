import { httpClient } from "../utils/HttpClient";


export const PostReservation = (data) => {
    return httpClient.post('api/CarReservations', data);
};
