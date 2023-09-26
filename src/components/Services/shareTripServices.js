import { httpClient } from "../utils/HttpClient";


export const getAllShareContirbuter = (TripId) => {
    return httpClient.get(`api/ShareTrips/Contributors?tripId=${TripId}`);
};

export const getAllShareTrip = (TripId) => {
    return httpClient.get(`api/ShareTrips?tripId=${TripId}`);
};

export const updateShareTrip = (TripId, data) => {
    return httpClient.put(`api/ShareTrips/${TripId}`, data);
};
