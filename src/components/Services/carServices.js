import { httpClient } from "../utils/HttpClient";

export const getCar = (category, type, marka, model, minPrice, maxPrice) => {
  return httpClient.get(`api/Car/searchCar?category=${category}&type=${type}&marka=${marka}&model=${model}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
};

export const getCarAbout = () => {
  return httpClient.get(`api/Car`)
};

export const getCarAll = () => {
  return httpClient.get("api/Car")
};

export const GameGetTenCar = () => {
  return httpClient.get("api/Car/GameGetTenAsync")
};

export const GetAllCompaignAsync = () => {
  return httpClient.get(`api/Car/GetAll-CompaignAsync}`)
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

export const getByCarQRCode = (id) => {
  return httpClient.get(`api/Car/qrcode?id=${id}`);
};
export const gameGetByCarQRCode = (id) => {
  return httpClient.get(`api/Car/GameQRCode?id=${id}`);
};

export const getNameCar = (marka, model) => {
  return httpClient.get(`api/Car/car?car=${marka}&model=${model}`)
};


export const IsCampaigns = () => {             //companinanin olub olmamasini bildirir
  return httpClient.get("api/Car/IsCampaigns")
};
