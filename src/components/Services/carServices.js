import { httpClient } from "../utils/HttpClient";

export const getCar = (category, type, marka, model, minPrice, maxPrice) => {
  return httpClient.get(`api/Car/searchCar?category=${category}&type=${type}&marka=${marka}&model=${model}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
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
