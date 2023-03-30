const dotenv = require("dotenv");
dotenv.config();

export const pgHost: string = process.env.PG_HOST!;

export const pgUser: string = process.env.PG_USER!;

export const pgDatabase: string = process.env.PG_DATABASE!;

export const pgPassword: string = process.env.PG_PASSWORD!;

export const pgPort: number = Number(process.env.PG_PORT!);

export const qgisServerUrl: string = process.env.QGIS_SERVER_URL!;