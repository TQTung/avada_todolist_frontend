import { useState } from "react";
import { methods } from "../constants/method";
import requestApi from "../helper/httpclient";

const useUpdateAPI = () => {
  const [loading, setLoading] = useState(false);

  const updateData = async ({ endpoint, id, data }) => {
    try {
      setLoading(true);
      return await requestApi({
        endpoint,
        method: methods.PUT,
        query: id,
        body: data,
      });
    } catch (err) {
      alert("An error occurred while updating the new data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateData };
};

export default useUpdateAPI;
