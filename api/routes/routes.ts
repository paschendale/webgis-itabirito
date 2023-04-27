import { Router } from "express";
import { searchController } from "../controller/db.controller";
import { getCatalogController, getFeatureInfoController, getMapController, getProjectSettingsController } from "./../controller/qgis.controller";
import { authenticateController, loginController } from "../controller/auth.controller";

export const routes = Router();

const baseHref = '/api'

routes.get(baseHref + '/catalog',getCatalogController)

routes.get(baseHref + '/settings/:projectId',getProjectSettingsController)
routes.get(baseHref + '/map/:projectId', getMapController)
routes.get(baseHref + '/map/info/:projectId', getFeatureInfoController)

routes.post(baseHref + '/search', searchController)

routes.post(baseHref + '/login',loginController)
routes.post(baseHref + '/auth',authenticateController)