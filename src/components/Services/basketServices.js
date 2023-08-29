import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId) => {
    return httpClient.delete(`api/BasketsS/ProductItem?Id=${carId}`)
};
                                                            //basketsler sefdi aa sssssssssssssssssssssssssssssssssss
export const PostCar = (carId) => {
    return httpClient.post(`api/BasketsS?Id=${carId}`);
};

export const getBasketCars = () => {
    return httpClient.get("api/BasketsS")
};

export const getBasketItemCount = () => {
    return httpClient.get("api/BasketsS/Get-Basket-Count")
};

