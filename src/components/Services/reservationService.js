import { httpClient } from "../utils/HttpClient";


export const PostReservation = (data) => {
    return httpClient.post('api/CarReservations', data);
};

export const getReservation = (appUserId) => {
    return httpClient.get(`api/CarReservations/UserId?Id=${appUserId}`);
};
