import styled from "styled-components";

const Footer = styled.footer`
  background-color: #6b21a8; /* Deep purple */
  color: #fff;
  font-family: 'Nunito', sans-serif;
  padding: 2rem 1rem;
  text-align: center;
  height : 150px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #e9d5ff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  color: #ddd6fe;
`;

export const AppFooter = () => {
  return (
    <Footer>
      <FooterContainer>
        <FooterLinks>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
        <Copyright>© {new Date().getFullYear()} G Blog. All rights reserved.</Copyright>
      </FooterContainer>
    </Footer>
  );
};
