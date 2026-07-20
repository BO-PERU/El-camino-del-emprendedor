import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Stages.css';

export default function BusinessProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    business_name: '',
    sector: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // In a real app, we'd fetch the existing participant record here
  useEffect(() => {
    // mock fetch
    if (user) {
      // fetch participant info...
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSaveAndContinue = async () => {
    setSaving(true);
    // mock save to Supabase
    // await supabase.from('participants').upsert({ user_id: user.id, ...formData })
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      navigate('/client');
    }, 600);
  };

  return (
    <div className="stage-container fade-in">
      <div className="stage-header">
        <div className="stage-icon-box">
          <Target size={24} />
        </div>
        <div>
          <h1 className="stage-title">Perfil del Negocio</h1>
          <p className="stage-subtitle">Etapa 2 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Antes de evaluar tus productos, necesitamos entender brevemente a qué se dedica tu empresa.
        </p>

        <div className="form-grid">
          <div className="form-group form-full">
            <label htmlFor="business_name">Nombre de tu empresa o proyecto</label>
            <input
              id="business_name"
              name="business_name"
              type="text"
              className="input-field"
              placeholder="Ej. Acme Corp"
              value={formData.business_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-full">
            <label htmlFor="sector">Sector o Industria</label>
            <select
              id="sector"
              name="sector"
              className="input-field"
              value={formData.sector}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción...</option>
              <option value="b2b_servicios">B2B - Servicios a empresas</option>
              <option value="b2c_servicios">B2C - Servicios a personas</option>
              <option value="b2b_productos">B2B - Productos / Manufactura</option>
              <option value="b2c_productos">B2C - Retail / E-commerce</option>
              <option value="software">Software / SaaS / Tech</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/pan-y-tortas/fragility')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} />
            Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving || !formData.business_name}
          >
            {saving ? 'Guardando...' : 'Guardar y Continuar'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
