import axios from 'axios';

axios.defaults.withCredentials = true;

// const instance = axios.create({
//   //   baseURL: 'http://localhost:8080/api', // Adjust the base URL based on your server's URL
//   withCredentials: true, // Include credentials (cookies) in the request
// });
axios.defaults.withCredentials = true;
export const sendPatchRequest = async (url, data) => {
  const res = await axios({
    method: "patch",
    url,
  });
  return res;
};

export const sendPostRequest = async (url, data) => {
  const res = await axios({
    method: "post",
    url,
    data,
  });
  return res;
};

export const sendGetRequest = async (url) => {
  const res = await axios({
    method: "get",
    url,
  });
  return res;
};

export const sendDeleteRequest = async (url) => {
  const res = await axios({
    method: "delete",
    url,
  });
  return res;
};
