import axios from "axios";

export const baseUrl = "http://localhost:5000";

export let timoutReq = 10000;

export const axiosCalls = async (path, method, data = null) => {
  const token = localStorage.getItem("token");
  try {
    let res = await axios({
      method,
      url: `${baseUrl}/${path}`,
      data,
      timeout: timoutReq,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res) {
      return res.data;
    }
  } catch (error) {
    return { er: error.response.data };
  }
};
