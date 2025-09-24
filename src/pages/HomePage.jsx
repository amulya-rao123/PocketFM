import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaChevronDown, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  background: linear-gradient(135deg, #f1e3ed 0%, #e0c3fc 100%);
`;


const Title = styled.h2`
  font-family: 'Merriweather', serif;
  color: #8e44ad;
  text-align: center;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  font-size: 2.3rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 12px rgba(60,0,90,0.10);
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin: 0 auto;
  padding: 0 2vw;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 1vw;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.5rem;
    padding: 0 0.5vw;
  }
`;

const StoryCard = styled.div`
  background: linear-gradient(120deg, #f8fafc 60%, #e0c3fc 100%);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(60,0,90,0.08);
  padding: 0.7rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0c3fc;
  transition: box-shadow 0.35s, transform 0.35s, border 0.2s, background 0.3s;
  cursor: pointer;
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
  // Restore desktop hover effects
  @media (min-width: 1200px) {
    &:hover {
      box-shadow: 0 16px 48px rgba(60,0,90,0.18);
      transform: translateY(-8px) scale(1.06);
      border: 2px solid #8e44ad;
      background: linear-gradient(120deg, #e0c3fc 60%, #f8fafc 100%);
    }
  }
`;

const StoryImg = styled.img`
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

const StoryDesc = styled.p`
  color: #4a235a;
  font-size: 0.95rem;
  margin-bottom: 0.7rem;
  text-align: center;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: 400;
  line-height: 1.4;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Arrow = styled(FaArrowRight)`
  color: #6c3483;
  margin-left: 0.5rem;
`;

const CategoryFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0 1rem 0;
  position: relative;
`;

const CategorySelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CategorySelect = styled.select`
  padding: 0.7rem 2.7rem 0.7rem 1.3rem;
  border-radius: 1.3rem;
  border: 2px solid #e0c3fc;
  background: linear-gradient(90deg, #f8fafc 60%, #e0c3fc 100%);
  color: #8e44ad;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  outline: none;
  appearance: none;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border: 2px solid #8e44ad;
    box-shadow: 0 8px 32px rgba(60,0,90,0.18);
  }
`;

const DropdownIcon = styled(FaChevronDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c3483;
  font-size: 1.1rem;
  pointer-events: none;
`;

const ViewStoryBtn = styled.button`
  margin-top: 0.7rem;
  background: linear-gradient(90deg, #e0c3fc 0%, #8e44ad 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.15rem;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 1.2rem;
  padding: 0.7rem 1.6rem;
  box-shadow: 0 2px 8px rgba(60,0,90,0.10);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  text-shadow: 0 1px 8px rgba(60,0,90,0.08);
  &:hover {
    background: linear-gradient(90deg, #8e44ad 0%, #e0c3fc 100%);
    box-shadow: 0 6px 18px rgba(60,0,90,0.14);
    transform: scale(1.07);
  }
`;

// Hamburger for categories on small devices
const Hamburger = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 20;
    cursor: pointer;
    font-size: 1.3rem;
    color: #6c3483;
  }
`;

function HomePage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loaded = false;
    const timer = setTimeout(() => {
      loaded = true;
      setLoading(false);
    }, 2000);
    import('../stories.js').then(module => {
      setStories(module.default || []);
      if (loaded) {
        setLoading(false);
      }
    });
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Drama', 'Thriller', 'Romantic', 'Comedy', 'Adventure', 'Sci-Fi'];

  const filteredStories = stories.filter(story => {
    const matchesSearch =
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.author.toLowerCase().includes(search.toLowerCase()) ||
      story.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || story.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <HomeWrapper>
      <Navbar search={search} setSearch={setSearch} />
      <Hamburger onClick={() => setShowCategories(!showCategories)}>
        <FaBars />
      </Hamburger>
      {(showCategories || window.innerWidth >= 768) && (
        <CategoryFilterWrapper>
          <label htmlFor="category-select" style={{color:'#6c3483',fontWeight:'bold'}}>Filter by Category:</label>
          <CategorySelectWrapper>
            <CategorySelect
              id="category-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </CategorySelect>
            <DropdownIcon />
          </CategorySelectWrapper>
        </CategoryFilterWrapper>
      )}
      <div style={{padding:'2rem 0'}}>
        {loading ? (
          <Loader />
        ) : (
          <StoriesGrid>
            {filteredStories.map(story => (
              <StoryCard key={story.id} onClick={() => navigate(`/story/${story.id}`)}>
                <StoryImg src={story.cover_url || 'https://placehold.co/120x120?text=No+Image'} alt={story.title} />
                <StoryTitle>{story.title}</StoryTitle>
                <StoryDesc>{story.description?.substring(0, 100) || 'No description available.'}</StoryDesc>
                <ViewStoryBtn onClick={() => navigate(`/story/${story.id}`)}>
                  View Story <Arrow />
                </ViewStoryBtn>
              </StoryCard>
            ))}
          </StoriesGrid>
        )}
      </div>
    </HomeWrapper>
  );
}

export default HomePage;
