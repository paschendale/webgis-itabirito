import { auth } from "../repository/auth";

export async function loginService(email: string, password: string) {

  try {
    
    const login = await auth.post('/api/login',{
      email: email,
      password: password
    })

    const response = {
      id_user: login.data.user.id_user,
      name: login.data.user.name,
      email: login.data.user.email,
      scopes: login.data.user.user_scope.map((e: any) => e.scope.description),
      apikey: login.data.apikey
    }

    return response
  } catch (error) {
    
    throw error
  }
}

export async function authenticateService(apikey: string) {

  try {
    
    const authenticate = await auth.post('/api/authenticate',{
      apikey: apikey
    })

    
    const response = {
      id_user: authenticate.data.id_user,
      name: authenticate.data.name,
      email: authenticate.data.email,
      scopes: authenticate.data.user_scope.map((e: any) => e.scope.description),
      apikey: apikey
    }
    
    return response
  } catch (error) {
    
    throw error
  }
}