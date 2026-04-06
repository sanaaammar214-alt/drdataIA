'use client';

import { Bot, Zap, Globe, ShieldCheck } from 'lucide-react';

export default function AssistantPage() {
  return (
    <div className="w-full min-h-[calc(100vh-73px)] relative z-10 py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#4ade80] font-display text-[10px] font-bold mb-6 uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] mr-2 shadow-[0_0_8px_#22C55E] animate-pulseDot"></span>
            Accès Illimité — Système Actif
          </div>
          <h1 className="font-display font-[800] text-4xl lg:text-6xl text-[#E8F4FD] tracking-[-1.5px] mb-5">
            Parlez à <span className="text-[#00D4FF]">Dr. Sehha</span>
          </h1>
          <p className="text-lg text-[#7A9CBD] max-w-2xl mx-auto leading-relaxed">
            Posez vos questions sur la situation épidémiologique marocaine.
            Notre IA Chain-of-Thought vous répond avec les données officielles DELM · OMS · HCP.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Zap, label: "Questions posées", value: "∞", color: "#00D4FF" },
            { icon: Globe, label: "Régions couvertes", value: "12", color: "#22C55E" },
            { icon: ShieldCheck, label: "Données sécurisées", value: "100%", color: "#8b5cf6" },
          ].map((stat, i) => (
            <div key={i} className="alert-data-card p-5 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
              <div className="font-display font-[800] text-2xl text-white tracking-tight">{stat.value}</div>
              <div className="font-display text-[10px] uppercase tracking-wider text-[#7A9CBD] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Botpress iframe container */}
        <div className="alert-data-card status-blue overflow-hidden">
          <div className="px-6 py-5 border-b border-[#00D4FF]/10 bg-[#101F38] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#E8F4FD] tracking-wide text-sm">Dr. Sehha — Assistant Médical IA</div>
                <div className="font-display text-[9px] uppercase tracking-wider text-[#7A9CBD] mt-0.5">Modèle épidémiologique · Maroc 2019-2023</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulseDot"></span>
              <span className="font-display text-[9px] font-bold uppercase tracking-wider text-[#4ade80]">En ligne</span>
            </div>
          </div>

          {/* Bot Widget Area */}
          <div className="relative w-full h-[540px] bg-[#0B1E3E] flex items-center justify-center overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_80%_50%_at_center,_rgba(0,212,255,0.04)_0%,_transparent_100%)]"></div>

            {/* Placeholder — remplacer par votre script Botpress */}
            <div className="relative z-10 text-center max-w-lg px-8">
              <div className="w-24 h-24 rounded-full bg-[#152843] border border-[#00D4FF]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                <Bot className="w-12 h-12 text-[#00D4FF]/60" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#E8F4FD] mb-3 tracking-tight">
                Widget Botpress Prêt à Intégrer
              </h3>
              <p className="text-[#7A9CBD] text-sm leading-relaxed mb-8">
                Insérez votre script d'injection Botpress ci-dessous pour activer le chat IA interactif.
                Le professeur et les utilisateurs pourront poser des questions en illimité.
              </p>
              <div className="bg-[#152843] border border-[#00D4FF]/15 rounded-xl p-4 text-left font-mono text-xs text-[#00D4FF]/70 mb-8 overflow-x-auto">
                <span className="text-[#7A9CBD]">{'// Remplacer par votre script Botpress :'}</span><br/>
                <span className="text-[#F97316]">{'<script'}</span> <span className="text-[#22C55E]">src</span>=<span className="text-[#E8F4FD]">"https://cdn.botpress.cloud/webchat/v2/..."</span> <span className="text-[#F97316]">{'>'}</span>
              </div>
              <a
                href="https://botpress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D4FF] text-[#0B1E3E] font-display font-bold text-sm hover:bg-white transition-all glow-box transform hover:-translate-y-0.5"
              >
                <Globe className="w-4 h-4" />
                Configurer Botpress →
              </a>
            </div>
          </div>
        </div>

        {/* Info disclaimer */}
        <div className="mt-6 bg-[#EF4444]/5 border border-[#EF4444]/15 rounded-xl p-4 text-center">
          <p className="text-[#f87171] text-xs font-medium">
            ⚠️ Les réponses de Dr. Sehha sont basées sur des données épidémiologiques officielles et ne constituent pas un avis médical.
            En cas d'urgence, appelez le <strong>080 100 47 47</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
