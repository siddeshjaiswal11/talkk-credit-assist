import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const apiWrapper = async ({
  url,
  method = "GET",
  data = {},
  headers = {},
  withCredentials = true,
  params = {},
}) => {
  try {
    const isFormData = data instanceof FormData;

    const config = {
      url: `${baseURL}${url}`,
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      withCredentials,
      ...(method === "GET" ? { params } : { data }),
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("Error inside wrapper is: ", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong. Please try again.";
    throw new Error(errorMessage);
  }
};

export default apiWrapper;
