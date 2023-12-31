import { httpClient } from "../utils/HttpClient";


export const getAllTrip = (AppUserId) => {
    return httpClient.get(`api/Trips?AppUserId=${AppUserId}`);
};

export const getByTrip = (tripId) => {
    return httpClient.get(`api/Trips/${tripId}`);
};

export const myTripCount = (AppUserId) => {
    return httpClient.get(`api/Trips/myTripCount?AppUserId=${AppUserId}`);
};

export const myTripCars = (TripId) => {
    return httpClient.get(`api/Trips/GetTripCarByIdAsync?TripId=${TripId}`);
};

export const PostTrip = (data) => {
    return httpClient.post(`api/Trips`,data);
};

export const UpdateTrip = (id, data) => {
    return httpClient.put(`api/Trips/${id}`, data)
  };

export const RemoveTrip = (TripId,AppUserId) => {
    return httpClient.delete(`api/Trips/RemoveTrip?tripId=${TripId}&AppUserId=${AppUserId}`);
};

