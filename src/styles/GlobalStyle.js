// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5; /* Gris très clair */
    color: #333;               /* Texte gris foncé */
    line-height: 1.6;
  }

  a {
    color: #444;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Utilitaire de conteneur pour toutes les pages */
  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
    border-radius: 10px;
  }
`;
