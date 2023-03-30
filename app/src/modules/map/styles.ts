import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  width: 10px;
  height: 50px;
  bottom: 10px;
  border: 2px solid rgba(0,0,0,0.2);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 6px 2px 5px 0px rgba(0,0,0,0.5);
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSidePanelSwitcher = styled.div`
  cursor: pointer;
  z-index: 1000;
  position: relative;
  width: 10px;
  height: 50px;
  bottom: 62px;
  margin-left: calc(100% - 14px);
  border: 2px solid rgba(0,0,0,0.2);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: -6px 2px 5px 0px rgba(0,0,0,0.5);
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  margin-top: 80px;
  margin-left: 10px;
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
`;

export const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`