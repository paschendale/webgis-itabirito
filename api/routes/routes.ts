import { Router } from "express";
import { getNearestPanoramaController, searchController } from "../controller/db.controller";
import { getCatalogController, getFeatureInfoController, getMapController, getProjectSettingsController } from "./../controller/qgis.controller";
import { authenticateController, loginController } from "../controller/auth.controller";
import { proxyController } from "../controller/proxy.controller";

export const routes = Router();

const baseHref = '/api'

// QGIS Routes
routes.get(baseHref + '/catalog',getCatalogController)
routes.get(baseHref + '/settings/:projectId',getProjectSettingsController)
routes.get(baseHref + '/map/:projectId', getMapController)
routes.get(baseHref + '/map/info/:projectId', getFeatureInfoController)

// DB Routes
routes.post(baseHref + '/search', searchController)
routes.get(baseHref + '/360/:x/:y', getNearestPanoramaController)

// Auth Routes
routes.post(baseHref + '/login',loginController)
routes.post(baseHref + '/auth',authenticateController)

// Auxiliary routes
routes.get(baseHref + `/proxy/:url`, proxyController)