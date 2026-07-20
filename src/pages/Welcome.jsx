import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import './Stages.css';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="stage-container fade-in">
      <div className="stage-header">
        <div className="stage-icon-box">
          <LayoutDashboard size={24} />
        </div>
        <div>
          <h1 className="stage-title">Bienvenido a Pan y Tortas</h1>
          <p className="stage-subtitle">Etapa 0: Orientación y Contexto</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <h2 className="mb-4">¿De qué trata este taller?</h2>
        <p className="text-secondary mb-4">
          La metáfora central es sencilla pero poderosa:
        </p>
        
        <div className="metaphor-grid">
          <div className="metaphor-card border-pan">
            <h3>🥖 El PAN</h3>
            <p>Representa una solución de fácil adquisición, menor riesgo y entrada sencilla para tu cliente. Genera flujo y primeras ventas.</p>
          </div>
          <div className="metaphor-card border-torta">
            <h3>🎂 La TORTA</h3>
            <p>Representa una solución de mayor valor, complejidad, margen o impacto. Requiere más confianza y compromiso.</p>
          </div>
        </div>

        <p className="text-secondary mt-6 mb-6">
          El objetivo no es crear productos arbitrariamente, sino diseñar un <strong>portafolio coherente</strong> que facilite el viaje interno del cliente dentro de tu empresa, llevándolo de probar tu Pan a comprar tu Torta.
        </p>

        <div className="action-footer">
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={() => navigate('/pan-y-tortas/fragility')}
            style={{ width: '100%', marginTop: '2rem' }}
          >
            Iniciar Diagnóstico Comercial <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
