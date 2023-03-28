import { Router } from "express";
import { catalogController } from "./../controller/qgis.controller";

export const routes = Router();

routes.get('catalog',catalogController)