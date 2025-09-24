import React, { useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import stories from '../stories.js';
import FavContext from '../contexts/FavContext.jsx';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  background: linear-gradient(120deg, #e0c3fc 0%, #f8fafc 60%, #a1c4fd 100%);
`;

const Card = styled.div`
  background: rgba(255,255,255,0.25);
  border-radius: 2.5rem;
  box-shadow: 0 12px 40px rgba(60,0,90,0.18);
  padding: 3.5rem 2.5rem;
  max-width: 800px;
  width: 95%;
  text-align: center;
  position: relative;
  backdrop-filter: blur(16px) saturate(180%);
  border: 1.5px solid rgba(220, 200, 255, 0.18);
  animation: cardFadeIn 0.8s cubic-bezier(.77,.2,.32,1.01);
  transition: box-shadow 0.3s, transform 0.3s;
  @keyframes cardFadeIn {
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
  &:hover {
    box-shadow: 0 20px 60px rgba(60,0,90,0.22);
    transform: translateY(-6px) scale(1.02);
  }
  @media (max-width: 767px) {
    padding: 1rem 0.3rem;
    border-radius: 1rem;
    font-size: 0.95rem;
    max-width: 98vw;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 0.1rem;
    border-radius: 0.7rem;
    font-size: 0.85rem;
    max-width: 100vw;
  }
`;

const Img = styled.img`
  width: 220px;
  max-width: 80vw;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 2rem;
  margin-bottom: 1.2rem;
  background: #eee;
  box-shadow: 0 4px 24px rgba(60,0,90,0.12);
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.3s, transform 0.3s;
  animation: imgPopIn 0.9s cubic-bezier(.77,.2,.32,1.01);
  @keyframes imgPopIn {
    from { opacity: 0; transform: scale(0.92) rotate(-6deg); }
    to { opacity: 1; transform: none; }
  }
  &:hover {
    box-shadow: 0 8px 32px rgba(60,0,90,0.18);
    transform: scale(1.04) rotate(-2deg);
  }
  @media (max-width: 767px) {
    width: 120px;
    height: 120px;
    border-radius: 1rem;
    margin-bottom: 0.7rem;
  }
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border-radius: 0.7rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h2`
  color: #6c3483;
  margin-bottom: 0.3rem;
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  @media (max-width: 767px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Author = styled.p`
  color: #4a235a;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
  font-family: 'Poppins', Arial, sans-serif;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Category = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #e0c3fc 0%, #a1c4fd 100%);
  color: #6c3483;
  border-radius: 0.8rem;
  padding: 0.25rem 0.7rem;
  font-size: 0.95rem;
  margin-bottom: 0.7rem;
  font-weight: 600;
  @media (max-width: 767px) {
    font-size: 0.85rem;
    padding: 0.18rem 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.12rem 0.3rem;
  }
`;

const Desc = styled.p`
  color: #4a235a;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-family: 'Montserrat', Arial, sans-serif;
  line-height: 1.5;
  @media (max-width: 767px) {
    font-size: 0.85rem;
    margin-bottom: 0.7rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-bottom: 1.2rem;
  border-radius: 1.2rem;
  background: rgba(224,195,252,0.18);
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 4px 16px rgba(60,0,90,0.12);
  }
`;

const FavBtn = styled.button`
  background: linear-gradient(90deg, #e0c3fc 0%, #a1c4fd 100%);
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #c0392b;
  margin-bottom: 1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 1.2rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  transition: color 0.2s, box-shadow 0.3s, transform 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: 'Poppins', Arial, sans-serif;
  letter-spacing: 0.01em;
  &:hover {
    color: #6c3483;
    box-shadow: 0 4px 16px rgba(60,0,90,0.12);
    transform: scale(1.07);
    background: linear-gradient(90deg, #a1c4fd 0%, #e0c3fc 100%);
  }
`;

const BackBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: linear-gradient(90deg, #e0c3fc 0%, #a1c4fd 100%);
  border: none;
  color: #6c3483;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0.8rem;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  font-family: 'Poppins', Arial, sans-serif;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    background: #6c3483;
    color: #fff;
    box-shadow: 0 4px 16px rgba(60,0,90,0.12);
    transform: scale(1.07);
  }
  @media (max-width: 600px) {
    top: 0.5rem;
    left: 0.5rem;
    font-size: 1rem;
    padding: 0.3rem 0.7rem;
  }
`;

function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find(s => String(s.id) === String(id));
  const { favorites, addFavorite, removeFavorite } = useContext(FavContext);
  const isFav = favorites.some(s => String(s.id) === String(id));

  if (!story) {
    return <Wrapper><Card>Story not found.</Card></Wrapper>;
  }

  const handleFavClick = () => {
    if (isFav) {
      removeFavorite(story.id);
    } else {
      addFavorite(story);
    }
  };

  return (
    <Wrapper>
      <Card>
        <BackBtn onClick={() => navigate(-1)}><FaArrowLeft /> Back</BackBtn>
        <Img src={story.cover_url} alt={story.title} />
        <Title>{story.title}</Title>
        <Author>By {story.author}</Author>
        <Category>{story.category}</Category>
        <Desc>{story.description}</Desc>
        <AudioPlayer controls src={story.audio_url} />
        <FavBtn onClick={handleFavClick}>
          {isFav ? <FaHeart /> : <FaRegHeart />} {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
        </FavBtn>
      </Card>
    </Wrapper>
  );
}

export default StoryPage;
