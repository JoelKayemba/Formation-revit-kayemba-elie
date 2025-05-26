import React, { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUserDocIfNotExists = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", uid), { hasPaid: false });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await createUserDocIfNotExists(userCredential.user.uid);
      navigate("/access");
    } catch (err) {
      alert("Erreur de connexion : " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDocIfNotExists(result.user.uid);
      navigate("/access");
    } catch (err) {
      alert("Erreur avec Google : " + err.message);
    }
  };

  return (
    <div className="container">
      <Title>Connexion à votre espace</Title>
      <Form onSubmit={handleLogin}>
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
        <Button type="submit">Se connecter</Button>
      </Form>

      <hr style={{ margin: "2rem 0" }} />

      <GoogleButton onClick={handleGoogleLogin}>
        <FcGoogle /> Se connecter avec Google
      </GoogleButton>
    </div>
  );
}
