import { httpClient } from "../utils/HttpClient";

export const getCar = () => {
  return httpClient.get("api/Car")
};

export const getAllMarka = () => {
  return httpClient.get("api/Car/AllMarka")
};

export const getAllModel = () => {
  return httpClient.get("api/Car/AllModel")
};

export const getByCar = (id) => {
  return httpClient.get(`api/Car/${id}`);
};

export const getNameCar = (marka, model) => {
  return httpClient.get(`api/Car/car?car=${marka}&model=${model}`)
};
