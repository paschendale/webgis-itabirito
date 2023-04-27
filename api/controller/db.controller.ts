import { consoleLog, parseXML } from "./../utils"
import { Request, Response } from "express";
import { searchService } from "../service/db.service";
import { authenticateService } from "../service/auth.service";
import { getCatalog } from "../service/qgis.service";

function errorTreatment(e:any) {

  return null
}

export async function searchController(req: Request, res: Response) {

  const{ apikey } = req.headers
  const{ projectId, keywords, layers } = req.body

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

    if(!filteredCatalog.projects.map((e:any)=> e.id).includes(projectId)) {

      return res.status(401).send({message: 'Credenciais de acesso não permitem esta operação'})
    }

    if (!keywords) {
      throw new Error('O corpo da requisição deve informar a propriedade "keywords" com as chaves de pesquisa desejadas.')
    }

    const rows = await searchService(keywords, layers) 

    consoleLog(`db: (200) Found ${rows.features.length} results`)
    return res.status(200).send(rows)
  } catch (error) {
    
    errorTreatment(error)

    consoleLog(`db: (500) An error ocurred: ${error}`)
    return res.status(500).send(error)
  }
}