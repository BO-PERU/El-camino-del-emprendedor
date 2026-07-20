import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Eye } from 'lucide-react';
import '../Stages.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  // Mock data representing participants from Supabase
  const [participants] = useState([
    { id: '1', name: 'Mario Camino', business: 'Tech Consulting', completedStages: 12, lastActive: 'Hace 5 min' },
    { id: '2', name: 'Ana Silva', business: 'Diseño Gráfico', completedStages: 5, lastActive: 'Hace 2 horas' },
    { id: '3', name: 'Carlos Ruiz', business: 'Venta de Hardware', completedStages: 2, lastActive: 'Ayer' },
  ]);

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Users size={24} />
        </div>
        <div>
          <h1 className="stage-title">Alumnos del Taller</h1>
          <p className="stage-subtitle">Vista general de participantes</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Progreso de Participantes</h2>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Buscar alumno..."
              style={{ paddingLeft: '2.5rem', width: '250px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Nombre</th>
                <th style={{ padding: '1rem 0.5rem' }}>Negocio</th>
                <th style={{ padding: '1rem 0.5rem' }}>Progreso (Etapas)</th>
                <th style={{ padding: '1rem 0.5rem' }}>Última Actividad</th>
                <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{p.business}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>{p.completedStages}/12</span>
                      <div style={{ width: '100px', height: '6px', background: 'var(--bg-base)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(p.completedStages / 12) * 100}%`, height: '100%', background: 'var(--accent-primary)' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{p.lastActive}</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => navigate(`/admin/participant/${p.id}`)}
                      className="btn-logout" 
                      style={{ padding: '0.4rem 0.75rem', width: 'auto', display: 'inline-flex', background: 'var(--bg-surface-elevated)' }}
                    >
                      <Eye size={16} /> Ver Mapa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
