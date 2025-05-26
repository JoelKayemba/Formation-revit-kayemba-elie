// src/pages/About.jsx
import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #222;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  padding-left: 1rem;
  list-style-type: disc;

  li {
    margin-bottom: 0.5rem;
    color: #444;
  }
`;

export default function About() {
  return (
    <div className="container">
      <Image src="/assets/profil.jpg" alt="À propos de la formation" />

      <Section>
        <Heading>Notre mission</Heading>
        <Paragraph>
          Notre objectif est de rendre l'apprentissage accessible, structuré et motivant grâce à une plateforme simple et des contenus de haute qualité.
        </Paragraph>
        <Paragraph>
          Cette formation a été conçue pour guider les débutants comme les intermédiaires à travers un parcours clair, basé sur des vidéos, des exemples concrets, et une pédagogie progressive.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Ce qui nous distingue</Heading>
        <List>
          <li>Des vidéos claires et concises orientées vers la pratique</li>
          <li>Un accès permanent une fois la formation achetée</li>
          <li>Aucune installation compliquée : tout se passe en ligne</li>
          <li>Des ressources complémentaires en développement</li>
        </List>
      </Section>

      <Section>
        <Heading>Notre approche pédagogique</Heading>
        <Paragraph>
          Chaque vidéo est conçue pour construire une compétence spécifique. L’ordre de progression a été soigneusement pensé pour faciliter la compréhension même pour ceux qui partent de zéro.
        </Paragraph>
        <Paragraph>
          Nous évitons le jargon technique inutile, et nous nous concentrons sur la transmission d’une compétence applicable immédiatement.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Témoignages</Heading>
        <Paragraph>
          <em>"Une formation claire, efficace, et accessible même pour les débutants. J’ai beaucoup appris et j’ai pu appliquer les compétences directement." — Clara M.</em>
        </Paragraph>
        <Paragraph>
          <em>"Je recommande cette plateforme à tous ceux qui veulent apprendre sans perdre de temps. Bravo pour la qualité pédagogique." — Julien K.</em>
        </Paragraph>
      </Section>
    </div>
  );
}
