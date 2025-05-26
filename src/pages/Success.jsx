import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Success() {
  const [params] = useSearchParams();
  const uid = params.get("uid");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!uid) return;

    const markAsPaid = async () => {
      try {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, { hasPaid: true }, { merge: true });
        setConfirmed(true);
      } catch (error) {
        console.error("Erreur Firestore :", error);
      }
    };

    markAsPaid();
  }, [uid]);


  return (
    <div className="container">
      <h2>Merci pour votre achat !</h2>
      {confirmed ? (
        <p>Vous avez maintenant accès à la formation. <a href="/access">Cliquez ici pour y accéder</a>.</p>
      ) : (
        <p>Traitement en cours...</p>
      )}
    </div>
  );
}
