import { authenticateService } from "../service/auth.service";
import { getCatalog, getMap, getProjectSettings } from "./../service/qgis.service"
import { consoleLog, parseXML } from "./../utils"
import { Request, Response } from "express";

function errorTreatment(e: any) {

  return null
  // consoleLog(e)
}

export async function getCatalogController(req: Request, res: Response) {

  const{ apikey } = req.headers

  if (!apikey) {

    return res.status(401).json({message: 'Credenciais de autenticação não foram fornecidas'})
  } else {

    try {
      
      const auth = await authenticateService(apikey as string)
  
      var scope = auth.scopes
    } catch (error) {
      
      throw error
    }
  }

  try {
    
    const catalog = await getCatalog(req.header)

    var filteredCatalog = catalog.data

    filteredCatalog.projects = catalog
      .data
      .projects
      .filter((project: any) => {
        return (project.description.split(',').some((value: any) => scope.includes(value)) || project.description === '')
      })
    filteredCatalog.projects_count = filteredCatalog.projects.length
    
    return res.status(catalog.status).send(filteredCatalog)

  } catch (error: any) {

    errorTreatment(error)

     var responseStatus = 404

    if (error.response !== undefined) {
      responseStatus = error.response.status
    }

    return res.status(responseStatus).send(
      error
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