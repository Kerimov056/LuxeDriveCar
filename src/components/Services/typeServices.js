import { httpClient } from "../utils/HttpClient";

export const getType = () => {
  return httpClient.get("api/CarType")
};
