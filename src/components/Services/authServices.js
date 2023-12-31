import { httpClient } from "../utils/HttpClient";

export const login = (data) => {
    return httpClient.post('api/Auth/Login', data);
};
export const register = (data) => {
    return httpClient.post('api/Auth/register', data);
};

export const ConfiremPassword = (data) => {
    return httpClient.post('api/Auth/ConfiremPassword', data);
};


export const SendEmailAuth = (userId) => {
    return httpClient.post(`api/Auth/password-reset?email=${userId}`);
};


export const GoogleSignIn = (userId) => {
    return httpClient.post(`api/Auth/google-login?idToken=${userId}`);
};


export const ProfileImageEdit = (email, image) => {
    return httpClient.post(`api/Auth/profile-image?Email=${email}`);
};


