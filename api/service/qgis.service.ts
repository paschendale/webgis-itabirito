import { qgis } from "../repository/qgis";

export async function getCatalog(headers?: any) {

  const response = await qgis.get('/index.json',{headers: headers})
  return response
}

export async function getProjectByName(projectName: string, headers?: any) {

  const response = await qgis.get(`/qgisserver?MAP=/etc/qgisserver/${projectName}.qgs&`,{headers: headers})
  return response
}

export async function getProjectById(projectId: string, headers?: any) {

  const response = await qgis.get(`/project/${projectId}?`,{headers: headers})
  return response
}