import axios from "../axios";
const handleLoginAPI = (email, password) => {
  return axios.post("/api/v1/login", { email, password }); // viết tắt {email:email,password:password}
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/v1/get-all-users?id=${inputId}`);
};
const createUserService = (data) => {
  return axios.post("/api/v1/create-user", data);
};
export { handleLoginAPI, getAllUsers, createUserService };
