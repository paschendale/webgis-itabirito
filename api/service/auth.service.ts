import { auth } from "../repository/auth";

export async function loginService(email: string, password: string) {

  try {
    
    const login = await auth.post('/api/login',{
      email: email,
      password: password
    })

    return login
  } catch (error) {
    
    throw error
  }
}

export async function authenticateService(apikey: string) {

  try {
    
    const authenticate = await auth.post('/api/authenticate',{
      apikey: apikey
    })

    return authenticate
  } catch (error) {
    
    throw error
  }
}