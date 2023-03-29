import axios from "axios";
import * as Environments from "./../environments"
require('axios-debug-log/enable')

export const qgis = axios.create({
  baseURL: `${Environments.qgisServerUrl}`
});