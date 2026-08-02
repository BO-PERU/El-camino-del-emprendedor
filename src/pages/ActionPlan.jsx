import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useWorkshop } from '../context/WorkshopContext';
import './Stages.css';

export default function ActionPlan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { participant } = useWorkshop();

  const defaultTasks = [
    { tempId: 1, week: 'Semana 1', week_number: 1, task: 'Diseñar el temario del E-book', status: 'pending' },
    { tempId: 2, week: 'Semana 2', week_number: 2, task: 'Escribir el contenido y diseñar portada', status: 'pending' },
    { tempId: 3, week: 'Semana 3', week_number: 3, task: 'Configurar Landing Page', status: 'pending' },
    { tempId: 4, week: 'Semana 4', week_number: 4, task: 'Lanzamiento y promoción a la base de datos', status: 'pending' },
  ];

  const [tasks, setTasks] = useState(defaultTasks);
  const [topOpportunity, setTopOpportunity] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!participant || user.id === 'mock-123') return;

    const fetchActionPlan = async () => {
      // Find top opportunity
      const { data: opps } = await supabase
        .from('opportunities')
        .select('id, attractiveness, ease')
        .eq('participant_id', participant.id);

      if (opps && opps.length > 0) {
        const sorted = opps.sort((a, b) => {
          const scoreA = (a.attractiveness || 1) / (a.ease || 1);
          const scoreB = (b.attractiveness || 1) / (b.ease || 1);
          return scoreB - scoreA;
        });
        const topOpp = sorted[0];
        setTopOpportunity(topOpp);

        const { data: plans } = await supabase
          .from('action_plans')
          .select('*')
          .eq('participant_id', participant.id)
          .eq('opportunity_id', topOpp.id)
          .order('week_number', { ascending: true });

        if (plans && plans.length > 0) {
          const loadedTasks = [1, 2, 3, 4].map(w => {
            const plan = plans.find(p => p.week_number === w);
            return {
              tempId: w,
              id: plan?.id,
              week: `Semana ${w}`,
              week_number: w,
              task: plan ? plan.task : '',
              status: plan ? plan.status : 'pending'
            };
          });
          setTasks(loadedTasks);
        } else {
          setTasks(defaultTasks.map(t => ({...t, task: ''})));
        }
      }
    };

    fetchActionPlan();
  }, [participant, user]);

  const handleSaveAndContinue = async () => {
    if (!participant) return;
    setSaving(true);
    try {
      if (user.id !== 'mock-123' && topOpportunity) {
        const validTasks = tasks.filter(t => t.task.trim() !== '').map(t => {
          const data = {
            participant_id: participant.id,
            opportunity_id: topOpportunity.id,
            week_number: t.week_number,
            task: t.task,
            status: t.status
          };
          if (t.id) data.id = t.id;
          return data;
        });

        if (validTasks.length > 0) {
          const { error } = await supabase.from('action_plans').upsert(validTasks);
          if (error) throw error;
        }
      }
      navigate('/pan-y-tortas/report');
    } catch (error) {
      console.error('Error saving action plan:', error);
      alert('Hubo un error guardando el plan de acción.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (tempId, value) => {
    setTasks(tasks.map(t => t.tempId === tempId ? { ...t, task: value } : t));
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
            <div key={t.tempId} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '100px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                {t.week}
              </div>
              <input
                type="text"
                className="input-field"
                style={{ flex: 1 }}
                placeholder="¿Qué vas a lograr esta semana?"
                value={t.task}
                onChange={(e) => handleChange(t.tempId, e.target.value)}
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
