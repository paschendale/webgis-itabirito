import moment from 'moment';

export function consoleLog(content: any) {
    console.log(moment().format('YYYY-MM-DD h:mm:ss'), content)
}