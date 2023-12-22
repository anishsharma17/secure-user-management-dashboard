import { axiosClient } from "../../api/api";

export const loginUser = async (username: string, password: string) => {
  return axiosClient
    .post("/api/login", {
      username,
      password,
    })
    .then((res) => res.data);
  // .catch((error) => error);
};
