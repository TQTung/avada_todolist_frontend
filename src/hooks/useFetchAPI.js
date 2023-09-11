import { useEffect, useState } from "react";
import { methods } from "../constants/method";
import requestApi from "../helper/httpclient";

const useFetchAPI = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await requestApi({ endpoint, method: methods.GET });
      setFetched(true);
      setData(res.data.data);
    } catch (err) {
      alert("Error fetching data");
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    errors,
    data,
    loading,
    fetched,
    setData,
    setFetched,
    setLoading,
    setErrors,
  };
};

export default useFetchAPI;
