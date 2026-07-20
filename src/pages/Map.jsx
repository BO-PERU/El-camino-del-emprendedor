import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map as MapIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function StrategicMap() {
  const navigate = useNavigate();
  // Mock computed products
  const [products] = useState([
    { id: 1, name: 'Taller Inicial', panTotal: 18, tortaTotal: 12 },
    { id: 2, name: 'Consultoría Avanzada', panTotal: 10, tortaTotal: 20 },
    { id: 3, name: 'Libro Digital', panTotal: 22, tortaTotal: 8 },
    { id: 4, name: 'Mentoría 1:1', panTotal: 14, tortaTotal: 22 },
  ]);

  const getCategory = (pan, torta) => {
    if (pan >= 16 && torta >= 16) return 'estrella';
    if (pan >= 16 && torta < 16) return 'pan';
    if (pan < 16 && torta >= 16) return 'torta';
    return 'lastre';
  };

  const categories = {
    estrella: { title: '⭐ ESTRELLA (Escalar)', items: products.filter(p => getCategory(p.panTotal, p.tortaTotal) === 'estrella'), color: 'var(--status-estrella)' },
    pan: { title: '🥖 PAN (Conectar)', items: products.filter(p => getCategory(p.panTotal, p.tortaTotal) === 'pan'), color: 'var(--status-pan)' },
    torta: { title: '🎂 TORTA (Crear entrada)', items: products.filter(p => getCategory(p.panTotal, p.tortaTotal) === 'torta'), color: 'var(--status-torta)' },
    lastre: { title: '⚓ LASTRE (Retirar)', items: products.filter(p => getCategory(p.panTotal, p.tortaTotal) === 'lastre'), color: 'var(--status-lastre)' },
  };

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1100px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <MapIcon size={24} />
        </div>
        <div>
          <h1 className="stage-title">Mapa Estratégico Pan-Torta</h1>
          <p className="stage-subtitle">Etapa 6 de 13</p>
        </div>
      </div>

      <p className="text-secondary mb-6">
        Aquí tienes tu portafolio clasificado automáticamente según los índices PAN y TORTA calculados en el paso anterior.
        (El umbral para ser un buen PAN o TORTA es lograr 16 puntos o más).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Quadrant Y-Axis (Torta) / X-Axis (Pan) logic */}
        
        {/* Top Left: Torta */}
        <div className="glass-panel" style={{ borderTop: `4px solid ${categories.torta.color}` }}>
          <h3 style={{ color: categories.torta.color, margin: '0 0 1rem 0' }}>{categories.torta.title}</h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Alto margen/impacto, pero entrada difícil.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {categories.torta.items.map(p => (
              <div key={p.id} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong>{p.name}</strong>
              </div>
            ))}
            {categories.torta.items.length === 0 && <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>Vacio</div>}
          </div>
        </div>

        {/* Top Right: Estrella */}
        <div className="glass-panel" style={{ borderTop: `4px solid ${categories.estrella.color}` }}>
          <h3 style={{ color: categories.estrella.color, margin: '0 0 1rem 0' }}>{categories.estrella.title}</h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Fácil de vender y de alto valor/margen.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {categories.estrella.items.map(p => (
              <div key={p.id} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong>{p.name}</strong>
              </div>
            ))}
            {categories.estrella.items.length === 0 && <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>Vacio</div>}
          </div>
        </div>

        {/* Bottom Left: Lastre */}
        <div className="glass-panel" style={{ borderTop: `4px solid ${categories.lastre.color}` }}>
          <h3 style={{ color: categories.lastre.color, margin: '0 0 1rem 0' }}>{categories.lastre.title}</h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Difícil de vender y bajo margen.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {categories.lastre.items.map(p => (
              <div key={p.id} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong>{p.name}</strong>
              </div>
            ))}
            {categories.lastre.items.length === 0 && <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>Vacio</div>}
          </div>
        </div>

        {/* Bottom Right: Pan */}
        <div className="glass-panel" style={{ borderTop: `4px solid ${categories.pan.color}` }}>
          <h3 style={{ color: categories.pan.color, margin: '0 0 1rem 0' }}>{categories.pan.title}</h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Fácil de vender, bajo compromiso/margen.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {categories.pan.items.map(p => (
              <div key={p.id} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong>{p.name}</strong>
              </div>
            ))}
            {categories.pan.items.length === 0 && <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>Vacio</div>}
          </div>
        </div>
      </div>

      <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-logout" onClick={() => navigate('/evaluation')} style={{ width: 'auto' }}>
          <ArrowLeft size={18} /> Atrás
        </button>
        
        <button 
          className="btn-primary flex-center gap-2" 
          onClick={() => navigate('/journey')}
        >
          Continuar a Journey Interno
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
