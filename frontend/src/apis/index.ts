import axios from "axios";

const apiClient = axios.create({
  baseURL: "api/v1/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

apiClient.defaults.xsrfCookieName = "csrftoken";
apiClient.defaults.xsrfHeaderName = "X-CSRFToken";

apiClient.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error.response.data);
  }
);

export { apiClient };
