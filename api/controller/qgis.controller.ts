import { getCatalog, getMap, getProjectSettings } from "./../service/qgis.service"
import { consoleLog, parseXML } from "./../utils"
import { Request, Response } from "express";

function errorTreatment(e: any) {

  return null
  // consoleLog(e)
}

export async function getCatalogController(req: Request, res: Response) {

  try {
    
    const catalog = await getCatalog(req.header)
    
    return res.status(catalog.status).send(catalog.data)

  } catch (error: any) {

    errorTreatment(error)

     var responseStatus = 404

    if (error.response !== undefined) {
      responseStatus = error.response.status
    }

    return res.status(responseStatus).send(
      error.response.data
    )
  }
}

export async function getProjectSettingsController(req: Request, res: Response) {

  try {
    
    const response = await getProjectSettings(req.params.projectId, req.header)

    const parsedResponse = parseXML(response.data)

    if (parsedResponse.WMS_Capabilities.Capability == undefined) { 
      throw new Error(`Não foi possível recuperar as configurações do projeto: ${JSON.stringify(parsedResponse)}`)
    }

    const settings = {
      "layers": parsedResponse.WMS_Capabilities.Capability.Layer,
      "layerDrawingOrder": parsedResponse.WMS_Capabilities.Capability.LayerDrawingOrder
    }

    return res.status(response.status).send(settings)

  } catch (error: any) {

    errorTreatment(error)

    var responseStatus = 404

    if (error.response !== undefined) {
      responseStatus = error.response.status
    }

    return res.status(responseStatus).send(
      error.response.data
    )
  }
}

export async function getMapController(req: Request, res: Response) {

  try {

    const response = await getMap(req.params.projectId,req.query)

    res.contentType(response.headers['content-type'])
    return res.status(response.status).end(response.data)

  } catch (error: any) {
    
    errorTreatment(error)

    var responseStatus = 404

    if (error.response !== undefined) {
      responseStatus = error.response.status
    }

    return res.status(responseStatus).send(
      error.response.data
    )
  }
}

export async function getFeatureInfoController(req: Request, res: Response) {

  try {

    const response = await getMap(req.params.projectId,req.query)

    return res.status(response.status).end(response.data)

  } catch (error: any) {
    
    errorTreatment(error)

    var responseStatus = 404

    if (error.response !== undefined) {
      responseStatus = error.response.status
    }

    return res.status(responseStatus).send(
      error.response.data
    )
  }
}