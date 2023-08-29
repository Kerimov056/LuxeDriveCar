import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId,AppUserId) => {
    return httpClient.delete(`api/Baskets/ProductItem?Id=${carId}&AppUserId=${AppUserId}`)
};

export const PostCar = (carId,AppUserId) => {
    return httpClient.post(`api/Baskets?Id=${carId}&AppUserId=${AppUserId}`);
};

export const getBasketCars = () => {
    return httpClient.get("api/Baskets")
};

export const getBasketItemCount = (AppUserId) => {
    return httpClient.get(`api/Baskets/Get-Basket-Count?AppUserId=${AppUserId}`)
};

