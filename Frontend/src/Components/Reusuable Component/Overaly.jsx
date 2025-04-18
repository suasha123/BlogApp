import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  min-width : 233px;
  overflow-x: auto;
`;

export const Overlayy = ({ children })=>{
    return(
        <Overlay>{children}</Overlay>
    )
}