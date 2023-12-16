import axios from 'axios';

export const sendPatchRequest = async (url, data) => {
  const res = await axios({
    method: 'patch',
    url,
    data,
  });

  return res;
};

export const sendPostRequest = async (url, data) => {
  const res = await axios({
    method: 'post',
    url,
    data,
  });

  return res;
};

export const sendGetRequest = async (url) => {
  const res = await axios({
    method: 'get',
    url,
  });

  return res;
};
