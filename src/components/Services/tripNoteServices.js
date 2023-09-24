import { httpClient } from "../utils/HttpClient";


export const getAllTrip = (TripId) => {
    return httpClient.get(`api/TripNotes?TripId=${TripId}`);
};

export const getByTrip = (tripId) => {
    return httpClient.get(`api/Trips/${tripId}`);
};

export const PostTrip = (data) => {
    return httpClient.post(`api/TripNotes/TripPost`,data);
};

export const UpdateTrip = (id, data) => {
    return httpClient.put(`api/TripNotes/${id}`, data)
  };

export const RemoveTrip = (tripNoteId) => {
    return httpClient.delete(`api/TripNotes/${tripNoteId}`,);
};

