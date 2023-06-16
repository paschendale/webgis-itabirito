import { api } from "../../services/api";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import brasao from "./../../assets/brasao.png"
import 'react-toastify/dist/ReactToastify.css';
import { RelatorioContainer } from "./styles";

export function Relatorio() {
  
  const [values,setValues] = useState<any>({entityName: 'entityName'})
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const properties = Object.fromEntries(params.entries());

    setValues(properties)
    
    // Now you can use the 'properties' object to access the passed parameters
    console.log(properties);
  }, []);

  function attributesToArray(object: any) {

    const objSize = Object.keys(object).length
    var attributesArray = []

    for (let index = 0; index < objSize; index++) {
      
      attributesArray.push({
        key: Object.keys(object)[index],
        value: (typeof(Object.values(object)[index]) === 'object') ? JSON.stringify(Object.values(object)[index]) : Object.values(object)[index]
      })
    }

    return attributesArray;
  }

  var now = new Date()

  return (
    <RelatorioContainer>
      <div className='margins-container'>
        <div className='header'>
          <img className='logo' src={brasao} alt="Logo Prefeitura" />
          <div className="title-container">
            <div className="prefeitura-title">
              PREFEITURA DE <b> ITABIRITO</b> | GEOPORTAL
            </div>
            <div className="relatorio-title">
              Relatório de Informações Cadastrais - <b>{values.entityName}</b>
            </div>
          </div>
        </div>
        <div className='body'>
          {(values.imgMap || values.imgFoto) && <div className="midia-container">
            <div className="map">
              {(values.imgMap && values.imgMap !== "undefined") ? (<img src={values.imgMap} alt="Mapa" className="map-image" />) : (<img src="http://via.placeholder.com/380x300/FBFBFB?text=Esta entidade não possui uma representação geométrica" alt="Mapa" className="map-image" />)}
            </div>
            <div className="foto">
              {(values.imgFoto) ? (<img src={values.imgFoto} alt="Foto" className="foto-image" />) : (<img src="http://via.placeholder.com/380x300/FBFBFB?text=Não existe nenhuma fotografia desta entidade" alt="Foto" className="foto-image" />)}
            </div>
          </div>}
          <div className="atributos-title">
            Propriedades:
          </div>
          <hr className="atributos-divisor"/>
          <div className="atributos-container">
            {
              attributesToArray(values).map((e: any, i: number) => {

                if (e.key !== 'geom' && e.key !== 'entityName' && e.key !== 'imgMap' && e.key !== 'imgFoto') {
                  return (
                    <div className="each-attribute-container" key={i}>
                      <p><b> {e.key}: &nbsp; </b> {e.value}</p>
                    </div>
                  )
                } 
              })
            }
          </div>
        </div>
        <div className='footer'>
          Gerado em {JSON.stringify(now)}
        </div>
      </div>
    </RelatorioContainer>
  )
}