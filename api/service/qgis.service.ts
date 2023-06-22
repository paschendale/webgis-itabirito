import { qgis } from "../repository/qgis.repo";

export async function getCatalog(headers?: any) {

  const response = await qgis.get('/index.json',{headers: headers})
  return response
}

export async function getProjectByName(projectName: string, headers?: any) {

  const response = await qgis.get(`/qgisserver?MAP=/etc/qgisserver/${projectName}.qgs&`,{headers: headers})
  return response
}

export async function getProjectSettings(projectId: string, headers?: any) {

  const response = await qgis.get(`/project/${projectId}?service=WMS&request=GetProjectSettings`,{headers: headers})
  return response
}

export async function getMap(projectId: string, params: any, headers?: any) {

  const queryParams = new URLSearchParams(params)
  const response = await qgis.get(`/project/${projectId}?${queryParams}`,{headers: headers, responseType: "arraybuffer"})
  return response
}

export async function getFeatureInfo(projectId: string, params: any, headers?: any) {

  const queryParams = new URLSearchParams(params)
  const response = await qgis.get(`/project/${projectId}?${queryParams}`,{headers: headers})
  return response
}