import React from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaSearch, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavbarWrapper = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #e0c3fc 0%, #f1e3ed 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  box-shadow: 0 2px 12px rgba(60,0,90,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
  @media (min-width: 1200px) {
    min-height: 80px;
    font-size: 1.25rem;
    padding: 2rem 3rem;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 0.5rem;
    min-height: 64px;
    gap: 0.3rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #6c3483;
  font-weight: bold;
  cursor: pointer;
  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
  @media (max-width: 767px) {
    font-size: 1rem;
    justify-content: center;
    width: 100%;
    margin-bottom: 0.3rem;
  }
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 600px;
  @media (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.3rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  min-width: 120px;
  max-width: 600px;
  padding: 0.3rem 1.2rem 0.3rem 0.7rem;
  border-radius: 0.7rem;
  border: none;
  background: #f8fafc;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  outline: none;
  @media (min-width: 1200px) {
    max-width: 600px;
    font-size: 1.1rem;
    padding: 0.5rem 2rem 0.5rem 1rem;
  }
  @media (max-width: 767px) {
    font-size: 0.85rem;
    min-width: 80px;
    max-width: 100%;
    padding: 0.2rem 0.7rem 0.2rem 0.4rem;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c3483;
  font-size: 1.2rem;
  pointer-events: none;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: center;
    gap: 0.7rem;
    margin-top: 0.2rem;
    width: 100%;
  }
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  color: #6c3483;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
  transition: color 0.2s;
  @media (min-width: 1200px) {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 767px) {
    font-size: 0.85rem;
    gap: 0.2rem;
    padding: 0.2rem 0.3rem;
  }
`;

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <NavbarWrapper>
      <Logo onClick={() => navigate('/home')}>
        <FaBookOpen size={28} /> PocketFM
      </Logo>
      <SearchBarWrapper>
        <SearchInput
          type="text"
          placeholder="Search stories, authors, categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <SearchIcon />
      </SearchBarWrapper>
      <NavActions>
        <NavBtn onClick={() => navigate('/favorites')}><FaHeart /> Favorite Stories</NavBtn>
        <NavBtn onClick={handleLogout}><FaSignOutAlt /> Logout</NavBtn>
      </NavActions>
    </NavbarWrapper>
  );
};

export default Navbar;
