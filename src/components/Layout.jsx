import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, LayoutDashboard, Target, Package, Layers, 
  Map, Route, AlertCircle, Lightbulb, ListOrdered, 
  CheckCircle, Calendar, PieChart
} from 'lucide-react';
import './Layout.css';

const STAGES = [
  { id: '0', path: '/welcome', label: 'Bienvenida', icon: LayoutDashboard },
  { id: '1', path: '/fragility', label: '1. Fragilidad', icon: Activity },
  { id: '2', path: '/profile', label: '2. Perfil del Negocio', icon: Target },
  { id: '3', path: '/client', label: '3. Cliente Prioritario', icon: Target },
  { id: '4', path: '/inventory', label: '4. Inventario', icon: Package },
  { id: '5', path: '/evaluation', label: '5. Evaluación', icon: Layers },
  { id: '6', path: '/map', label: '6. Mapa Pan-Torta', icon: Map },
  { id: '7', path: '/journey', label: '7. Journey Interno', icon: Route },
  { id: '8', path: '/gaps', label: '8. Brechas', icon: AlertCircle },
  { id: '9', path: '/opportunities', label: '9. Oportunidades', icon: Lightbulb },
  { id: '10', path: '/prioritization', label: '10. Priorización', icon: ListOrdered },
  { id: '11', path: '/validation', label: '11. Validación', icon: CheckCircle },
  { id: '12', path: '/plan', label: '12. Plan 30D', icon: Calendar },
  { id: '13', path: '/report', label: '13. Reporte Final', icon: PieChart },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* Logo placeholder - using text for now or we could use the image */}
          <h2 className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            EL CAMINO
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Pan & Tortas</div>
        </div>
        
        <nav className="sidebar-nav">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <NavLink 
                key={stage.id} 
                to={`/pan-y-tortas${stage.path}`}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{stage.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => navigate('/dashboard')} style={{ marginBottom: '0.5rem' }}>
            <LayoutDashboard size={18} />
            <span>Volver al Portal</span>
          </button>
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
