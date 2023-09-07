import { httpClient } from "../utils/HttpClient";

export const login = (data) => {
    return httpClient.post('api/Auth/Login', data);
};

export const ConfiremPassword = (data) => {
    return httpClient.post('api/Auth/ConfiremPassword', data);
};


export const SendEmailAuth = (userId) => {
    return httpClient.post(`api/Auth/password-reset?email=${userId}`);
};


