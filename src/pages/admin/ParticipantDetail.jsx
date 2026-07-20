import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Map as MapIcon, Target, CheckCircle } from 'lucide-react';
import '../Stages.css';

export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific participant (would normally fetch based on ID)
  const participantData = {
    name: 'Mario Camino',
    business: 'Tech Consulting',
    sector: 'Software / SaaS',
    targetClient: 'Startups Series A',
    products: [
      { id: 1, name: 'Consultoría UX', category: 'torta', panScore: 12, tortaScore: 22 },
      { id: 2, name: 'Auditoría Express', category: 'estrella', panScore: 18, tortaScore: 19 },
      { id: 3, name: 'Template Notion', category: 'pan', panScore: 24, tortaScore: 5 },
    ],
    prioritizedIdea: 'Lanzar template de UX para captar leads rápidos (PAN)',
    plan: [
      'Semana 1: Diseñar template',
      'Semana 2: Setup en Gumroad',
      'Semana 3: Lanzamiento en LinkedIn',
    ]
  };

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <button 
        onClick={() => navigate('/admin/dashboard')} 
        className="btn-logout" 
        style={{ width: 'auto', marginBottom: '2rem', display: 'inline-flex', padding: '0.5rem 1rem' }}
      >
        <ArrowLeft size={18} /> Volver al listado
      </button>

      <div className="stage-header">
        <div className="stage-icon-box">
          <User size={24} />
        </div>
        <div>
          <h1 className="stage-title">{participantData.name}</h1>
          <p className="stage-subtitle">{participantData.business} ({participantData.sector})</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
            <Target size={20} /> Cliente y Foco
          </h3>
          <p className="text-secondary" style={{ marginBottom: '0.5rem' }}><strong>Cliente Prioritario:</strong></p>
          <p style={{ margin: '0 0 1.5rem 0' }}>{participantData.targetClient}</p>

          <p className="text-secondary" style={{ marginBottom: '0.5rem' }}><strong>Idea Priorizada (Oportunidad):</strong></p>
          <p style={{ margin: '0 0 1.5rem 0' }}>{participantData.prioritizedIdea}</p>

          <p className="text-secondary" style={{ marginBottom: '0.5rem' }}><strong>Plan 30D:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            {participantData.plan.map((task, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{task}</li>
            ))}
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-pan)' }}>
            <MapIcon size={20} /> Estado del Portafolio
          </h3>
          <p className="text-secondary mb-4">Productos mapeados por el alumno:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {participantData.products.map(p => (
              <div key={p.id} style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '6px', borderLeft: `4px solid var(--status-${p.category})` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>{p.name}</strong>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: `var(--status-${p.category})`, fontWeight: 'bold' }}>
                    {p.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  PAN: {p.panScore}/25 | TORTA: {p.tortaScore}/25
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
