import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Users, Settings } from 'lucide-react';
import './Layout.css'; // Reusing standard layout styles

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar" style={{ borderRight: '1px solid var(--accent-primary)' }}>
        <div className="sidebar-header">
          <h2 className="brand-logo" style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'unset' }}>
            Panel Facilitador
          </h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Alumnos / Talleres</span>
          </NavLink>

          <NavLink 
            to="/admin/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Configuración</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Salir</span>
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
