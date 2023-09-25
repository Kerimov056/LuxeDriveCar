import { httpClient } from "../utils/HttpClient";


export const getAllShareContirbuter = (TripId) => {
    return httpClient.get(`api/ShareTrips/Contributors?tripId=${TripId}`);
};
