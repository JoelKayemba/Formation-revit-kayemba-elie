// src/components/Footer.jsx
import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #f0f0f0;
  color: #444;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #e0e0e0;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} Formation. Tous droits réservés.</p>
    </FooterWrapper>
  );
}
