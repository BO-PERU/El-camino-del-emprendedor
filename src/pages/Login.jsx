import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { user, loginWithMagicLink } = useAuth();
  const navigate = useNavigate();

  // Redirect based on role if logged in
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const result = await loginWithMagicLink(email);

    if (result.error) {
      setError(result.error.message);
    } else if (result.mock) {
      // Mock login succeeds immediately, the AuthContext state change will trigger the Navigate above
    } else {
      setMessage('¡Enlace enviado! Revisa tu correo electrónico para acceder al portal.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-panel">
        <div className="login-header">
          <h1 className="brand-logo login-logo" style={{ fontSize: '1.8rem', backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            El Camino del Emprendedor
          </h1>
          <p className="login-subtitle mt-2">Portal de Herramientas y Talleres Estratégicos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico de acceso</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="tu@correo.com (Prueba: mario@bo.com.pe)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert-error">{error}</div>}
          {message && <div className="alert-success">{message}</div>}

          <button 
            type="submit" 
            className="btn-primary login-btn" 
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar al Portal'}
          </button>
        </form>

        <div className="login-footer">
          <p>Se te enviará un enlace mágico para iniciar sesión sin contraseña.</p>
        </div>
      </div>
    </div>
  );
}
