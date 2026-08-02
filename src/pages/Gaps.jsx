import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useWorkshop } from '../context/WorkshopContext';
import './Stages.css';

export default function Gaps() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { participant } = useWorkshop();

  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!participant || user.id === 'mock-123') {
      setLoading(false);
      return;
    }

    const fetchAndComputeGaps = async () => {
      try {
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .eq('participant_id', participant.id);

        const { data: journeys } = await supabase
          .from('journeys')
          .select('*')
          .eq('participant_id', participant.id);

        const newGaps = [];

        if (products) {
          const lastres = products.filter(p => p.strategic_category === 'lastre');
          if (lastres.length > 0) {
            newGaps.push({
              type: 'lastre',
              title: '⚠️ Tienes productos LASTRE',
              message: `Los productos "${lastres.map(l => l.name).join(', ')}" no generan margen ni tracción. Considera retirarlos o rediseñarlos.`
            });
          }

          const hasTorta = products.some(p => p.strategic_category === 'torta' || p.strategic_category === 'estrella');
          if (!hasTorta) {
            newGaps.push({
              type: 'torta',
              title: '⚠️ Falta un producto TORTA claro',
              message: 'No tienes ningún producto que alcance altos márgenes o valor estratégico. Tu rentabilidad por hora está topada.'
            });
          }
        }

        if (journeys && journeys.length > 0) {
          const disconnected = journeys.some(j => j.barrier && j.barrier.length > 10);
          if (disconnected) {
            newGaps.push({
              type: 'pan',
              title: '⚠️ Hay barreras fuertes en el Journey',
              message: 'Hay pasos en tu ruta de cliente con barreras considerables. Te falta un producto intermedio o mejorar la oferta.'
            });
          }
        }

        if (newGaps.length === 0) {
          newGaps.push({
            type: 'estrella',
            title: '✅ Portafolio Sano',
            message: 'No detectamos brechas críticas, ¡pero siempre hay espacio para optimizar y crear nuevas oportunidades!'
          });
        }

        setGaps(newGaps);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAndComputeGaps();
  }, [participant, user]);

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
          
          {!loading && gaps.length > 0 ? (
            gaps.map((gap, index) => (
              <div key={index} style={{ padding: '1.25rem', borderLeft: `4px solid var(--status-${gap.type})`, background: 'var(--bg-surface)', borderRadius: '0 8px 8px 0' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: `var(--status-${gap.type})` }}>
                  {gap.title}
                </h3>
                <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                  {gap.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-secondary">Analizando portafolio...</p>
          )}

        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/pan-y-tortas/journey')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} /> Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={() => navigate('/pan-y-tortas/opportunities')}
          >
            Diseñar Oportunidades
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
