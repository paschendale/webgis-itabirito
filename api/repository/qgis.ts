import axios from "axios";
import { consoleLog } from "../utils";
import * as Environments from "./../environments"

export const qgis = axios.create({
  baseURL: `${Environments.qgisServerUrl}`
});

axios.interceptors.request.use(function (config) {
  
  consoleLog(`${config.method}: ${config.baseURL}`)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});