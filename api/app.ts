import express from "express";
import cors from "cors";
import { consoleLog, makeHealthCheck } from "./utils"
import { routes } from "./routes/routes";
import { authServerUrl, qgisServerUrl } from "./environments";

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit:50000}));
app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(2001, () => consoleLog("API inicializada na porta 2001"));

// health check to services

makeHealthCheck(qgisServerUrl)
makeHealthCheck(`${authServerUrl}docs`)