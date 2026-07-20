import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function Journey() {
  const navigate = useNavigate();
  // Mock products to select from
  const [products] = useState([
    { id: 1, name: 'Taller Inicial' },
    { id: 2, name: 'Consultoría Avanzada' },
    { id: 3, name: 'Mentoría 1:1' },
  ]);

  const [transitions, setTransitions] = useState([
    { id: 1, from_product: 1, to_product: 2, motivation: '', barrier: '' }
  ]);
  const [saving, setSaving] = useState(false);

  const addTransition = () => {
    setTransitions([...transitions, { id: Date.now(), from_product: '', to_product: '', motivation: '', barrier: '' }]);
  };

  const removeTransition = (id) => {
    setTransitions(transitions.filter(t => t.id !== id));
  };

  const handleChange = (id, field, value) => {
    setTransitions(transitions.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSaveAndContinue = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/gaps');
    }, 600);
  };

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Route size={24} />
        </div>
        <div>
          <h1 className="stage-title">Journey Interno del Cliente</h1>
          <p className="stage-subtitle">Etapa 7 de 13</p>
        </div>
      </div>

      <p className="text-secondary mb-6">
        Define cómo un cliente que compra un producto inicial (Pan) decide avanzar hacia tu siguiente producto (Torta).
        ¿Qué lo motiva a dar el salto? ¿Qué barreras podrían impedirlo?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {transitions.map((transition, index) => (
          <div key={transition.id} className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button 
                onClick={() => removeTransition(transition.id)}
                style={{ background: 'transparent', color: 'var(--status-lastre)', border: 'none', cursor: 'pointer' }}
                title="Eliminar transición"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
              Transición {index + 1}
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Paso Anterior (De)</label>
                <select
                  className="input-field"
                  value={transition.from_product}
                  onChange={(e) => handleChange(transition.id, 'from_product', e.target.value)}
                >
                  <option value="">-- Seleccionar Producto --</option>
                  <option value="none">Sin producto (Primera compra)</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Paso Siguiente (Hacia)</label>
                <select
                  className="input-field"
                  value={transition.to_product}
                  onChange={(e) => handleChange(transition.id, 'to_product', e.target.value)}
                >
                  <option value="">-- Seleccionar Producto --</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="form-group form-full">
                <label>¿Por qué avanzaría? (Nueva necesidad)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ej. Ahora necesita ayuda para implementar lo aprendido..."
                  value={transition.motivation}
                  onChange={(e) => handleChange(transition.id, 'motivation', e.target.value)}
                />
              </div>

              <div className="form-group form-full">
                <label>¿Qué barrera podría impedirlo?</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ej. El precio del siguiente producto le parece muy alto de golpe..."
                  value={transition.barrier}
                  onChange={(e) => handleChange(transition.id, 'barrier', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-2" style={{ textAlign: 'center' }}>
          <button onClick={addTransition} className="btn-logout" style={{ display: 'inline-flex', width: 'auto', border: '1px dashed var(--border-color)' }}>
            <Plus size={18} /> Agregar conexión
          </button>
        </div>
      </div>

      <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-logout" onClick={() => navigate('/map')} style={{ width: 'auto' }}>
          <ArrowLeft size={18} /> Atrás
        </button>
        
        <button 
          className="btn-primary flex-center gap-2" 
          onClick={handleSaveAndContinue}
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Detectar Brechas'}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
