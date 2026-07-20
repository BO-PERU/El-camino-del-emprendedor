import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function ActionPlan() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, week: 'Semana 1', task: 'Diseñar el temario del E-book', status: 'pending' },
    { id: 2, week: 'Semana 2', task: 'Escribir el contenido y diseñar portada', status: 'pending' },
    { id: 3, week: 'Semana 3', task: 'Configurar Landing Page', status: 'pending' },
    { id: 4, week: 'Semana 4', task: 'Lanzamiento y promoción a la base de datos', status: 'pending' },
  ]);
  const [saving, setSaving] = useState(false);

  const handleSaveAndContinue = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/report');
    }, 600);
  };

  const handleChange = (id, value) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, task: value } : t));
  };

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '900px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Calendar size={24} />
        </div>
        <div>
          <h1 className="stage-title">Plan de Acción (30 Días)</h1>
          <p className="stage-subtitle">Etapa 12 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Distribuye la implementación de tu Quick Win (la idea de mayor impacto y menor esfuerzo) en las próximas 4 semanas.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map((t) => (
            <div key={t.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '100px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                {t.week}
              </div>
              <input
                type="text"
                className="input-field"
                style={{ flex: 1 }}
                placeholder="¿Qué vas a lograr esta semana?"
                value={t.task}
                onChange={(e) => handleChange(t.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/validation')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} /> Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving}
          >
            {saving ? 'Generando...' : 'Generar Reporte Final'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
