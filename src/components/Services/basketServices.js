import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId) => {
    return httpClient.delete(`api/Baskets/ProductItem?Id=${carId}`)
};
//basketsler sefdi aa sssssssssssssssssssssssssssssssssss
export const PostCar = (carId,AppUserId) => {
    return httpClient.post(`api/Baskets?Id=${carId}&AppUserId=${AppUserId}`);
};

export const getBasketCars = () => {
    return httpClient.get("api/Baskets")
};

export const getBasketItemCount = () => {
    return httpClient.get("api/Baskets/Get-Basket-Count")
};

