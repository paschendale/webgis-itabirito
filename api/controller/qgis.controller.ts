import { getCatalog } from "./../service/qgis.service"
import { consoleLog } from "./../utils"
import { Request, Response } from "express";

function errorTreatment(e: any) {

  consoleLog(e)
}

export async function catalogController(req: Request, res: Response) {

  consoleLog(`here`)

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