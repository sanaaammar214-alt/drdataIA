'use client';

import Link from 'next/link';
import { Bot, Check, AlertTriangle, ShieldCheck, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full text-[#E8F4FD] font-sans overflow-x-hidden relative">
      
      {/* ======================= SECTION 2 — HERO ======================== */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
              
              {/* --- Colonne gauche : TEXTE --- */}
              <div className="max-w-xl">
                 <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-display text-[10px] font-bold mb-8 uppercase tracking-[0.25em]">
                    IA · Santé Publique · Maroc
                 </div>
                 
                 <h1 className="font-display text-5xl lg:text-7xl font-[800] tracking-[-1.5px] leading-[1.05] mb-8 text-[#E8F4FD]">
                    Rencontrez <br />
                    <span className="text-[#00D4FF]">Dr. Sehha</span><br />
                    Votre assistant IA.
                 </h1>
                 
                 <div className="flex items-center mb-10 bg-[#152843]/50 border border-[#00D4FF]/10 rounded-full px-4 py-2 w-fit">
                    <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulseDot mr-3 shadow-[0_0_8px_#22C55E]"></span>
                    <span className="font-display text-[11px] font-bold text-[#E8F4FD] uppercase tracking-[0.1em]">Système de surveillance Actif</span>
                 </div>
                 
                 <ul className="space-y-5 mb-12">
                    <li className="flex items-center">
                       <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mr-4 shrink-0">
                         <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                       </div>
                       <span className="text-[16px] font-medium text-[#E8F4FD]">Données officielles DELM · OMS · HCP</span>
                    </li>
                    <li className="flex items-center">
                       <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mr-4 shrink-0">
                         <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                       </div>
                       <span className="text-[16px] font-medium text-[#E8F4FD]">Alertes OMS automatiques en temps réel</span>
                    </li>
                    <li className="flex items-center">
                       <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mr-4 shrink-0">
                         <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                       </div>
                       <span className="text-[16px] font-medium text-[#E8F4FD]">Rapports citoyens générés par IA</span>
                    </li>
                 </ul>
                 
                 <div className="flex flex-col sm:flex-row gap-5 mb-10">
                    <Link href="/assistant" className="inline-flex justify-center items-center px-8 py-4 rounded-full text-[15px] font-display font-bold text-[#0B1E3E] bg-[#00D4FF] hover:bg-white hover:text-[#0B1E3E] glow-box transition-all transform hover:-translate-y-1">
                       Démarrer l'analyse →
                    </Link>
                    <Link href="/dashboard" className="inline-flex justify-center items-center px-8 py-4 rounded-full border border-[#00D4FF]/20 text-[15px] font-display font-bold text-[#E8F4FD] hover:bg-[#152843] transition-all transform hover:-translate-y-1">
                       Voir le dashboard
                    </Link>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-3 text-[10px] font-display font-bold text-[#7A9CBD] uppercase tracking-[0.2em]">
                    <span>Min. Santé</span>
                    <span className="w-1 h-1 bg-[#00D4FF] rounded-full opacity-50"></span>
                    <span>OMS Maroc</span>
                    <span className="w-1 h-1 bg-[#00D4FF] rounded-full opacity-50"></span>
                    <span>HCP / ENPS</span>
                 </div>
              </div>

              {/* --- Colonne droite : VISUEL & CARTES --- */}
              <div className="relative flex justify-center items-center h-[450px] sm:h-[550px] mt-10 lg:mt-0">
                 
                 {/* Anneau Dashed Tournant et Mascotte */}
                 <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] dashed-ring animate-rotateDash z-0 pointer-events-none opacity-40"></div>
                 
                 <div className="relative z-10 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#00D4FF]/20 bg-[radial-gradient(ellipse_at_center,_#152843_0%,_#0B1E3E_100%)] flex items-center justify-center overflow-hidden shadow-2xl">
                    <img src="/mascotte.png" alt="Dr. Sehha" className="w-full h-full object-cover relative z-20 opacity-90"
                         onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.querySelector('.fallback-icon')!.classList.remove('hidden');
                         }}
                    />
                    <Bot className="fallback-icon hidden w-32 h-32 sm:w-40 sm:h-40 text-[#00D4FF]/50 relative z-20 filter drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
                 </div>

                 {/* FLOATING CARDS */}
                 
                 {/* Card 1: Alert Critique */}
                 <div className="absolute top-4 sm:top-8 -left-4 sm:-left-12 z-30 float-card p-4 sm:p-5 flex items-center animate-floatA w-64 sm:w-72">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                       </div>
                       <div>
                          <div className="font-display font-bold text-[#E8F4FD] text-[15px] mb-1 tracking-tight">Tuberculose</div>
                          <div className="text-[13px] text-[#7A9CBD] mb-2 font-medium">96/100k → Seuil OMS 20</div>
                          <div className="inline-flex px-2 py-1 rounded bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#f87171] text-[9px] font-display font-[800] uppercase tracking-wider items-center shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mr-1.5 animate-pulseDot"></span>CRITIQUE
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Card 2: AI Response */}
                 <div className="absolute top-[45%] -right-8 sm:-right-20 z-30 float-card p-4 sm:p-5 flex items-start gap-4 w-72 sm:w-80 animate-floatB">
                    <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
                       <Bot className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                       <div className="font-display font-bold text-[#E8F4FD] text-[15px] mb-2 tracking-tight">Dr. Sehha répond</div>
                       <div className="text-[13px] text-[#7A9CBD] font-medium leading-relaxed border-l-2 border-[#00D4FF]/20 pl-3">
                          "Le diabète au Maroc a affiché une hausse de +20% en 5 ans..."
                       </div>
                    </div>
                 </div>

                 {/* Card 3: Status En Ligne */}
                 <div className="absolute -bottom-2 sm:-bottom-8 left-6 sm:left-12 z-30 float-card p-4 flex items-center gap-4 w-56 sm:w-64 animate-floatC">
                    <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                       <Check className="w-5 h-5 text-[#4ade80]" />
                    </div>
                    <div>
                       <div className="font-display font-bold text-[#E8F4FD] text-[15px] mb-1 tracking-tight">Base de données</div>
                       <div className="inline-flex px-2 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#4ade80] text-[9px] font-display font-[800] uppercase tracking-wider items-center mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1.5 shadow-[0_0_8px_#22C55E]"></span>EN LIGNE
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ======================= QUOTE / BANNER SECTION ======================== */}
      <section className="relative z-10 w-full bg-[#101F38] border-t border-[#00D4FF]/10 py-24 my-10">
         <div className="absolute top-[-1px] left-0 right-0 shimmer-line"></div>
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <Quote className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 text-[#00D4FF] opacity-15" />
            <h2 className="font-display font-[700] text-3xl md:text-5xl text-white leading-tight mb-8 relative z-10 tracking-tight">
               "L'intelligence artificielle transforme des PDF illisibles en vies sauvées."
            </h2>
            <div className="font-sans text-[12px] text-[#7A9CBD] uppercase tracking-[0.1em] font-bold">
               MISSION SEHHA DATA
            </div>
         </div>
      </section>

      {/* ======================= PIPELINE & DATACARDS ======================== */}
      <section className="relative z-10 py-24 pb-32 w-full">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#152843] border border-[#00D4FF]/10 text-[#7A9CBD] font-display text-[10px] font-bold mb-6 uppercase tracking-[0.2em]">
                  Moteur d'analyse
               </div>
               <h2 className="font-display font-[800] text-4xl md:text-5xl text-[#E8F4FD] tracking-tight mb-6 relative">
                  Conçu pour l'exigence médicale.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               
               {/* Card 1 */}
               <div className="alert-data-card status-blue p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center mb-6">
                     <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="font-display text-[16px] font-[700] text-white mb-3">Données Officielles</h3>
                  <p className="text-[14px] text-[#7A9CBD] leading-relaxed mb-6">
                     Extraction automatisée des bulletins PDF mensuels du Ministère 
                     de la Santé pour garantir la justesse.
                  </p>
                  <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-auto">
                     <div className="w-full bg-gradient-to-r from-transparent to-[#00D4FF] h-full opacity-60"></div>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="alert-data-card status-green p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mb-6">
                     <AlertTriangle className="w-5 h-5 text-[#4ade80]" />
                  </div>
                  <h3 className="font-display text-[16px] font-[700] text-white mb-3">Détection Seuils OMS</h3>
                  <p className="text-[14px] text-[#7A9CBD] leading-relaxed mb-6">
                     Comparaison mathématique instantanée avec les seuils dangereux 
                     mondiaux. Alertes visuelles.
                  </p>
                  <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-auto">
                     <div className="w-full bg-gradient-to-r from-transparent to-[#22C55E] h-full opacity-60"></div>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="alert-data-card status-orange p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center mb-6">
                     <Bot className="w-5 h-5 text-[#fb923c]" />
                  </div>
                  <h3 className="font-display text-[16px] font-[700] text-white mb-3">Assistant LLM</h3>
                  <p className="text-[14px] text-[#7A9CBD] leading-relaxed mb-6">
                     Un modèle de langage (GPT-4o) avec Chain-of-Thought
                     pour interpréter l'épidémiologie simplement.
                  </p>
                  <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-auto">
                     <div className="w-full bg-gradient-to-r from-transparent to-[#F97316] h-full opacity-60"></div>
                  </div>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
}
