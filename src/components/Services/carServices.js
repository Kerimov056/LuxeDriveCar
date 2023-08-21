import { httpClient } from "../utils/HttpClient";

export const getCar= () =>{
    return httpClient.get("api/Car")
  };