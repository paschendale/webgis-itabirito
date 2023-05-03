import styled from "styled-components";
import denim from "./../../assets/denim.webp";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 25px);
  z-index: 1;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
`;

type PanelProps = {
  display: boolean;
}

export const LeftSidePanel = styled.div<PanelProps>`
  display: ${(props: PanelProps) => ((props.display)? 'auto' : 'none')};
  z-index: 900;
  box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  transition: all 0.5s;
`;

export const RightSidePanel = styled.div<PanelProps>`
  display: ${(props: PanelProps) => ((props.display)? 'auto' : 'none')};
  width: 500px;
  min-width: 500px;
  z-index: 900;
  box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

export const MiddlePanel = styled.div`
  width: 100%;
  min-width: 30vw;
  height: 100%;
`;

export const LeftSidePanelSwitcher = styled.div`
  cursor: pointer;
  z-index: 1000;
  position: absolute;
  width: 14px;
  height: 50px;
  bottom: 35px;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    border: none;
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

export const RightSidePanelSwitcher = styled.div`
  cursor: pointer;
  z-index: 1000;
  position: relative;
  width: 14px;
  height: 50px;
  bottom: 62px;
  margin-left: calc(100% - 14px);
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 80px;
  margin-left: 8px;
  z-index: 1000;
  position: absolute;
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  border-radius: 4px;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

export const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`
export const Footer = styled.div`
  height: 25px;
  width: 100%;
  left: 50%;
  z-index: 10000;
  position: relative;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(255,255,255,0.5);
  font-size: x-small;
  
  @media (prefers-color-scheme: dark) {
    color: whitesmoke;
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`

export const VersionContainer = styled.div`
  margin-left: 25px;
`

export const CoordinatesContainer = styled.div`
  margin-right: 25px;
`

export const MapContainer = styled.div `
  width: 100%;
  height: 100%;
  text-shadow: 1px 1px 5px #000000;
  
  @media (prefers-color-scheme: dark) {
    color: whitesmoke;
    font-weight: 600;
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }

  .map {
    height: 100%;
  }

  .ol-control {
    color: black;
    background-color: whitesmoke;
    border: none;    
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 2px 0px;
    border-radius: 4px;
    padding: 0;

    button {
      cursor: pointer;
      pointer-events: all;      
      background-color: whitesmoke;
      color: black;
      border-radius: 4px;

      @media (prefers-color-scheme: dark) {
        color: rgb(180,180,180);
        background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
      }
    }

    @media (prefers-color-scheme: dark) {
      color: rgb(180,180,180);
      background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
    }
  }

  .ol-zoom-out {   
    margin: 0;
    border: 1px solid rgba(0,0,0,0.2);  
    border-top: none;   
    width: 32px;
    height: 32px;
  }

  .ol-zoom-in {    
    margin: 0;
    border: 1px solid rgba(0,0,0,0.2);    
    width: 32px;
    height: 32px;
  }

  .ol-attribution {
    display: none;
  }
`