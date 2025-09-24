import React, { useState} from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%);
  position: relative;
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: url('https://media.gettyimages.com/id/1488592798/video/travelling-with-high-speed-long-exposure-blurred-motion-light-streaks-abstract-background.jpg?s=640x640&k=20&c=xZzp98V2JJWqKayG6OQyWdRQ6KvsvndafUi-Ee0pOeY=') center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    z-index: 0;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(2px);
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  position: fixed;
  box-shadow: 0 8px 32px rgba(60, 0, 90, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Merriweather', serif;
  color: #6c3483;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f3e9f7;
  border-radius: 0.8rem;
  padding: 0.7rem 1rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  flex: 1;
  margin-left: 0.7rem;
  color: #4a235a;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #a569bd 0%, #6c3483 100%);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(108, 52, 131, 0.08);
  &:hover {
    background: linear-gradient(90deg, #6c3483 0%, #a569bd 100%);
  }
`;

const ErrorMsg = styled.div`
  color: #c0392b;
  font-size: 0.95rem;
  margin-top: -0.8rem;
  margin-bottom: 0.5rem;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  // ...existing code...


  const validate = () => {
    if (!email || !password) return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setLoading(true);
    setSuccess('');
    try {
      const res = await fetch('https://register-1cwl.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        Cookies.set('token', data.token, { expires: 7 });
        setSuccess('Login successful!');
        setTimeout(() => {
          navigate('/home');
        }, 900);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>
          <FaBookOpen size={28} /> PocketFM Login
        </Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FaUser color="#6c3483" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <FaLock color="#6c3483" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </InputGroup>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <div style={{ color: '#27ae60', fontSize: '1rem', marginBottom: '0.5rem' }}>{success}</div>}
          <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </Form>
        <div style={{ marginTop: '1.2rem', fontSize: '0.98rem' }}>
          New to PocketFM? <a href="/register" style={{ color: '#6c3483', textDecoration: 'underline' }}>Register</a>
        </div>
      </LoginCard>
    </LoginWrapper>
  );
}

export default LoginPage;
