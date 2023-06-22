import * as Environments from "../environments";
import { consoleLog } from "../utils"
import { Client } from "pg"

	// Grants para a base de dados no usuário WebGIS

	// CREATE USER webgis WITH PASSWORD 'asnd9a0s' LOGIN;

	// CREATE SCHEMA IF NOT EXISTS webgis;

	// GRANT SELECT ON ALL TABLES IN SCHEMA webgis TO webgis;
	// GRANT USAGE ON ALL TABLES IN SCHEMA webgis TO webgis;

	// ALTER DEFAULT PRIVILEGES FOR ROLE webgis IN SCHEMA webgis GRANT SELECT ON TABLES TO webgis;
	// ALTER DEFAULT PRIVILEGES FOR ROLE webgis IN SCHEMA webgis GRANT USAGE ON SEQUENCES TO webgis;


export default function connection () {

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

