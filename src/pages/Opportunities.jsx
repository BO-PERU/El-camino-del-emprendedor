import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import './Stages.css';

export default function Opportunities() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([
    { id: 1, type: 'create_pan', description: 'Crear un E-book gratuito como PAN', impact: 4, effort: 2 },
    { id: 2, type: 'create_torta', description: 'Programa de acompañamiento 6 meses (TORTA)', impact: 5, effort: 5 },
  ]);
  const [saving, setSaving] = useState(false);

  const addIdea = () => {
    setIdeas([...ideas, { id: Date.now(), type: 'create_pan', description: '', impact: 3, effort: 3 }]);
  };

  const removeIdea = (id) => {
    setIdeas(ideas.filter(i => i.id !== id));
  };

  const handleChange = (id, field, value) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleSaveAndContinue = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/validation');
    }, 600);
  };

  // Matriz ICE (Impacto / Esfuerzo) simple
  const sortedIdeas = [...ideas].sort((a, b) => {
    const scoreA = a.impact / a.effort;
    const scoreB = b.impact / b.effort;
    return scoreB - scoreA;
  });

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Lightbulb size={24} />
        </div>
        <div>
          <h1 className="stage-title">Oportunidades y Priorización</h1>
          <p className="stage-subtitle">Etapas 9 y 10 de 13</p>
        </div>
      </div>

      <p className="text-secondary mb-6">
        Basado en tus brechas, idea nuevos productos (Pan o Torta) o acciones para mejorar tu portafolio.
        Luego, evalúa el Impacto y Esfuerzo (1 a 5) para priorizarlas automáticamente.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {ideas.map((idea) => (
          <div key={idea.id} className="glass-panel" style={{ padding: '1.25rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button 
                onClick={() => removeIdea(idea.id)}
                style={{ background: 'transparent', color: 'var(--status-lastre)', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="form-grid" style={{ alignItems: 'end' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Tipo de Acción</label>
                <select 
                  className="input-field"
                  value={idea.type}
                  onChange={(e) => handleChange(idea.id, 'type', e.target.value)}
                >
                  <option value="create_pan">🍞 Crear un nuevo PAN</option>
                  <option value="create_torta">🎂 Crear una nueva TORTA</option>
                  <option value="kill_lastre">⚓ Eliminar un LASTRE</option>
                  <option value="fix_bridge">🌉 Mejorar puente / transición</option>
                </select>
              </div>

              <div className="form-group form-full">
                <label>Descripción de la idea</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="¿Qué vas a hacer?"
                  value={idea.description}
                  onChange={(e) => handleChange(idea.id, 'description', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Impacto (1-5)</label>
                <input
                  type="number"
                  min="1" max="5"
                  className="input-field"
                  value={idea.impact}
                  onChange={(e) => handleChange(idea.id, 'impact', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Esfuerzo (1-5)</label>
                <input
                  type="number"
                  min="1" max="5"
                  className="input-field"
                  value={idea.effort}
                  onChange={(e) => handleChange(idea.id, 'effort', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div style={{ textAlign: 'center' }}>
          <button onClick={addIdea} className="btn-logout" style={{ display: 'inline-flex', width: 'auto', border: '1px dashed var(--border-color)' }}>
            <Plus size={18} /> Agregar Idea
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ background: 'var(--bg-surface-elevated)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Priorización Automática (Quick Wins primero)</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sortedIdeas.map((idea, index) => (
            <li key={`sorted-${idea.id}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-base)', borderRadius: '6px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1.2rem', width: '20px' }}>{index + 1}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{idea.description || '(Sin descripción)'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Impacto: {idea.impact} / Esfuerzo: {idea.effort} (Score: {(idea.impact / idea.effort).toFixed(1)})
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-logout" onClick={() => navigate('/gaps')} style={{ width: 'auto' }}>
          <ArrowLeft size={18} /> Atrás
        </button>
        
        <button 
          className="btn-primary flex-center gap-2" 
          onClick={handleSaveAndContinue}
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Ir a Validación'}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
