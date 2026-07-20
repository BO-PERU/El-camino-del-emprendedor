import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import './Stages.css';

const PAN_CRITERIA = [
  { id: 'p1', name: 'Facilidad de entender', labelMin: 'Difícil de explicar', labelMax: 'Se entiende de inmediato' },
  { id: 'p2', name: 'Bajo riesgo percibido', labelMin: 'Cliente siente que apuesta fuerte', labelMax: 'Probarlo se siente seguro' },
  { id: 'p3', name: 'Frecuencia de compra', labelMin: 'Compra excepcional', labelMax: 'Compra recurrente' },
  { id: 'p4', name: 'Ciclo de venta corto', labelMin: 'Decisión lenta y compleja', labelMax: 'Decisión rápida' },
  { id: 'p5', name: 'Baja confianza previa', labelMin: 'Necesita conocer al fundador', labelMax: 'La evidencia basta' },
];

const TORTA_CRITERIA = [
  { id: 't1', name: 'Rentabilidad por hora', labelMin: 'Baja', labelMax: 'Alta' },
  { id: 't2', name: 'Margen unitario', labelMin: 'Bajo', labelMax: 'Alto' },
  { id: 't3', name: 'Contribución estratégica', labelMin: 'Apenas aporta al crecimiento', labelMax: 'Crítica para el futuro' },
  { id: 't4', name: 'Potencial de diferenciación', labelMin: 'Fácil de comparar o copiar', labelMax: 'Difícil de sustituir' },
  { id: 't5', name: 'Potencial de escalamiento', labelMin: 'Crece solo con más horas', labelMax: 'No depende linealmente de horas' },
];

export default function Evaluation() {
  const navigate = useNavigate();
  // Mock products from previous step
  const [products, setProducts] = useState([
    { id: 1, name: 'Taller Inicial', pan_scores: {}, torta_scores: {} },
    { id: 2, name: 'Consultoría Avanzada', pan_scores: {}, torta_scores: {} }
  ]);
  const [expandedProduct, setExpandedProduct] = useState(products[0]?.id);
  const [saving, setSaving] = useState(false);

  const handleScoreChange = (productId, type, criterionId, value) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          [`${type}_scores`]: {
            ...p[`${type}_scores`],
            [criterionId]: value
          }
        };
      }
      return p;
    }));
  };

  const calculateTotal = (scoresObj) => {
    return Object.values(scoresObj).reduce((a, b) => a + b, 0);
  };

  const handleSaveAndContinue = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/map');
    }, 600);
  };

  const renderScorer = (product, criteria, type) => (
    <div className="criteria-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
      {criteria.map(c => {
        const score = product[`${type}_scores`][c.id] || 0;
        return (
          <div key={c.id} className="criterion-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <strong>{c.name}</strong>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{score > 0 ? score : '-'} / 5</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  onClick={() => handleScoreChange(product.id, type, c.id, val)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: `1px solid ${score === val ? `var(--status-${type})` : 'var(--border-color)'}`,
                    background: score === val ? `var(--status-${type})` : 'transparent',
                    color: score === val ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              <span>1: {c.labelMin}</span>
              <span>5: {c.labelMax}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const isComplete = products.every(p => 
    Object.keys(p.pan_scores).length === 5 && 
    Object.keys(p.torta_scores).length === 5
  );

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Layers size={24} />
        </div>
        <div>
          <h1 className="stage-title">Evaluación PAN / TORTA</h1>
          <p className="stage-subtitle">Etapa 5 de 13</p>
        </div>
      </div>

      <p className="text-secondary mb-6">
        Califica cada producto del 1 al 5 según qué tanto cumple las características de un PAN y de una TORTA.
        Recuerda: 1 es nulo/bajo y 5 es totalmente/alto.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map((product) => {
          const isExpanded = expandedProduct === product.id;
          const panTotal = calculateTotal(product.pan_scores);
          const tortaTotal = calculateTotal(product.torta_scores);
          
          return (
            <div key={product.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              <div 
                style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isExpanded ? 'var(--bg-surface-elevated)' : 'transparent' }}
                onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
              >
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--status-pan)' }}>Índice PAN: <strong>{panTotal}</strong></span>
                    <span style={{ color: 'var(--status-torta)' }}>Índice TORTA: <strong>{tortaTotal}</strong></span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {isExpanded && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <div className="form-grid">
                    <div>
                      <h4 style={{ color: 'var(--status-pan)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🥖 Evaluación PAN
                      </h4>
                      {renderScorer(product, PAN_CRITERIA, 'pan')}
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--status-torta)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🎂 Evaluación TORTA
                      </h4>
                      {renderScorer(product, TORTA_CRITERIA, 'torta')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-logout" onClick={() => navigate('/inventory')} style={{ width: 'auto' }}>
          <ArrowLeft size={18} /> Atrás
        </button>
        
        <button 
          className="btn-primary flex-center gap-2" 
          onClick={handleSaveAndContinue}
          disabled={saving || !isComplete}
        >
          {saving ? 'Guardando...' : 'Ver Mapa Estratégico'}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
