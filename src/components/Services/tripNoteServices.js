import { httpClient } from "../utils/HttpClient";


export const getAllTripNotes = (TripId) => {
    return httpClient.get(`api/TripNotes?TripId=${TripId}`);
};

export const getByTripNotes = (tripId) => {
    return httpClient.get(`api/Trips/${tripId}`);
};

export const PostTrip = (data) => {
    return httpClient.post(`api/TripNotes/TripPost`,data);
};

export const UpdateTripNotes = (id, data) => {
    return httpClient.put(`api/TripNotes/${id}`, data)
  };

export const RemoveTripNotes = (tripNoteId,appUserId) => {
    return httpClient.delete(`api/TripNotes/${tripNoteId}?AppUserId=${appUserId}`,);
};

