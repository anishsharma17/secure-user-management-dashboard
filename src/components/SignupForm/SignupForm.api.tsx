import { axiosClient } from "../../api/api";

export const signupUser = async (username: string, password: string) => {
  return axiosClient
    .post("/api/register", {
      username,
      password,
    })
    .then((res) => res.data);
  // .catch((error) => error);
};
