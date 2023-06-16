import { consoleLog } from "../utils";
import connection from "./../repository/db";

const db = connection();

export async function searchService(keywords: string, layers: Array<string>) {

  var searchSchema: Array<any> = []
  var features: Array<any> = []

  for await (var layer of layers) {

    try {
      
      const schema = await verifyTable(layer)
  
      searchSchema.push(schema)
    } catch (error) {
      
      consoleLog(error)
      continue
    }
  }

  keywords = keywords.split(' ').join(' & ')

  for await (var search of searchSchema) {

    if(!search.search_body) {

      consoleLog(`db: Tabela ${search.table_name} não possui campo pesquisável em formato de texto`)
      continue;
    }

    var searchBody = `COALESCE("` + search.search_body.join(`",'')  || ' '::text ||  COALESCE("`) + `",'')`

    let searchQuery = `
      SELECT 
        '${search.table_name}'::text || '.'::text || d.${search.table_pk}::text AS id, 
        '${search.table_name}'::text AS table_name,
        ${searchBody} AS search_body,
        json_build_object(
          'geometry', st_asgeojson(ST_Transform(d.geom,3857))::json, 
          'id', ('${search.table_name}'::text || '.'::text) || d.${search.table_pk}::text, 
          'properties', row_to_json(d.*), 
          'type', 'Feature'
        ) AS features
      FROM ${search.table_schema}.${search.table_name} d
      WHERE to_tsvector(${searchBody}) @@ to_tsquery('${keywords}');
    `
    consoleLog(`db: Querying ${search.table_name} for keywords: ${keywords}`)
  
    let response = await db.query(searchQuery)

    features.push(response.rows.map(e => e.features))
  }

  return ({
    features: await features.flat(1),
    type: `FeatureCollection`
  })
}

export async function verifyTable(tableName: string, tableSchema?: string) {

  var tableNameArray = tableName.split('.')

  if (tableNameArray.length > 1) {

    tableSchema = tableNameArray[0]
    tableName = tableNameArray[1]
  } else if (!tableSchema && tableNameArray.length === 1)(
    
    tableSchema = 'dados'
  )

  consoleLog(`db: verifying table structure: ${tableSchema}.${tableName}`)

  let query = `  
    SELECT 
      DISTINCT ON (c.column_name) 
      t.table_schema,
      t.table_name,
      c.column_name AS table_pk,
      search_body
    FROM information_schema.tables t
    LEFT JOIN information_schema.columns c ON t.table_name = c.table_name
    LEFT JOIN information_schema.constraint_column_usage cc ON c.column_name = cc.column_name
    LEFT JOIN information_schema.table_constraints tc ON cc.constraint_name = tc.constraint_name
    LEFT JOIN (
      SELECT 
        array_agg(DISTINCT c.column_name)::text[] AS search_body
      FROM information_schema.tables t
      LEFT JOIN information_schema.columns c ON t.table_name = c.table_name
      WHERE 
        t.table_name = '${tableName}' AND 
        c.table_schema = '${tableSchema}'  AND 
       ( c.data_type LIKE '%text%' OR c.data_type LIKE '%char%')
    ) sb ON true
    WHERE 
      t.table_name = '${tableName}' AND 
      c.table_schema = '${tableSchema}' AND
      tc.constraint_type = 'PRIMARY KEY'
    LIMIT 1
  `

  let response = await db.query(query)

  if (response.rows.length > 0) {

    return response.rows[0]
  } else {

    throw new Error(`A tabela ${tableSchema}.${tableName} não existe no banco de dados`)
  }
}

export async function getNearestPanoramaService(x: number, y: number, srid?:number) {

  if (!srid) {
    srid = 3857
  }
  
  consoleLog(`db: Querying dados.pto_panoramas_p on coordinates X: ${x}; Y: ${y}`)
  
  let query =  `SELECT 
    link_foto,  
    radians(degrees(ST_Azimuth( (ST_Dump(ST_Transform(a.geom,31983))).geom,  (ST_Dump(ST_Transform(b.geom,31983))).geom))-azimuth) azimuth_to_click,
    ST_Distance(ST_Transform(a.geom,31983), ST_Transform(b.geom,31983)) AS distance_to_click,
    a.*,
    ST_X(ST_Transform(a.geom,3857)) AS x,
    ST_Y(ST_Transform(a.geom,3857)) AS y
  FROM dados.pto_panoramas_p a, (
    SELECT ST_SetSRID(ST_MakePoint(${x},${y}),${srid}) AS geom
  ) b
  ORDER BY ST_Distance(ST_Transform(a.geom,31983), ST_Transform(b.geom,31983))
  LIMIT 1;`

  let response = await db.query(query)

  if (response.rows.length > 0) {

    return response.rows[0]
  } else {

    throw new Error(`Houve um erro ao obter os panoramas próximos da coordenada especificada`)
  }

}
