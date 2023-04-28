import moment from 'moment';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import axios from 'axios';

export function consoleLog(content: any) {
    console.log(moment().format('YYYY-MM-DD h:mm:ss'), content)
}

export function parseXML(xml: string) {

    const parser = new XMLParser({ignoreAttributes: false});

    let jsonObject = parser.parse(xml)

    return jsonObject
}

export async function makeHealthCheck(url: string, pingTime?: number) {

    try {
        
        const check = await axios.get(url, {timeout: 5000})

        if (check) {
            consoleLog(`${url} is alive`)
            return null
        }
    } catch (error) {
        
        setTimeout(() => makeHealthCheck(url),30000)
        consoleLog(`${url} is not alive yet`)
    }
}