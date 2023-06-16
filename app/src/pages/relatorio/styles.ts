import styled from "styled-components";

export const RelatorioContainer = styled.div`
  height: 29.7cm;
  min-height: 29.7cm;
  width: 21cm;
  display: flex;
  justify-content: center;
  align-items: center;

  .margins-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid black;
    margin-bottom: 10px;
  }

  .title-container {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }

  .prefeitura-title {
    font-size: 150%;
    margin: 5px;
    margin-left: 0;
  }

  .relatorio-title {    
    font-size: 80%;
    margin: 5px;
    margin-left: 0;
  }

  .logo {
    height: 80%;
    margin: 5%;
    margin-right: 30px;
  }

  .body {
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .midia-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .map {
    width: 381px;
    height: 300px;
    margin-top: 10px;
    margin-right: 5px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }

  .foto {
    width: 381px;
    height: 300px;
    height: 300px;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }

  .foto-image {
    width: 380px;
  }

  .atributos-container {
    height: 100%;
    width: 97.5%;
    max-width: 97.5%;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .atributos-divisor {
    width: 97.5%;
  }

  .atributos-title {
    width: 97.5%;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-left: 15px;
    margin-top: 15px;
  }

  .each-attribute-container {
    width: 360px;
    display: flex;
    flex-direction: row;
    margin-left: 15px;
    margin-top: 15px;

    p {
      margin: 0;
    }
  }

  .footer {
    width: 100%;
    margin-top: 10px;
    font-size: xx-small;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;