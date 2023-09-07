import axios from "axios";

export default async function requestApi({
  endpoint,
  method,
  body,
  params,
  query,
  responseType = "json",
}) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  };

  const instance = axios.create({ headers });
  return instance.request({
    method: method,
    url: `${process.env.REACT_APP_URL_API}${endpoint}${
      query ? `/${query}` : ""
    }`,
    data: body,
    params: { params },
    responseType: responseType,
  });
}
