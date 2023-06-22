import { Request, Response } from "express";
import { proxyService } from "../service/proxy.service";

export async function proxyController(req: Request, res: Response) {

  const {url} = req.params

  try {
    
    const response = await proxyService(url)


    res.contentType(response.headers['content-type'])
    return res.status(response.status).end(response.data)

  } catch (error) {
    
    res.status(500).send(error)
  }
}