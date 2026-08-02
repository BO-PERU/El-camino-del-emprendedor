import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useWorkshop } from '../context/WorkshopContext';
import './Stages.css';

export default function Journey() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { participant } = useWorkshop();

  const [products, setProducts] = useState([]);
  const [transitions, setTransitions] = useState([
    { tempId: Date.now(), from_product: '', to_product: '', motivation: '', barrier: '' }
  ]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!participant || user.id === 'mock-123') return;

    const fetchData = async () => {
      // Fetch Products
      const { data: prodData } = await supabase
        .from('products')
        .select('id, name')
        .eq('participant_id', participant.id)
        .order('created_at', { ascending: true });
      
      if (prodData) setProducts(prodData);

      // Fetch Journeys
      const { data: journeyData } = await supabase
        .from('journeys')
        .select('*')
        .eq('participant_id', participant.id)
        .order('created_at', { ascending: true });

      if (journeyData && journeyData.length > 0) {
        setTransitions(journeyData.map(j => ({
          tempId: j.id,
          id: j.id,
          from_product: j.from_product_id || 'none',
          to_product: j.to_product_id || '',
          motivation: j.motivation || '',
          barrier: j.barrier || ''
        })));
      }
    };

    fetchData();
  }, [participant, user]);

  const addTransition = () => {
    setTransitions([...transitions, { tempId: Date.now(), from_product: '', to_product: '', motivation: '', barrier: '' }]);
  };

  const removeTransition = (tempId) => {
    const transitionToRemove = transitions.find(t => t.tempId === tempId);
    if (transitionToRemove && transitionToRemove.id) {
      setDeletedIds(prev => [...prev, transitionToRemove.id]);
    }
    setTransitions(transitions.filter(t => t.tempId !== tempId));
  };

  const handleChange = (tempId, field, value) => {
    setTransitions(transitions.map(t => t.tempId === tempId ? { ...t, [field]: value } : t));
  };

  const handleSaveAndContinue = async () => {
    if (!participant) return;
    setSaving(true);
    
    try {
      if (user.id !== 'mock-123') {
        // Delete removed transitions
        if (deletedIds.length > 0) {
          await supabase.from('journeys').delete().in('id', deletedIds);
        }

        // Upsert current transitions
        const validTransitions = transitions.filter(t => t.to_product !== '').map(t => {
          const jData = {
            participant_id: participant.id,
            from_product_id: t.from_product === 'none' || t.from_product === '' ? null : t.from_product,
            to_product_id: t.to_product === '' ? null : t.to_product,
            motivation: t.motivation,
            barrier: t.barrier
          };
          if (t.id) jData.id = t.id;
          return jData;
        });

        if (validTransitions.length > 0) {
          const { error } = await supabase.from('journeys').upsert(validTransitions);
          if (error) throw error;
        }
      }
      navigate('/pan-y-tortas/gaps');
    } catch (error) {
      console.error('Error saving journeys:', error);
      alert('Hubo un error guardando tu mapa de rutas.');
    } finally {
      setSaving(false);
    }
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
          <div key={transition.tempId} className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button 
                onClick={() => removeTransition(transition.tempId)}
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
                  onChange={(e) => handleChange(transition.tempId, 'from_product', e.target.value)}
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
                  onChange={(e) => handleChange(transition.tempId, 'to_product', e.target.value)}
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
                  onChange={(e) => handleChange(transition.tempId, 'motivation', e.target.value)}
                />
              </div>

              <div className="form-group form-full">
                <label>¿Qué barrera podría impedirlo?</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ej. El precio del siguiente producto le parece muy alto de golpe..."
                  value={transition.barrier}
                  onChange={(e) => handleChange(transition.tempId, 'barrier', e.target.value)}
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
