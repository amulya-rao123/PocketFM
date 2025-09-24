import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';
import FavContext from '../contexts/FavContext.jsx';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.5rem;
  margin: 0;
  overflow-y: auto;
  background: none;
`;

const Title = styled.h2`
  color: #6c3483;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
    padding: 0 1vw;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.4rem;
    padding: 0 0.5vw;
  }
`;

const Card = styled.div`
  background: linear-gradient(120deg, #f8fafc 60%, #e0c3fc 100%);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(60,0,90,0.08);
  padding: 0.7rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s;
  font-size: 0.95rem;
  @media (min-width: 768px) {
    padding: 1rem 0.7rem;
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    padding: 0.5rem 0.2rem;
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    padding: 0.3rem 0.1rem;
    font-size: 0.85rem;
  }
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.7rem;
  margin-bottom: 0.5rem;
  background: #eee;
  box-shadow: 0 1px 4px rgba(60,0,90,0.07);
  transition: box-shadow 0.3s, transform 0.3s;
  @media (min-width: 768px) {
    width: 90px;
    height: 90px;
  }
  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;

const StoryTitle = styled.h3`
  color: #6c3483;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  text-align: center;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 8px rgba(60,0,90,0.08);
  @media (max-width: 767px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
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

const RemoveBtn = styled.button`
  background: linear-gradient(90deg, #e0c3fc 0%, #f1e3ed 100%);
  border: none;
  color: #c0392b;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s, box-shadow 0.3s, transform 0.2s;
  &:hover {
    color: #6c3483;
    box-shadow: 0 4px 16px rgba(60,0,90,0.12);
    transform: scale(1.07);
  }
`;

const BackBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: linear-gradient(90deg, #e0c3fc 0%, #f1e3ed 100%);
  border: none;
  color: #6c3483;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0.8rem;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover {
    background: #6c3483;
    color: #fff;
    box-shadow: 0 4px 16px rgba(60,0,90,0.12);
  }
`;

function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavContext);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>My Favorites</Title>
      <BackBtn onClick={() => navigate(-1)}><FaArrowLeft /> Back</BackBtn>
      {favorites.length === 0 ? (
        <div style={{marginTop:'3rem', color:'#6c3483'}}>No favorites yet.</div>
      ) : (
        <Grid>
          {favorites.map(story => (
            <Card key={story.id}>
              <Img src={story.cover_url} alt={story.title} />
              <StoryTitle>{story.title}</StoryTitle>
              <Author>By {story.author}</Author>
              <RemoveBtn onClick={() => removeFavorite(story.id)} title="Remove from favorites">
                <FaTrash /> Remove
              </RemoveBtn>
            </Card>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

export default FavoritesPage;
