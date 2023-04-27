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
    
    const login = await loginService(email,password)

    const response = {
      id_user: login.data.user.id_user,
      name: login.data.user.name,
      email: login.data.user.email,
      scopes: login.data.user.user_scope.map((e: any) => e.scope.description),
      apikey: login.data.apikey
    }

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
    
    const authenticate = await authenticateService(apikey)

    const response = {
      id_user: authenticate.data.id_user,
      name: authenticate.data.name,
      email: authenticate.data.email,
      scopes: authenticate.data.user_scope.map((e: any) => e.scope.description),
      apikey: apikey
    }

    return res.send(response)
  } catch (error) {
    
    res.status(500).send(error)
  }
}