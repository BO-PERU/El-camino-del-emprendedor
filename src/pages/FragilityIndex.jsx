import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Stages.css';

const QUESTIONS = [
  {
    id: 'frecuencia',
    dimension: 'Frecuencia',
    question: '¿Qué tan irregular es la entrada de clientes nuevos?',
    options: [
      { score: 1, text: 'Entradas constantes durante el mes' },
      { score: 2, text: 'Flujo relativamente estable' },
      { score: 3, text: 'Hay semanas fuertes y semanas vacías' },
      { score: 4, text: 'Las ventas llegan de manera muy irregular' },
      { score: 5, text: 'Dependo de cierres aislados' }
    ]
  },
  {
    id: 'concentracion',
    dimension: 'Concentración',
    question: '¿Qué tanto dependes de pocos clientes o ventas grandes?',
    options: [
      { score: 1, text: 'Ningún cliente representa una parte crítica' },
      { score: 2, text: 'Hay cierta concentración, pero es manejable' },
      { score: 3, text: 'Algunos clientes pesan demasiado' },
      { score: 4, text: 'Pocos clientes explican gran parte de la facturación' },
      { score: 5, text: 'Perder uno o dos clientes compromete el negocio' }
    ]
  },
  {
    id: 'predictibilidad',
    dimension: 'Predictibilidad',
    question: '¿Qué tan difícil es anticipar cuánto facturarás el próximo mes?',
    options: [
      { score: 1, text: 'Puedo estimar razonablemente la facturación' },
      { score: 2, text: 'Tengo cierta visibilidad' },
      { score: 3, text: 'La previsión es imprecisa' },
      { score: 4, text: 'Cada mes empieza casi desde cero' },
      { score: 5, text: 'No tengo idea de cuánto facturaré' }
    ]
  },
  {
    id: 'riesgo',
    dimension: 'Riesgo de entrada',
    question: '¿Qué tan difícil es para un cliente nuevo probar tu oferta?',
    options: [
      { score: 1, text: 'Es fácil y poco riesgoso probar la oferta' },
      { score: 2, text: 'El cliente puede entrar con una decisión pequeña' },
      { score: 3, text: 'Requiere cierta confianza previa' },
      { score: 4, text: 'Supone una inversión o compromiso significativa' },
      { score: 5, text: 'El cliente debe apostar fuerte sin habernos probado' }
    ]
  },
  {
    id: 'complejidad',
    dimension: 'Complejidad comercial',
    question: '¿Cuánto tienes que explicar para que alguien entienda por qué debe comprarte?',
    options: [
      { score: 1, text: 'Se entiende en segundos' },
      { score: 2, text: 'Requiere una explicación breve' },
      { score: 3, text: 'Necesita conversación comercial' },
      { score: 4, text: 'Requiere reuniones, propuestas y seguimiento' },
      { score: 5, text: 'Necesita un discurso largo para justificar su valor' }
    ]
  },
  {
    id: 'recurrencia',
    dimension: 'Recurrencia',
    question: '¿Qué tan poca recompra o continuidad existe?',
    options: [
      { score: 1, text: 'La mayoría recompra o continúa' },
      { score: 2, text: 'Existe recurrencia razonable' },
      { score: 3, text: 'Hay recompra, pero no está diseñada' },
      { score: 4, text: 'La mayoría compra una sola vez' },
      { score: 5, text: 'Cada venta exige conseguir un cliente nuevo' }
    ]
  },
  {
    id: 'confianza',
    dimension: 'Confianza',
    question: '¿Qué tanto necesita el prospecto conocerte antes de comprarte?',
    options: [
      { score: 1, text: 'La propuesta se vende con evidencia clara' },
      { score: 2, text: 'La reputación reduce objeciones' },
      { score: 3, text: 'La confianza depende parcialmente del fundador' },
      { score: 4, text: 'El cliente necesita hablar conmigo' },
      { score: 5, text: 'Sin mi reputación personal casi no compran' }
    ]
  },
  {
    id: 'capacidad',
    dimension: 'Capacidad',
    question: '¿Qué tanto depende la venta y la entrega de ti?',
    options: [
      { score: 1, text: 'El equipo vende y entrega sin depender de mí' },
      { score: 2, text: 'Intervengo solo en puntos clave' },
      { score: 3, text: 'Participo en varias etapas' },
      { score: 4, text: 'Soy necesario para vender o entregar' },
      { score: 5, text: 'Todo depende directamente de mí' }
    ]
  },
  {
    id: 'margen',
    dimension: 'Margen',
    question: '¿Qué tan insuficiente es el margen después de considerar todo el esfuerzo?',
    options: [
      { score: 1, text: 'El margen cubre operación y crecimiento' },
      { score: 2, text: 'Es razonable' },
      { score: 3, text: 'Es aceptable, pero frágil' },
      { score: 4, text: 'El esfuerzo consume gran parte del margen' },
      { score: 5, text: 'Facturo, pero casi no gano' }
    ]
  }
];

export default function FragilityIndex() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSelect = (score) => {
    setAnswers({ ...answers, [QUESTIONS[currentStep].id]: score });
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResult(true);
      }
    }, 250);
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const getDiagnostic = (score) => {
    if (score >= 33) return { label: 'Modelo frágil', color: '#ef4444', focus: 'Rediseñar portafolio' };
    if (score >= 25) return { label: 'Ventas esporádicas', color: '#f97316', focus: 'Reducir dependencia' };
    if (score >= 17) return { label: 'Flujo vulnerable', color: '#eab308', focus: 'Crear flujo' };
    return { label: 'Relativamente sano', color: '#22c55e', focus: 'Proteger y escalar' };
  };

  const handleSaveAndContinue = () => {
    setSaving(true);
    // Simulate API saving
    setTimeout(() => {
      setSaving(false);
      navigate('/pan-y-tortas/profile');
    }, 600);
  };

  const resultData = showResult ? getDiagnostic(totalScore) : null;

  return (
    <div className="stage-container fade-in" style={{ maxWidth: '800px' }}>
      <div className="stage-header">
        <div className="stage-icon-box">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="stage-title">Índice de Fragilidad Comercial</h1>
          <p className="stage-subtitle">Etapa 1 de 13</p>
        </div>
      </div>

      {!showResult ? (
        <div className="glass-panel mt-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
              Pregunta {currentStep + 1} de {QUESTIONS.length}
            </span>
            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
              Dimensión: {QUESTIONS[currentStep].dimension}
            </span>
          </div>

          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '2rem' }}>
            <div style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s ease' }} />
          </div>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>{QUESTIONS[currentStep].question}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {QUESTIONS[currentStep].options.map((opt) => (
              <button
                key={opt.score}
                onClick={() => handleSelect(opt.score)}
                className="input-field"
                style={{ 
                  textAlign: 'left', 
                  padding: '1rem 1.25rem', 
                  cursor: 'pointer',
                  border: answers[QUESTIONS[currentStep].id] === opt.score ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                  background: answers[QUESTIONS[currentStep].id] === opt.score ? 'rgba(96, 165, 250, 0.1)' : 'var(--bg-surface)'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    border: '1px solid var(--border-color)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: answers[QUESTIONS[currentStep].id] === opt.score ? 'var(--accent-primary)' : 'transparent'
                  }}>
                    {answers[QUESTIONS[currentStep].id] === opt.score && <CheckCircle2 size={14} color="#fff" />}
                  </div>
                  <span>{opt.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="action-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button 
              className="btn-logout" 
              onClick={() => {
                if (currentStep > 0) setCurrentStep(currentStep - 1);
                else navigate('/pan-y-tortas/welcome');
              }} 
              style={{ width: 'auto' }}
            >
              <ArrowLeft size={18} /> Atrás
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel mt-6 fade-in" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Tu Puntuación Total:</h2>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: resultData.color, lineHeight: '1', marginBottom: '1.5rem' }}>
            {totalScore} <span style={{ fontSize: '1.5rem', color: 'var(--text-tertiary)' }}>/ 45</span>
          </div>
          
          <div style={{ background: 'var(--bg-surface-elevated)', border: `1px solid ${resultData.color}`, borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: resultData.color, margin: '0 0 0.5rem 0' }}>Diagnóstico: {resultData.label}</h3>
            <p style={{ margin: 0 }}><strong>Foco principal:</strong> {resultData.focus}</p>
          </div>

          <p className="text-secondary" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Este índice confirma que tu flujo comercial actual tiene áreas de mejora. A continuación, definiremos el perfil de tu negocio y tu cliente prioritario para empezar a construir un portafolio de productos más robusto y menos frágil.
          </p>

          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSaveAndContinue}
            disabled={saving}
            style={{ margin: '0 auto' }}
          >
            {saving ? 'Guardando...' : 'Continuar al Perfil de Negocio'}
            {!saving && <ArrowRight size={18} />}
          </button>
        </div>
      )}
    </div>
  );
}
