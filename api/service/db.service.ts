import { consoleLog } from "../utils";
import connection from "./../repository/db";

const db = connection();

export async function searchService(keywords: string) {

  // CREATE VIEW webgis.search_table AS
  // SELECT 
  //   'rrcm_principal_p' || '.' || id::text AS id, -- substituir rrcm_principal_p pelo nome da tabela
  //   'rrcm_principal_p' AS table_name, -- substituir rrcm_principal_p pelo nome da tabela
  //   endereco || ' ' || descricao_itinerario AS search_body, -- substituir pelos campos utilizados na busca
  //   json_build_object(
  //     'geometry', ST_asgeojson(geom),
  //     'id', 'rrcm_principal_p' || '.' || id::text, -- substituir rrcm_principal_p pelo nome da tabela e o id pela chave primaria
  //     'properties', row_to_json(d.*),
  //     'type', 'Feature'
  //   ) features
  // FROM dados.rrcm_principal_p d;

  keywords = keywords.split(' ').join(' & ')

  consoleLog(`db: Querying for keywords: ${keywords}`)

  let query = `SELECT json_build_object(
    'features', json_agg(search_table.features),
    'type', 'FeatureCollection'
  ) As features
  FROM webgis.search_table 
  WHERE to_tsvector(search_body) @@ to_tsquery('${keywords}');`

  let response = await db.query(query)

  return response.rows
}