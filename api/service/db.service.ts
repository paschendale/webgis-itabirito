import { consoleLog } from "../utils";
import connection from "./../repository/db";

const db = connection();

export async function searchService(keywords: string) {

  keywords = keywords.split(' ').join(' & ')

  consoleLog(`db: Querying for keywords: ${keywords}`)

  let query = `SELECT json_build_object(
    'features', json_agg(search_table.features::json),
    'type', 'FeatureCollection'
  ) As features
  FROM webgis.search_table 
  WHERE to_tsvector(search_body) @@ to_tsquery('${keywords}');`

  let response = await db.query(query)

  return response.rows
}