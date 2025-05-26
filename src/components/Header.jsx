import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #444;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    width: 200px;
    padding: 1rem;
    border-left: 1px solid #ddd;
    box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.05);
    display: ${({ open }) => (open ? "flex" : "none")};
  }

  a, button {
    margin-left: 1rem;
    color: #666;
    text-decoration: none;
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;

    &:hover {
      color: #000;
    }

    @media (max-width: 768px) {
      margin: 0.5rem 0;
    }
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    color: #444;
  }
`;

export default function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Nav>
      <Container>
        <Title to="/">Formation Revit</Title>
        <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </MenuToggle>
        <NavLinks open={menuOpen}>
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
          {!user ? (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Déconnexion</button>
          )}
        </NavLinks>
      </Container>
    </Nav>
  );
}
