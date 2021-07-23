const axios = require("axios");
const axiosClient = axios.create({ baseURL: "http://localhost:8080/" });

module.exports.postRequest = (URL, payload) => {
  let auth = localStorage.getItem("auth");
  let token = " ";
  if (auth) {
    token = auth.split(" ")[1];
  }

  return axiosClient.post(URL, payload, {
    withCredentials: true,
    headers: token !== null ? { authorization: `Bearer ${token}` } : {},
  });
};
module.exports.deleteRequest = (URL, payload) => {
  let auth = localStorage.getItem("auth");
  let token = null;
  if (auth) {
    token = auth.split(" ")[1];
  }
  return axiosClient.delete(URL, payload, {
    withCredentials: true,
    headers: token !== null ? { authorization: `Bearer ${token}` } : {},
  });
};

module.exports.getRequest = (URL, payload) => {
  let auth = localStorage.getItem("auth");
  let token = null;
  if (auth) {
    token = auth.split(" ")[1];
  }
  return axiosClient.get(URL, payload, {
    withCredentials: true,
    headers: token !== null ? { authorization: `Bearer ${token}` } : {},
  });
};
