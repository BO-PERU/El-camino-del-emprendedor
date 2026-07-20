import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function ClientProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    target_client: '',
    client_problems: '',
    client_aspirations: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAndContinue = async () => {
    setSaving(true);
    // mock save
    setTimeout(() => {
      setSaving(false);
      navigate('/inventory');
    }, 600);
  };

  return (
    <div className="stage-container fade-in">
      <div className="stage-header">
        <div className="stage-icon-box">
          <Target size={24} />
        </div>
        <div>
          <h1 className="stage-title">Cliente Prioritario</h1>
          <p className="stage-subtitle">Etapa 3 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Un buen portafolio de Pan y Tortas no está diseñado para "todo el mundo", sino para un cliente específico que tiene un problema claro.
        </p>

        <div className="form-grid">
          <div className="form-group form-full">
            <label htmlFor="target_client">Segmento o Tipo de Cliente Específico</label>
            <input
              id="target_client"
              name="target_client"
              type="text"
              className="input-field"
              placeholder="Ej. Gerentes de RRHH en empresas de más de 50 empleados..."
              value={formData.target_client}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-full">
            <label htmlFor="client_problems">¿Cuáles son sus principales problemas o barreras hoy?</label>
            <textarea
              id="client_problems"
              name="client_problems"
              className="input-field"
              placeholder="Ej. Alta rotación de personal, no logran encontrar perfiles técnicos..."
              value={formData.client_problems}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-full">
            <label htmlFor="client_aspirations">¿Qué resultado aspira lograr (su verdadero deseo)?</label>
            <textarea
              id="client_aspirations"
              name="client_aspirations"
              className="input-field"
              placeholder="Ej. Tener un equipo comprometido y estable que no dependa de supervisión..."
              value={formData.client_aspirations}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/profile')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} />
            Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving || !formData.target_client}
          >
            {saving ? 'Guardando...' : 'Guardar y Continuar'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
