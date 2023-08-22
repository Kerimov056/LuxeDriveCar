import { httpClient } from "../utils/HttpClient";

export const PostCar = (carId) => {
    return httpClient.post(`/Baskets?Id=${carId}`);
};

export const getBasket = () => {
    return httpClient.get("api/Baskets")
};

