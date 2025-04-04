import styled, { keyframes } from "styled-components";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const CLoader = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(128, 0, 128, 0.2); 
  border-top: 4px solid #6A0DAD; 
  border-radius: 50%;
  animation: ${spin} 1s linear infinite; 
  position : absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

export const Loader = () => {
  return <CLoader />;
};
