import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function Validation() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveAndContinue = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/plan');
    }, 600);
  };

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '900px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <CheckCircle size={24} />
        </div>
        <div>
          <h1 className="stage-title">Validación</h1>
          <p className="stage-subtitle">Etapa 11 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Antes de invertir dinero o tiempo construyendo tu nuevo producto (Pan o Torta), ¿cómo puedes validar que el mercado realmente lo quiere?
        </p>

        <div className="form-group form-full">
          <label>Selecciona un método de validación rápida (MVP)</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            
            <label style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', border: `1px solid ${method === 'landing' ? 'var(--accent-primary)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="validation_method" 
                value="landing" 
                checked={method === 'landing'}
                onChange={(e) => setMethod(e.target.value)}
              />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Landing Page + Pre-venta</strong>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Vender la idea antes de crearla para medir el interés real.</span>
              </div>
            </label>

            <label style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', border: `1px solid ${method === 'webinar' ? 'var(--accent-primary)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="validation_method" 
                value="webinar"
                checked={method === 'webinar'}
                onChange={(e) => setMethod(e.target.value)}
              />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Webinar / Masterclass Gratuita</strong>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Enseñar el concepto y ver cuántos se registran o hacen el upgrade.</span>
              </div>
            </label>

            <label style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', border: `1px solid ${method === 'beta' ? 'var(--accent-primary)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="validation_method" 
                value="beta"
                checked={method === 'beta'}
                onChange={(e) => setMethod(e.target.value)}
              />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Programa Beta con Clientes Actuales</strong>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Ofrecerlo a un grupo reducido a cambio de feedback y casos de éxito.</span>
              </div>
            </label>

          </div>
        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/opportunities')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} /> Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving || !method}
          >
            {saving ? 'Guardando...' : 'Crear Plan 30D'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
