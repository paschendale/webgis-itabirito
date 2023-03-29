import { getCatalog, getProjectSettings } from "./../service/qgis.service"
import { consoleLog, parseXML } from "./../utils"
import { Request, Response } from "express";

function errorTreatment(e: any) {

  consoleLog(e)
}

export async function catalogController(req: Request, res: Response) {

  try {
    
    const catalog = await getCatalog(req.header)
    
    return res.status(catalog.status).send(catalog.data)

  } catch (error: any) {

    errorTreatment(error)

    return res.status(error.response.status).send(
      error.response.data
    )
  }
}

export async function projectSettingsController(req: Request, res: Response) {

  try {
    
    const response = await getProjectSettings(req.params.id, req.header)

    const settings = parseXML(response.data)
    
    return res.status(response.status).send(settings)

  } catch (error: any) {

    errorTreatment(error)

    return res.status(error.response.status).send(
      error.response.data
    )
  }
}