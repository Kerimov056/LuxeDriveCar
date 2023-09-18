import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId,AppUserId) => {
    return httpClient.delete(`api/Wishlists/ProductItem?Id=${carId}&AppUserId=${AppUserId}`)
};

export const PostCarWishlist = (carId,AppUserId) => {
    return httpClient.post(`api/Wishlists?Id=${carId}&AppUserId=${AppUserId}`);
};

export const getWishlistCars = (AppUserId) => {
    return httpClient.get(`api/Wishlists?AppUserId=${AppUserId}`)
};

export const getWishlistItemCount = (AppUserId) => {
    return httpClient.get(`api/Wishlists/Get-Wishlist-Count?AppUserId=${AppUserId}`)
};

