import * as Environments from "../environments";
import { consoleLog } from "../utils"
import { Client } from "pg"

export function connection () {

	const client = new Client({
		user: Environments.pgUser,
		host: Environments.pgHost,
		database: Environments.pgDatabase,
		password: Environments.pgPassword,
		port: Environments.pgPort,
	})
	client.connect(function (err: any) {
		if (err) throw err;
		consoleLog(`Connectado com a base de dados: ${Environments.pgDatabase}/${Environments.pgHost}:${Environments.pgPort}` );
	})
    return client
}

