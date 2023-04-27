import axios from "axios";

export const api = axios.create({
  baseURL: `/api`
})

api.interceptors.request.use(
  function (config) {

    const webgisLogin = JSON.parse(localStorage.getItem("webgisLogin") || `{}`)

    if (!webgisLogin.apikey) {

      console.log('Nenhuma credencial de autenticação detectada. Requisição em modo anônimo.')
    } else {
      
      console.log(`Credenciais detectadas, utilizando apikey do usuario ${webgisLogin.name}`)
      config.headers["apikey"] = webgisLogin.apikey
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
