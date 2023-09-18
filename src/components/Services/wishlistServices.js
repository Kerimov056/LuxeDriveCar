import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId,AppUserId) => {
    return httpClient.delete(`api/Wishlists/ProductItem?Id=${carId}&AppUserId=${AppUserId}`)
};

export const PostCar = (carId,AppUserId) => {
    return httpClient.post(`api/Wishlists?Id=${carId}&AppUserId=${AppUserId}`);
};

export const getBasketCars = (AppUserId) => {
    return httpClient.get(`api/Wishlists?AppUserId=${AppUserId}`)
};

export const getBasketItemCount = (AppUserId) => {
    return httpClient.get(`api/Wishlists/Get-Wishlist-Count?AppUserId=${AppUserId}`)
};

