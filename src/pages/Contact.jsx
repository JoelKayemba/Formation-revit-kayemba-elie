// src/pages/Contact.jsx
import React, { useState } from "react";
import styled from "styled-components";

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

const SubmitButton = styled.button`
  background-color: #444;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;

  &:hover {
    background-color: #222;
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux envoyer vers emailjs, formsubmit ou backend Firebase
    alert("Message envoyé (simulation). Merci !");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container">
      <Section>
        <Heading>Contactez-nous</Heading>
        <Paragraph>
          Pour toute question concernant la formation, le paiement ou un accès, veuillez utiliser le formulaire ci-dessous.
          Nous répondons sous 24 à 48h ouvrables.
        </Paragraph>
      </Section>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Votre prénom et nom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">Envoyer</SubmitButton>
      </Form>
    </div>
  );
}
