import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  background: linear-gradient(135deg, #e0c3fc 0%, #a1c4fd 100%);
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    background: url('https://media.gettyimages.com/id/1488592798/video/travelling-with-high-speed-long-exposure-blurred-motion-light-streaks-abstract-background.jpg?s=640x640&k=20&c=xZzp98V2JJWqKayG6OQyWdRQ6KvsvndafUi-Ee0pOeY=') center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.45;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.35);
  border-radius: 2.2rem;
  box-shadow: 0 12px 40px rgba(60,0,90,0.18);
  padding: 2.8rem 2.2rem 2.2rem 2.2rem;
  width: 600px;
  min-height: 600px;
  max-width: 99vw;
  text-align: center;
  backdrop-filter: blur(18px) saturate(180%);
  border: 1.5px solid rgba(220, 200, 255, 0.18);
  animation: cardFadeIn 0.7s cubic-bezier(.77,.2,.32,1.01);
  @keyframes cardFadeIn {
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
`;

const Title = styled.h2`
  color: #6c3483;
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-size: 2.3rem;
  font-weight: 900;
  margin-bottom: 1.3rem;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 12px #e0c3fc44;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.3rem 1.1rem;
  margin-bottom: 1.2rem;
  border-radius: 1.1rem;
  border: 1.5px solid #e0c3fc;
  font-size: 1.18rem;
  outline: none;
  background: #f8fafc;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  &:focus {
    border-color: #6c3483;
    box-shadow: 0 4px 16px #e0c3fc33;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem 0;
  background: linear-gradient(90deg, #e0c3fc 0%, #a1c4fd 100%);
  color: #6c3483;
  border: none;
  border-radius: 1.2rem;
  font-size: 1.13rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(60,0,90,0.07);
  letter-spacing: 0.01em;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #6c3483;
    color: #fff;
    transform: scale(1.04);
  }
`;

const Message = styled.div`
  color: #c0392b;
  margin-bottom: 1rem;
  font-size: 1.02rem;
  font-family: 'Poppins', Arial, sans-serif;
`;

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "MALE",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required.";
    else if (form.username.trim().length < 2) newErrors.username = "Username must be at least 2 characters.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = "Enter a valid email address.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!form.gender) newErrors.gender = "Please select your gender.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    const res = await fetch("https://register-1cwl.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message || "User registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } else if (data.message && data.message.toLowerCase().includes("exist")) {
      alert(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } else {
      setSuccess("");
      alert(data.message);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Create Your Account</Title>
        <div style={{
          fontSize: '1.18rem',
          color: '#c0392b',
          marginBottom: '2rem',
          fontWeight: 500,
          fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
          textShadow: '0 1px 8px #e0c3fc22',
        }}>
          <span style={{color:'#27ae60',fontWeight:600}}>Unleash your imagination, connect with listeners, and become a voice legend!</span>
        </div>
        <form onSubmit={handleSubmit}>
          <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          {errors.username && <Message>{errors.username}</Message>}
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          {errors.email && <Message>{errors.email}</Message>}
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {errors.password && <Message>{errors.password}</Message>}
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <Message>{errors.confirmPassword}</Message>}
          <div style={{ textAlign: 'left', marginBottom: '1rem', fontSize: '1rem' }}>
            Gender:
            <label style={{ marginLeft: '1rem' }}>
              <input type="radio" name="gender" value="MALE" checked={form.gender === "MALE"} onChange={handleChange} /> Male
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input type="radio" name="gender" value="FEMALE" checked={form.gender === "FEMALE"} onChange={handleChange} /> Female
            </label>
          </div>
          {errors.gender && <Message>{errors.gender}</Message>}
          <Button type="submit">Register</Button>
        </form>
        {success && <Message style={{color:'#27ae60',fontWeight:'bold'}}>{success}</Message>}
        <div style={{ marginTop: '1.2rem', fontSize: '0.98rem' }}>
          Already have an account? {' '}
          <a href="/login" style={{ color: '#6c3483', textDecoration: 'underline', fontWeight: 600 }}>Login</a>
        </div>
      </Card>
    </Wrapper>
  );
}