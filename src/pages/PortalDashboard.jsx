import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Map } from 'lucide-react';
import './Stages.css';

export default function PortalDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
        <h1 className="brand-logo" style={{ fontSize: '1.25rem', margin: 0, backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          El Camino del Emprendedor
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Hola, {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tus Herramientas y Talleres</h2>
        <p className="text-secondary" style={{ marginBottom: '3rem' }}>
          Selecciona el módulo que deseas trabajar hoy.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Pan y Tortas Card */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }} onClick={() => navigate('/pan-y-tortas/welcome')} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ height: '160px', background: 'linear-gradient(45deg, #1e1e24, #2a2a35)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-color)' }}>
              {/* Here we would put an actual photo. We use an icon and gradient as placeholder */}
              <Map size={48} color="var(--accent-primary)" style={{ opacity: 0.8 }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Pan & Tortas</h3>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '4px', fontWeight: 'bold' }}>ESTRATEGIA</span>
              </div>
              <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                Diseña un portafolio de productos que genere flujo de caja rápido y alto margen de crecimiento.
              </p>
              <button className="btn-primary" style={{ width: '100%' }}>
                Entrar al Taller
              </button>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: 0.6 }}>
            <div style={{ height: '160px', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-tertiary)', fontWeight: 'bold' }}>PRÓXIMAMENTE</span>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Máquina de Ventas</h3>
              <p className="text-tertiary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                Sistematiza tu proceso de adquisición de clientes y cierra más tratos.
              </p>
              <button className="btn-logout" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
                No disponible
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
