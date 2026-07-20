import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import './Stages.css';

export default function Gaps() {
  const navigate = useNavigate();

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '900px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <AlertCircle size={24} />
        </div>
        <div>
          <h1 className="stage-title">Detección de Brechas</h1>
          <p className="stage-subtitle">Etapa 8 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Analizando tu mapa estratégico y las barreras en el Journey de tu cliente, hemos detectado automáticamente algunas "brechas" (Gaps) que debes atender.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ padding: '1.25rem', borderLeft: '4px solid var(--status-lastre)', background: 'var(--bg-surface)', borderRadius: '0 8px 8px 0' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-lastre)' }}>
              ⚠️ Tienes productos LASTRE
            </h3>
            <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
              Los productos <strong>Libro Digital Básico</strong> no generan margen ni tracción. Considera retirarlos o rediseñarlos.
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderLeft: '4px solid var(--status-pan)', background: 'var(--bg-surface)', borderRadius: '0 8px 8px 0' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-pan)' }}>
              ⚠️ Faltan conexiones (Salto muy grande)
            </h3>
            <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
              Pasar del <strong>Taller Inicial</strong> a la <strong>Consultoría Avanzada</strong> tiene una barrera muy alta (Precio). Te falta un producto intermedio.
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderLeft: '4px solid var(--status-torta)', background: 'var(--bg-surface)', borderRadius: '0 8px 8px 0' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-torta)' }}>
              ⚠️ Falta un producto TORTA claro
            </h3>
            <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
              No tienes ningún producto que logre más de 16 puntos en el Índice Torta. Tu rentabilidad por hora está topada.
            </p>
          </div>

        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/journey')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} /> Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={() => navigate('/opportunities')}
          >
            Diseñar Oportunidades
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
