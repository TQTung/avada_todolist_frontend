import { useState } from "react";
import { methods } from "../constants/method";
import requestApi from "../helper/httpclient";

const useCreateAPI = () => {
  const [loading, setLoading] = useState(false);

  const createData = async (endpoint, data) => {
    try {
      setLoading(true);
      return await requestApi({
        endpoint,
        method: methods.POST,
        body: data,
      });
    } catch (error) {
      alert("An error occurred while creating the new data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createData };
};

export default useCreateAPI;
