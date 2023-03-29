import moment from 'moment';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";

export function consoleLog(content: any) {
    console.log(moment().format('YYYY-MM-DD h:mm:ss'), content)
}

export function parseXML(xml: string) {

    const parser = new XMLParser({ignoreAttributes: false});

    let jsonObject = parser.parse(xml)

    return jsonObject
}