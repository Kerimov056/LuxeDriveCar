import { httpClient } from "../utils/HttpClient";


export const getAllTrip = (AppUserId) => {
    return httpClient.get(`api/Trips?AppUserId=${AppUserId}`);
};

export const getByTrip = (tripId) => {
    return httpClient.get(`api/Trips/${tripId}`);
};

export const PostCar = (data) => {
    return httpClient.post(`api/Trips`,data);
};

export const UpdateTrip = (id, data) => {
    return httpClient.put(`api/Trips/${id}`, data)
  };

export const RemoveTrip = (data) => {
    return httpClient.delete(`api/Trips/RemoveTrip`,data);
};

