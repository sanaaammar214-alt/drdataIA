'use client';

import { useState } from 'react';
import { Send, FileText, Loader2, AlertCircle, MapPin, ChevronDown, CheckCircle, Download, RefreshCw, ClipboardList } from 'lucide-react';

const regions = [
  'Toutes les régions',
  'Casablanca-Settat',
  'Rabat-Salé-Kénitra',
  'Marrakech-Safi',
  'Fès-Meknès',
  'Tanger-Tétouan-Al Hoceïma',
  'Souss-Massa',
  'Drâa-Tafilalet',
  "Béni Mellal-Khénifra",
  "L'Oriental",
  'Laâyoune-Sakia El Hamra',
  'Dakhla-Oued Ed-Dahab',
  'Guelmim-Oued Noun',
];

const maladies = ['Toutes', 'Diabète', 'Hypertension', 'Tuberculose', 'Cancer', 'Cardiovasculaire'];

const templateQuestions = [
  "Quelle est l'évolution des cas de diabète dans ma région sur 5 ans ?",
  "Quelles régions dépassent le plus les seuils OMS pour la tuberculose ?",
  "Quels sont les risques cardiovasculaires pour les plus de 50 ans au Maroc ?",
  "Comparez la prévalence de l'hypertension entre régions urbaines et rurales.",
];

const mockReport = (region: string, maladie: string, question: string) => `
## 📊 Rapport Épidémiologique — SEHHA DATA

**Région analysée :** ${region}
**Maladie ciblée :** ${maladie}
**Date de génération :** ${new Date().toLocaleDateString('fr-MA', { year: 'numeric', month: 'long', day: 'numeric' })}

---

### 🔍 Analyse de votre demande

Suite à votre question : *"${question}"*

Notre algorithme d'analyse Chain-of-Thought a croisé les données disponibles provenant des bulletins épidémiologiques du Ministère de la Santé (DELM), des rapports de l'OMS Bureau Maroc et des enquêtes HCP/ENPS.

---

### 📈 Résultats clés

- **Tendance observée :** Hausse significative de +20% sur la période 2019-2023 pour les maladies chroniques dans cette région.
- **Comparaison OMS :** Les indicateurs régionaux dépassent les seuils recommandés pour Diabète (10.6% vs seuil 10%) et Hypertension (29% vs seuil 25%).
- **Population à risque :** Les adultes de 45 à 65 ans représentent le segment le plus impacté selon les données ENPS 2023.
- **Couverture sanitaire :** 67% des zones rurales rapportent une couverture insuffisante en personnel médical spécialisé.

---

### ⚠️ Alertes Prioritaires

1. 🔴 **CRITIQUE** — Tuberculose : 96/100k bien au-dessus du seuil OMS de 20/100k.
2. 🟠 **DÉPASSÉ** — Hypertension artérielle : prévalence croissante sans dépistage systématique.
3. 🟠 **DÉPASSÉ** — Diabète de type 2 : progression alarmante liée aux habitudes alimentaires.

---

### 💡 Recommandations IA

1. Renforcer les campagnes de dépistage précoce dans les zones à forte densité.
2. Développer les programmes de prévention axés sur l'alimentation et l'activité physique.
3. Améliorer la déclaration obligatoire des maladies chroniques au niveau des DR Santé.

---

> ⚕️ *Ce rapport est généré automatiquement à partir de données officielles publiques. Il ne constitue pas un avis médical. Consultez un professionnel de santé pour tout suivi clinique.*
`;

export default function RapportPage() {
  const [question, setQuestion] = useState('');
  const [region, setRegion] = useState('Toutes les régions');
  const [maladie, setMaladie] = useState('Toutes');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setStep(0);

    // Simulate multi-step processing
    const steps = [
      { delay: 600, label: "Collecte des données DELM..." },
      { delay: 600, label: "Croisement OMS & HCP..." },
      { delay: 700, label: "Génération IA Chain-of-Thought..." },
      { delay: 400, label: "Formatage du rapport..." },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
      setStep(i + 1);
    }

    try {
      setResult(mockReport(region, maladie, question));
    } catch (err) {
      setError("Une erreur est survenue lors de la génération du rapport.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setQuestion('');
    setStep(0);
  };

  const progressSteps = [
    "Collecte DELM",
    "Croisement OMS",
    "Génération IA",
    "Formatage",
  ];

  return (
    <div className="w-full min-h-[calc(100vh-73px)] relative z-10 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-display text-[10px] font-bold mb-6 uppercase tracking-[0.25em]">
            <ClipboardList className="w-3.5 h-3.5 mr-2" />
            Moteur de Rapports Citoyens
          </div>
          <h1 className="font-display font-[800] text-4xl lg:text-6xl text-[#E8F4FD] tracking-[-1.5px] mb-5">
            Générer un <span className="text-[#00D4FF]">Rapport IA</span>
          </h1>
          <p className="text-lg text-[#7A9CBD] max-w-2xl mx-auto leading-relaxed">
            Interrogez SEHHA DATA en langage naturel pour obtenir une analyse épidémiologique
            structurée, personnalisée par région et par maladie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="alert-data-card status-blue overflow-hidden">
              <div className="px-6 py-5 border-b border-[#00D4FF]/10 bg-[#101F38] flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#00D4FF]" />
                <h2 className="font-display font-bold text-[#E8F4FD] tracking-wide">Paramétrer votre analyse</h2>
              </div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Région */}
                  <div>
                    <label className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A9CBD] mb-2 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> Région cible
                    </label>
                    <div className="relative">
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B1E3E] border border-[#00D4FF]/20 text-[#E8F4FD] rounded-xl appearance-none focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/40 transition-all cursor-pointer font-medium text-sm"
                      >
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A9CBD] pointer-events-none" />
                    </div>
                  </div>

                  {/* Maladie */}
                  <div>
                    <label className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A9CBD] mb-2 block">
                      Pathologie ciblée
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {maladies.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMaladie(m)}
                          className={`px-4 py-2 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all border ${
                            maladie === m
                              ? 'bg-[#00D4FF] text-[#0B1E3E] border-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                              : 'bg-[#0B1E3E] text-[#7A9CBD] border-[#00D4FF]/15 hover:border-[#00D4FF]/40 hover:text-[#E8F4FD]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A9CBD] mb-2 block">
                      Votre question
                    </label>
                    <textarea
                      rows={4}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ex : Quelle est l'évolution des cas de diabète dans ma région ?"
                      className="block w-full px-4 py-3 bg-[#0B1E3E] border border-[#00D4FF]/20 text-[#E8F4FD] rounded-xl focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/40 placeholder-[#7A9CBD]/50 resize-none transition-all text-sm leading-relaxed"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="w-full flex justify-center items-center py-4 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    style={{
                      background: loading || !question.trim() ? 'rgba(0,212,255,0.2)' : '#00D4FF',
                      color: loading || !question.trim() ? '#7A9CBD' : '#0B1E3E',
                      boxShadow: !loading && question.trim() ? '0 0 20px rgba(0,212,255,0.25)' : 'none',
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-3 h-5 w-5" />
                        Analyse IA en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Générer le rapport SEHHA
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Progress Stepper */}
            {loading && (
              <div className="alert-data-card p-6 mt-6">
                <h4 className="font-display font-bold text-[#E8F4FD] text-sm mb-5 uppercase tracking-wider">Pipeline IA en exécution...</h4>
                <div className="space-y-3">
                  {progressSteps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${i < step ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                        i < step
                          ? 'bg-[#22C55E]/15 border-[#22C55E]/30'
                          : i === step
                          ? 'bg-[#00D4FF]/10 border-[#00D4FF]/30 animate-pulseDot'
                          : 'bg-[#152843] border-[#7A9CBD]/20'
                      }`}>
                        {i < step ? (
                          <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                        ) : (
                          <span className="font-display font-bold text-[10px] text-[#7A9CBD]">{i + 1}</span>
                        )}
                      </div>
                      <span className="font-medium text-sm" style={{ color: i < step ? '#4ade80' : i === step ? '#00D4FF' : '#7A9CBD' }}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="alert-data-card status-red p-5 mt-6 flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-[#EF4444] shrink-0 mt-0.5" />
                <p className="text-sm text-[#f87171] font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Rapport Result */}
            {result && (
              <div className="alert-data-card status-green overflow-hidden mt-6">
                <div className="px-6 py-5 border-b border-[#22C55E]/15 bg-[#101F38] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide">Rapport généré avec succès</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#152843] border border-[#00D4FF]/15 text-[#7A9CBD] hover:text-[#E8F4FD] hover:border-[#00D4FF]/30 text-[11px] font-display font-bold uppercase tracking-wider transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Nouveau
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([result], { type: 'text/plain' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = `rapport-sehha-${region.replace(/ /g,'_')}.txt`;
                        a.click();
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00D4FF] text-[#0B1E3E] text-[11px] font-display font-bold uppercase tracking-wider hover:bg-white transition-all glow-box"
                    >
                      <Download className="w-3.5 h-3.5" /> Télécharger
                    </button>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="space-y-4">
                    {result.split('\n').filter(p => p.trim()).map((paragraph, idx) => {
                      if (paragraph.startsWith('## ')) return (
                        <h2 key={idx} className="font-display font-bold text-xl text-[#00D4FF] tracking-tight mt-2">{paragraph.replace('## ', '')}</h2>
                      );
                      if (paragraph.startsWith('### ')) return (
                        <h3 key={idx} className="font-display font-bold text-base text-[#E8F4FD] tracking-wide mt-6 mb-2">{paragraph.replace('### ', '')}</h3>
                      );
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) return (
                        <p key={idx} className="font-bold text-[#E8F4FD] text-sm">{paragraph.replace(/\*\*/g, '')}</p>
                      );
                      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) return (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 shrink-0"></span>
                          <p className="text-[#7A9CBD] text-sm leading-relaxed">{paragraph.replace(/^[*\-] /, '')}</p>
                        </div>
                      );
                      if (paragraph.startsWith('---')) return (
                        <hr key={idx} className="border-[#00D4FF]/10 my-4" />
                      );
                      if (paragraph.startsWith('> ')) return (
                        <div key={idx} className="border-l-2 border-[#00D4FF]/30 pl-4 py-2 bg-[#101F38] rounded-r-lg">
                          <p className="text-[#7A9CBD] text-xs leading-relaxed italic">{paragraph.replace('> ', '')}</p>
                        </div>
                      );
                      return <p key={idx} className="text-[#E8F4FD]/80 text-sm leading-relaxed">{paragraph}</p>;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Templates */}
          <div className="flex flex-col gap-5">
            <div className="alert-data-card p-6">
              <h3 className="font-display font-bold text-[#E8F4FD] text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00D4FF]" />
                Questions suggérées
              </h3>
              <div className="space-y-3">
                {templateQuestions.map((tq, i) => (
                  <button
                    key={i}
                    onClick={() => setQuestion(tq)}
                    className="w-full text-left p-3 rounded-xl bg-[#0B1E3E] border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 hover:bg-[#101F38] text-[#7A9CBD] hover:text-[#E8F4FD] text-xs leading-relaxed transition-all transform hover:-translate-y-0.5"
                  >
                    "{tq}"
                  </button>
                ))}
              </div>
            </div>

            <div className="alert-data-card p-6">
              <h3 className="font-display font-bold text-[#E8F4FD] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                Sources utilisées
              </h3>
              <ul className="space-y-3 text-xs text-[#7A9CBD]">
                {['DELM · Bulletins mensuels', 'OMS Bureau Maroc 2023', 'HCP / ENPS 2020-2023', 'Registres régionaux DR Santé'].map((src, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_4px_#22C55E]"></span>
                    {src}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
