import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// ✅ STYLES
const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #555;
`;

export default function Access() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().hasPaid) {
          setAuthorized(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Erreur d’accès Firestore :", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [navigate]);

  if (loading) return <div className="container"><Message>Chargement sécurisé en cours...</Message></div>;

  return authorized ? (
    <div className="container">
      <Wrapper>
        <Title>Votre formation vidéo</Title>
        <VideoWrapper>
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLfEXr-BWs2uqUA2JiKl8Ss813pv0lQUW2"
            title="Playlist de formation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Message>Merci pour votre confiance. Bonne formation !</Message>
      </Wrapper>
    </div>
  ) : null;
}
