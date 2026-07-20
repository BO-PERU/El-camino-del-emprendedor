import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import './Stages.css';

export default function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, name: '', description: '', price: '', status: 'actual' }
  ]);
  const [saving, setSaving] = useState(false);

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), name: '', description: '', price: '', status: 'actual' }]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSaveAndContinue = async () => {
    setSaving(true);
    // mock save to Supabase products table
    setTimeout(() => {
      setSaving(false);
      navigate('/evaluation');
    }, 600);
  };

  const hasValidProduct = products.some(p => p.name.trim() !== '');

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '1000px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Package size={24} />
        </div>
        <div>
          <h1 className="stage-title">Inventario del Portafolio</h1>
          <p className="stage-subtitle">Etapa 4 de 13</p>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <p className="text-secondary mb-6">
          Registra todos los productos o servicios que ofreces actualmente. No te preocupes aún si son Pan o Torta, eso lo evaluaremos en el siguiente paso.
        </p>

        <div className="inventory-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {products.map((product, index) => (
            <div key={product.id} className="glass-panel" style={{ background: 'var(--bg-surface)', padding: '1.25rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <button 
                  onClick={() => removeProduct(product.id)}
                  style={{ background: 'transparent', color: 'var(--status-lastre)', border: 'none', cursor: 'pointer' }}
                  title="Eliminar producto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>Producto {index + 1}</h3>
              
              <div className="form-grid" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label>Nombre del Producto / Servicio</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej. Taller Intensivo"
                    value={product.name}
                    onChange={(e) => handleChange(product.id, 'name', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Precio Estimado ($)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="Ej. 1500"
                    value={product.price}
                    onChange={(e) => handleChange(product.id, 'price', e.target.value)}
                  />
                </div>

                <div className="form-group form-full">
                  <label>Breve Descripción</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="¿En qué consiste?"
                    value={product.description}
                    onChange={(e) => handleChange(product.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4" style={{ textAlign: 'center' }}>
          <button onClick={addProduct} className="btn-logout" style={{ display: 'inline-flex', width: 'auto', border: '1px dashed var(--border-color)' }}>
            <Plus size={18} /> Agregar otro producto
          </button>
        </div>

        <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-logout" onClick={() => navigate('/client')} style={{ width: 'auto' }}>
            <ArrowLeft size={18} /> Atrás
          </button>
          
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving || !hasValidProduct}
          >
            {saving ? 'Guardando...' : 'Evaluar mi Portafolio'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
