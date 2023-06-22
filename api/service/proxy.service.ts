import axios from "axios";
import { consoleLog } from "../utils";

export async function proxyService(url: string) {

  consoleLog(`Proxy: ${url}`)

  try {

    const result = await axios.get(url, { responseType: "arraybuffer"})

    return result
    
  } catch (error: any) {
    
    console.log(error)
    throw new Error(error)
  }
}