import { useNavigate } from 'react-router-dom';
import { PieChart, Download, PartyPopper } from 'lucide-react';
import './Stages.css';

export default function FinalReport() {
  const navigate = useNavigate();

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '900px' }}>
      <div className="stage-header">
        <div className="stage-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--status-estrella)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <PieChart size={24} />
        </div>
        <div>
          <h1 className="stage-title">Reporte Ejecutivo Final</h1>
          <p className="stage-subtitle">Etapa 13 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <PartyPopper size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Felicidades!</h2>
        <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Has completado con éxito la metodología de <strong>Pan y Tortas</strong>. Tu portafolio ahora tiene una estructura clara enfocada en flujo, margen y crecimiento.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <button className="btn-logout" onClick={() => navigate('/plan')} style={{ width: 'auto' }}>
            Revisar Plan 30D
          </button>
          
          <button className="btn-primary flex-center gap-2" style={{ background: 'var(--status-estrella)' }}>
            <Download size={18} />
            Descargar PDF del Reporte
          </button>
        </div>
      </div>
    </div>
  );
}
