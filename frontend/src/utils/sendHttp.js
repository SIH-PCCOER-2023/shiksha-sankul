import axios from "axios";

// const instance = axios.create({
//   //   baseURL: 'http://localhost:8080/api', // Adjust the base URL based on your server's URL
//   withCredentials: true, // Include credentials (cookies) in the request
// });

export const sendPatchRequest = async (url, data) => {
  const res = await axios(
    {
      method: "patch",
      url,
      data,
    },
    { withCredentials: true }
  );

  return res;
};

export const sendPostRequest = async (url, data) => {
  const res = await axios(
    {
      method: "post",
      url,
      data,
    },
    { withCredentials: true }
  );
  return res;
};

export const sendGetRequest = async (url) => {
  const res = await axios(
    {
      method: "get",
      url,
    },
    { withCredentials: true }
  );
  return res;
};
