import { useState } from "react";
import { methods } from "../constants/method";
import requestApi from "../helper/httpclient";

const useDeleteAPI = () => {
  const [loading, setLoading] = useState(false);

  const deleteData = async (endpoint, id) => {
    try {
      setLoading(true);
      return await requestApi({ endpoint, method: methods.DELETE, query: id });
    } catch (err) {
      alert("An error occurred while deleting the new data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteData };
};

export default useDeleteAPI;
