import axios from "axios";
import * as Environments from "../environments"
require('axios-debug-log/enable')

export const auth = axios.create({
  baseURL: `${Environments.authServerUrl}`
});