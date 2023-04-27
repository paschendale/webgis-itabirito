import { Request, Response } from "express";
import { authenticateService, loginService } from "../service/auth.service";

export async function loginController(req: Request, res: Response) {

  const { email,password  } = req.body

  if (!email) {

    return res.status(400).json({message: 'Erro: nenhum email foi fornecido'})
  }
  
  if (!password) {

    return res.status(400).json({message: 'Erro: nenhuma senha foi fornecida'})
  }

  try {
    
    const response = await loginService(email,password)

    return res.send(response)
  } catch (error) {
    
    res.status(500).send(error)
  }
}


export async function authenticateController(req: Request, res: Response) {

  const { apikey } = req.body

  if (!apikey) {

    return res.status(400).json({message: 'Erro: nenhum token foi fornecido'})
  }

  try {
    
    const response = await authenticateService(apikey)

    return res.send(response)
  } catch (error) {
    
    res.status(500).send(error)
  }
}