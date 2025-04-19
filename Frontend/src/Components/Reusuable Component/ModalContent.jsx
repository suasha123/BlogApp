import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #b31217, #c8338b, #8e44ad);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  min-height: 286px ;
  max-height: 400px;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-in-out;
  position: relative;
`;
export const Modal = ({children})=>{
    return(
        <ModalContent>
            {children}
        </ModalContent>
    )
}
