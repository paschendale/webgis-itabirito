import { consoleLog, parseXML } from "./../utils"
import { Request, Response } from "express";
import { searchService } from "../service/db.service";

function errorTreatment(e:any) {

  return null
}

export async function searchController(req: Request, res: Response) {

  try {

    if (!req.body.keywords) {
      throw new Error('O corpo da requisição deve informar a propriedade "keywords" com as chaves de pesquisa desejadas.')
    }

    const rows = await searchService(req.body.keywords, req.body.layers) 

    consoleLog(`db: (200) Found ${rows.features.length} results`)
    return res.status(200).send(rows)
  } catch (error) {
    
    errorTreatment(error)

    consoleLog(`db: (500) An error ocurred: ${error}`)
    return res.status(500).send(error)
  }
}