import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
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
    border-color: #888;
    outline: none;
  }
`;

const Button = styled.button`
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

const GoogleButton = styled(Button)`
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f1f1;
  }

  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { hasPaid: false });
      navigate("/access");
    } catch (err) {
      alert("Erreur d'inscription : " + err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), { hasPaid: false }, { merge: true });
      navigate("/access");
    } catch (err) {
      alert("Erreur avec Google : " + err.message);
    }
  };

  return (
    <div className="container">
      <Title>Inscription à la plateforme</Title>
      <Form onSubmit={handleRegister}>
        <Input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <Button type="submit">S'inscrire</Button>
      </Form>

      <hr style={{ margin: "2rem 0" }} />

      <GoogleButton onClick={handleGoogleRegister}>
        <FcGoogle /> S'inscrire avec Google
      </GoogleButton>
    </div>
  );
}
