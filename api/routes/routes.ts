import { Router } from "express";
import { catalogController, projectSettingsController } from "./../controller/qgis.controller";

export const routes = Router();

const baseHref = '/api'

routes.get(baseHref + '/catalog',catalogController)
routes.get(baseHref + '/map/settings/:id',projectSettingsController)