'use client';

import Link from 'next/link';
import { Database, Brain, FileText, CheckCircle2, Bot, LineChart as ChartLine, Zap, Globe, AlertTriangle, ShieldCheck, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#FFFFFF] text-[#1A1A2E] font-sans overflow-x-hidden">
      
      {/* ======================= SECTION 2 — HERO ======================== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              
              {/* --- Colonne gauche : TEXTE --- */}
              <div className="max-w-xl">
                 <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#E0F2FE] text-[#1A3A8F] text-xs font-semibold mb-8 uppercase tracking-wide">
                    IA · Santé Publique · Maroc 🇲🇦
                 </div>
                 
                 <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                    Rencontrez <br />
                    <span className="text-[#1A3A8F]">Dr. Sehha</span><br />
                    Votre assistant <span className="text-[#00D4FF]">IA</span> épidémiologique
                 </h1>
                 
                 <p className="text-lg text-[#64748B] mb-8 leading-relaxed max-w-lg">
                    Dr. Sehha analyse les données de santé publique marocaines en temps réel et vous explique les tendances épidémiologiques en langage simple.
                 </p>
                 
                 <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                       <CheckCircle2 className="w-6 h-6 text-[#22C55E] mr-3 shrink-0" />
                       <span className="text-[15px] font-medium text-[#1A1A2E]">Données officielles DELM · OMS · HCP</span>
                    </li>
                    <li className="flex items-start">
                       <Zap className="w-6 h-6 text-[#22C55E] mr-3 shrink-0" />
                       <span className="text-[15px] font-medium text-[#1A1A2E]">Alertes OMS automatiques en temps réel</span>
                    </li>
                    <li className="flex items-start">
                       <FileText className="w-6 h-6 text-[#22C55E] mr-3 shrink-0" />
                       <span className="text-[15px] font-medium text-[#1A1A2E]">Rapports citoyens générés par IA</span>
                    </li>
                 </ul>
                 
                 <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link href="/assistant" className="inline-flex justify-center items-center px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#1A3A8F] hover:bg-[#152e72] shadow-lg shadow-blue-900/20 transition-all">
                       Parler à Dr. Sehha →
                    </Link>
                    <Link href="/dashboard" className="inline-flex justify-center items-center px-8 py-3.5 rounded-full border-2 border-[#1A3A8F]/10 text-base font-bold text-[#1A3A8F] hover:bg-slate-50 transition-all">
                       Voir le dashboard
                    </Link>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                    <span>Données Min. Santé</span>
                    <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>OMS Maroc</span>
                    <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>HCP/ENPS</span>
                 </div>
              </div>

              {/* --- Colonne droite : VISUEL & CARTES --- */}
              <div className="relative flex justify-center items-center h-[400px] sm:h-[500px]">
                 {/* Mascotte placeholder / image */}
                 <div className="relative z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] bg-[#F1F5F9] rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E6F1FB] to-white"></div>
                    <img src="/mascotte.png" alt="Dr. Sehha" className="w-full h-full object-contain relative z-20 hover:scale-105 transition-transform duration-500"
                         onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.querySelector('.fallback-icon')!.classList.remove('hidden');
                         }}
                    />
                    <Bot className="fallback-icon hidden w-32 h-32 sm:w-40 sm:h-40 text-[#1A3A8F] relative z-20" />
                 </div>

                 {/* Floating Cards animées */}
                 <div className="hidden sm:flex absolute top-10 -left-10 z-30 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 items-center animate-float-delayed w-64">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                          <ChartLine className="w-5 h-5 text-[#EF4444]" />
                       </div>
                       <div>
                          <div className="font-bold text-[#1A1A2E] text-sm">Tuberculose</div>
                          <div className="text-xs text-[#64748B] mb-1">96/100k → Seuil 20</div>
                          <div className="inline-flex px-1.5 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-bold tracking-wide">CRITIQUE</div>
                       </div>
                    </div>
                 </div>

                 <div className="hidden sm:flex absolute top-1/2 -right-12 z-30 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 items-start gap-3 w-72 animate-float">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                       <Bot className="w-5 h-5 text-[#1A3A8F]" />
                    </div>
                    <div>
                       <div className="font-bold text-[#1A1A2E] text-sm mb-1">Dr. Sehha répond</div>
                       <div className="text-xs text-[#64748B] leading-relaxed relative bg-slate-50 p-2 rounded-xl rounded-tl-none">
                          "Le diabète au Maroc a augmenté de 20% en 5 ans..."
                       </div>
                    </div>
                 </div>

                 <div className="hidden sm:flex absolute -bottom-6 left-8 z-30 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 items-center gap-3 w-56 animate-float-fast">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div>
                       <div className="font-bold text-[#1A1A2E] text-sm">Mise à jour</div>
                       <div className="text-[11px] text-[#64748B] mb-1">Données · Avril 2025</div>
                       <div className="inline-flex px-1.5 py-0.5 rounded bg-[#22C55E] text-white text-[10px] font-bold tracking-wide">EN LIGNE</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
      {/* ======================= SECTION QUOTE ======================== */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-[#1A3A8F] to-[#00D4FF] text-white">
         <div className="absolute inset-0 bg-white/5"></div>
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Quote className="w-16 h-16 mx-auto mb-8 text-cyan-200 opacity-80" />
            <h2 className="text-2xl md:text-4xl font-extrabold mb-8 leading-relaxed">
               "La santé est la véritable richesse.<br/> Chaque donnée analysée est une vie protégée. Portons l'espoir grâce à l'intelligence de la donnée."
            </h2>
            <p className="text-cyan-100 font-bold text-sm tracking-widest uppercase">— SEHHA DATA</p>
         </div>
      </section>


      {/* ======================= SECTION 3 — STATS CHOC ======================== */}
      <section className="bg-[#0D1B2A] py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:divide-x divide-slate-800/50">
               <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] mb-2">5</span>
                  <span className="text-sm text-slate-400 font-medium">Maladies surveillées</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] mb-2">12</span>
                  <span className="text-sm text-slate-400 font-medium">Régions couvertes</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] mb-2">2019-2023</span>
                  <span className="text-sm text-slate-400 font-medium">Données historiques</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] mb-2">3</span>
                  <span className="text-sm text-slate-400 font-medium">Workflows automatisés</span>
               </div>
            </div>
         </div>
      </section>

      {/* ======================= SECTION 4 — COMMENT ÇA MARCHE ======================== */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-4">Comment Dr. Sehha fonctionne</h2>
               <p className="text-lg text-[#64748B]">Un pipeline IA complet, de la donnée brute au rapport citoyen</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="hidden md:block absolute top-[4.5rem] left-[20%] w-[60%] h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 z-0"></div>

               {/* ETAPE 1 */}
               <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                     <Database className="w-8 h-8 text-[#1A3A8F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">Collecte automatique</h3>
                  <p className="text-[#64748B] mb-6 text-sm leading-relaxed">
                     Chaque mois, les données officielles du Ministère de la Santé sont collectées et structurées automatiquement.
                  </p>
                  <div className="mt-auto inline-flex px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                     n8n · Google Sheets
                  </div>
               </div>

               {/* ETAPE 2 */}
               <div className="relative z-10 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(26,58,143,0.06)] border border-[#1A3A8F]/10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 transform md:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center mb-6">
                     <Brain className="w-8 h-8 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">Analyse IA</h3>
                  <p className="text-[#64748B] mb-6 text-sm leading-relaxed">
                     Dr. Sehha calcule les indicateurs, détecte les dépassements de seuils OMS et identifie les tendances régionales.
                  </p>
                  <div className="mt-auto inline-flex px-3 py-1 bg-[#1A3A8F]/10 rounded-full text-xs font-semibold text-[#1A3A8F]">
                     GPT-4o · Chain-of-Thought
                  </div>
               </div>

               {/* ETAPE 3 */}
               <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                     <FileText className="w-8 h-8 text-[#1A3A8F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">Rapport citoyen</h3>
                  <p className="text-[#64748B] mb-6 text-sm leading-relaxed">
                     En langage simple et accessible, Dr. Sehha génère un rapport personnalisé pour chaque question posée.
                  </p>
                  <div className="mt-auto inline-flex px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                     Botpress · n8n · LLM
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ======================= SECTION 5 — MISE EN AVANT DR. SEHHA ======================== */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               
               {/* Colonne Gauche : Image Spotlight */}
               <div className="relative flex justify-center order-2 lg:order-1">
                  <div className="absolute inset-0 bg-gradient-radial from-[#E6F1FB] to-transparent opacity-80 scale-150 transform"></div>
                  <div className="relative z-10 w-full max-w-sm aspect-square bg-[#E6F1FB] rounded-[3rem] p-8 flex items-end justify-center overflow-hidden border border-[#E6F1FB]/50 shadow-xl shadow-[#1A3A8F]/5">
                     <img src="/mascotte.png" alt="Dr. Sehha Spotlight" className="w-full h-auto object-contain relative z-20"
                          onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             e.currentTarget.parentElement!.querySelector('.fallback-icon-2')!.classList.remove('hidden');
                          }}
                     />
                     <Bot className="fallback-icon-2 hidden w-48 h-48 text-[#1A3A8F] relative z-20 mb-10" />
                  </div>
               </div>

               {/* Colonne Droite : Features */}
               <div className="order-1 lg:order-2">
                  <div className="inline-flex px-4 py-2 rounded-full bg-slate-100 text-[#1A1A2E] text-xs font-bold mb-6 uppercase tracking-wider">
                     Votre assistant personnel
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-12 leading-tight">
                     Dr. Sehha est là pour répondre à toutes vos questions de santé publique
                  </h2>

                  <div className="space-y-8">
                     
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                           <Zap className="w-6 h-6 text-[#1A3A8F]" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-[#1A1A2E] mb-1">Analyse en temps réel</h4>
                           <p className="text-sm text-[#64748B] leading-relaxed">Pose ta question, Dr. Sehha consulte les données officielles et te répond en secondes.</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                           <Globe className="w-6 h-6 text-[#00D4FF]" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-[#1A1A2E] mb-1">Couverture nationale</h4>
                           <p className="text-sm text-[#64748B] leading-relaxed">12 régions administratives du Maroc, 5 maladies prioritaires, données 2019-2023.</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                           <AlertTriangle className="w-6 h-6 text-[#F97316]" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-[#1A1A2E] mb-1">Alertes intelligentes</h4>
                           <p className="text-sm text-[#64748B] leading-relaxed">Détection automatique des dépassements de seuils OMS avec niveau de criticité.</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                           <ShieldCheck className="w-6 h-6 text-[#64748B]" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-[#1A1A2E] mb-1">Disclaimer intégré</h4>
                           <p className="text-sm text-[#64748B] leading-relaxed">Chaque réponse inclut les sources et un rappel que ce n'est pas un avis médical.</p>
                        </div>
                     </div>

                  </div>

                  <div className="mt-12">
                     <Link href="/assistant" className="inline-flex justify-center items-center px-8 py-4 rounded-full text-base font-bold text-white bg-[#1A3A8F] hover:bg-[#152e72] shadow-lg shadow-[#1A3A8F]/20 transition-all w-full sm:w-auto">
                        Poser une question à Dr. Sehha →
                     </Link>
                  </div>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
}
