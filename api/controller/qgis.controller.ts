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

  if (apikey) {

    try {
      
      const auth = await authenticateService(apikey as string)
  
      var scope = auth.scopes
    } catch (error) {
      
      throw error
    }
  } else {

    scope = ''
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

  const{ apikey } = req.headers

  if (apikey) {

    try {
      
      const auth = await authenticateService(apikey as string)
  
      var scope = auth.scopes
    } catch (error) {
      
      throw error
    }
  } else {

    scope = ''
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

    if(!filteredCatalog.projects.map((e:any)=> e.id).includes(req.params.projectId)) {

      return res.status(401).send({message: 'Credenciais de acesso não permitem esta operação'})
    }

    const settings = await getProjectSettings(req.params.projectId, req.header)

    const parsedSettings = parseXML(settings.data)

    if (parsedSettings.WMS_Capabilities.Capability == undefined) { 
      throw new Error(`Não foi possível recuperar as configurações do projeto: ${JSON.stringify(parsedSettings)}`)
    }

    const response = {
      "layers": parsedSettings.WMS_Capabilities.Capability.Layer,
      "layerDrawingOrder": parsedSettings.WMS_Capabilities.Capability.LayerDrawingOrder
    }

    return res.status(200).send(response)

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
  
  const{ apikey } = req.headers

  if (apikey) {

    try {
      
      const auth = await authenticateService(apikey as string)
  
      var scope = auth.scopes
    } catch (error) {
      
      throw error
    }
  } else {

    scope = ''
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

    if(!filteredCatalog.projects.map((e:any)=> e.id).includes(req.params.projectId)) {

      return res.status(401).send({message: 'Credenciais de acesso não permitem esta operação'})
    }

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