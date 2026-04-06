'use client';

import { useState } from 'react';
import { Send, FileText, Loader2, AlertCircle } from 'lucide-react';

export default function RapportPage() {
  const [question, setQuestion] = useState('');
  const [region, setRegion] = useState('Toutes');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("Voici le rapport d'analyse généré par SEHHA DATA concernant votre demande sur la région " + region + ".\n\nSelon nos dernières données épidémiologiques consolidées, l'évolution des cas montre une tendance à la hausse pour les maladies chroniques. L'OMS recommande une vigilance accrue.\n\nCe rapport a été généré automatiquement et nécessite une validation par un professionnel de santé.");
    } catch (err) {
      setError("Une erreur est survenue lors de la génération du rapport.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 relative w-full">
      <div className="max-w-3xl mx-auto">
         <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Générer un Rapport Citoyen</h1>
            <p className="text-slate-600">Interrogez SEHHA DATA pour obtenir un rapport d'analyse en langage naturel sur la situation épidémiologique.</p>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">Région concernée</label>
                     <select 
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-primary focus:border-primary border-r-8 border-transparent outline outline-1 outline-slate-300"
                     >
                        <option>Toutes les régions</option>
                        <option>Casablanca-Settat</option>
                        <option>Rabat-Salé-Kénitra</option>
                        <option>Marrakech-Safi</option>
                        <option>Fès-Meknès</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">Votre question</label>
                     <textarea
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ex: Quelle est l'évolution des cas de diabète dans ma région au dernier trimestre ?"
                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-primary focus:border-primary resize-none"
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     disabled={loading || !question.trim()}
                     className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                     {loading ? (
                        <>
                           <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                           Analyse des données en cours...
                        </>
                     ) : (
                        <>
                           <Send className="-ml-1 mr-2 h-5 w-5" />
                           Générer le rapport IA
                        </>
                     )}
                  </button>
               </form>
            </div>
         </div>

         {error && (
            <div className="bg-red-50 border-l-4 border-critical p-4 mb-8 rounded-r-xl">
               <div className="flex">
                  <div className="flex-shrink-0">
                     <AlertCircle className="h-5 w-5 text-critical" />
                  </div>
                  <div className="ml-3">
                     <p className="text-sm text-red-700">{error}</p>
                  </div>
               </div>
            </div>
         )}

         {result && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex items-center">
                  <FileText className="w-5 h-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-slate-900">Rapport d'analyse</h3>
               </div>
               <div className="p-6 sm:p-8">
                  <div className="prose prose-slate max-w-none">
                     {result.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="text-slate-700 leading-relaxed mb-4">{paragraph}</p>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
