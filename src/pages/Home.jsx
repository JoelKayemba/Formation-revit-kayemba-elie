import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Banner = styled.div`
  background: url("/assets/form.png") center/cover no-repeat;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #222;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
`;

const VideoList = styled.ul`
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.75rem;
    padding-left: 1rem;
    border-left: 3px solid #ccc;
    color: #444;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: #444;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  display: block;
  margin: auto;
  transition: background 0.3s;

  &:hover {
    background-color: #222;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [hasPaid, setHasPaid] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setHasPaid(userDoc.data().hasPaid === true);
      }
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const handleBuy = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Veuillez vous connecter avant d’acheter la formation.");
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: user.uid }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erreur lors de la création de la session de paiement.");
    }
  } catch (error) {
    console.error("Erreur Stripe :", error);
    alert("Impossible de contacter le serveur de paiement.");
  }
};

const handleAccess = () => {
  navigate("/access");
};


  return (
    <div className="container">
      <Banner />
      <Title>Formation Revit complète : Maîtrisez votre sujet</Title>
      <Description>
        Accédez à une formation claire et structurée, composée de vidéos pédagogiques exclusives.
        Idéale pour les débutants comme pour les passionnés souhaitant se perfectionner.
      </Description>

      <h3>Ce que vous allez apprendre :</h3>
      <VideoList>
        <li>1. Les bases de Revit</li>
        <li>2. Comment regler les niveaux, adapter un mur a un niveau ainsi que faire des quadrillages sur revit? </li>
        <li>3. Murs et poteaux sur revit</li>
        <li>4. Les outils modifier(sur revit)</li>
        <li>5. Comment parametrer une porte et fenetre sur revit?</li>
        <li>6. comment appliquer les materiaux sur revit?</li>
        <li>7. Coment creer des hachures ou motifs sur revit?</li>
        <li>8. Graphisme (épaisseur de ligne de mur, hachure et autres) sur revit</li>
        <li>9. les cotations sur revit</li>
        <li>10. comment perforer un mur sur revit?</li>
        <li>11. comment faire un escalier sur revit ?</li>
        <li>12. comment faire une rampe sur revit?</li>
        <li>13. comment faire une rampe par le sol sur revit?</li>
        <li>14. Le plancher sur revit</li>
        <li>15. comment faire une fondation sur revit?</li>
        <li>16. les designs de plafond et luminaires sur Revit</li>
        <li>17. plafond incliné et designs de plafond inclinés sur revit</li>
        <li>18. comment faire une toiture sur revit?</li>
        <li>19. comment placer une fenêtre dans une toiture sur revit?</li>
        <li>20. comment faire une charpente sur revit?</li>
        <li> comment faire une charpente sur revit?</li>
        <li> COMMENT CREER IN SITU SUR REVIT?</li>
        <li> comment faire des murs inclinés sur revit?</li>
        <li> comment placer une fenêtre dans un mur incliné sur revit?</li>
        <li> Comment créer un poteau ou une colonne sur revit?</li>
        <li> comment faire une surface topographique sur revit?</li>
        <li> solide topographique revit 2024-2025</li>
        <li> aménagement extérieur sur revit</li>
        <li> comment faire une légende sur revit?</li>
        <li> comment personnaliser une cartouche sur revit?</li>
        <li> comment créer un gabarit personnalisé sur revit?</li>
        <li> absence des gabarits, comment résoudre ce problème sur revit?</li>
        <li> Comment faire un mur rideau sur revit?</li>
        <li> comment insérer une porte dans un mur rideau sur revit?</li>
        <li> Projet complet de A à Z (revit)</li>
        <li> FAIRE DES GRADINS SUR REVIT</li>
        <li> comment faire une corniche sur revit ?</li>
        <li> comment faire un mur à plusieurs couches sur revit?</li>
        <li> comment importer un fichier dwg sur revit?</li>
        <li> Comment exporter un fichier revit vers sketchup?</li>
        <li> comment importer un fichier sketchup sur revit?</li>
        <li> transférer un projet de archicad vers revit</li>
        <li> comment faire une piscine sur revit?</li>
        <li> Comment faire une piscine sur les nouvelles versions de revit?</li>
        <li> Comment placer une gouttière sur revit?</li>
        <li> Comment extraire les surfaces, volumes des murs, poutres, poteaux, dalles sur revit ?</li>
        <li> Exporter les nomenclatures Revit vers Excel et vice-versa</li>
        <li> Varier des types d'escalier et rampe sur revit</li>
        <li> Remédier aux problèmes de visibilité des hachures des poteaux sur revit.</li>
        <li> Main courante escalier sur revit</li>
        <li> Escalier flottant, à crémaillère, à limon sur revit</li>
        <li> comment mettre le nez de marche de l'escalier sur revit?</li>
        <li> Toiture en verre sur revit</li>
        <li> affichage arrière plan, style visuel,ombrage, trajectoire du soleil des façades revit</li>
        <li> comment faire des claustras sur revit ?</li>
      </VideoList>

      {!loading && (
        <Button onClick={hasPaid ? handleAccess : handleBuy}>
          {hasPaid ? "Accéder à la formation" : "Acheter la formation"}
        </Button>
      )}
    </div>
  );
}
