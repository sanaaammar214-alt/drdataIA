'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Database, Activity, ShieldAlert, Layers } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- DATA MOCKS ---

const kpiData = [
  { maladie: "Diabète", valeur: "10.6%", statut: "DEPASSE", tendance: "up", seuil: "10%" },
  { maladie: "Hypertension", valeur: "29.0%", statut: "CRITIQUE", tendance: "up", seuil: "25%" },
  { maladie: "Tuberculose", valeur: "96/100k", statut: "CRITIQUE", tendance: "down", seuil: "20/100k" },
  { maladie: "Cancer", valeur: "42%", statut: "DEPASSE", tendance: "up", seuil: "60%" },
  { maladie: "Maladies cardiovasc.", valeur: "118/100k", statut: "CRITIQUE", tendance: "down", seuil: "100/100k" }
];

const evolutionData = [
  { year: '2019', Diabète: 9.1, Hypertension: 24, Tuberculose: 105, Cancer: 35, Cardio: 130 },
  { year: '2020', Diabète: 9.5, Hypertension: 25, Tuberculose: 102, Cancer: 37, Cardio: 125 },
  { year: '2021', Diabète: 9.9, Hypertension: 26, Tuberculose: 100, Cancer: 39, Cardio: 122 },
  { year: '2022', Diabète: 10.3, Hypertension: 28, Tuberculose: 98, Cancer: 40, Cardio: 120 },
  { year: '2023', Diabète: 10.6, Hypertension: 29.0, Tuberculose: 96, Cancer: 42, Cardio: 118 },
];

const thresholdData = [
  { name: "Diabète (%)", Maroc: 10.6, OMS: 10 },
  { name: "Hypertension (%)", Maroc: 29.0, OMS: 25 },
  { name: "Cancer (%)", Maroc: 42, OMS: 60 },
];

const regionData = [
  { region: "Casablanca-Settat", diabete: 12.1, tuberculose: 89, risque: "CRITIQUE" },
  { region: "Rabat-Salé-Kénitra", diabete: 10.8, tuberculose: 76, risque: "DEPASSE" },
  { region: "Marrakech-Safi", diabete: 9.4, tuberculose: 112, risque: "DEPASSE" },
  { region: "Fès-Meknès", diabete: 11.2, tuberculose: 98, risque: "DEPASSE" },
  { region: "Tanger-Tétouan-Al H.", diabete: 8.9, tuberculose: 105, risque: "DEPASSE" },
  { region: "Souss-Massa", diabete: 9.1, tuberculose: 134, risque: "CRITIQUE" },
  { region: "Drâa-Tafilalet", diabete: 8.2, tuberculose: 121, risque: "DEPASSE" },
  { region: "Béni Mellal-Khénifra", diabete: 9.8, tuberculose: 108, risque: "DEPASSE" },
  { region: "L'Oriental", diabete: 10.1, tuberculose: 95, risque: "DEPASSE" },
  { region: "Laâyoune-Sakia El H.", diabete: 7.8, tuberculose: 78, risque: "OK" },
  { region: "Dakhla-Oued Ed-Dahab", diabete: 7.2, tuberculose: 65, risque: "OK" },
  { region: "Guelmim-Oued Noun", diabete: 8.5, tuberculose: 88, risque: "OK" },
];

const alertData = [
  { maladie: "Hypertension", indicateur: "Prévalence", maroc: "29.0%", oms: "25%", ecart: "+4.0 pts", statut: "CRITIQUE" },
  { maladie: "Tuberculose", indicateur: "Incidence", maroc: "96/100k", oms: "20/100k", ecart: "+76", statut: "CRITIQUE" },
  { maladie: "Cardiovasc.", indicateur: "Mortalité", maroc: "118/100k", oms: "100/100k", ecart: "+18", statut: "CRITIQUE" },
  { maladie: "Diabète", indicateur: "Prévalence", maroc: "10.6%", oms: "10%", ecart: "+0.6 pts", statut: "DEPASSE" },
  { maladie: "Cancer", indicateur: "Survie 5 ans", maroc: "42%", oms: "60%", ecart: "-18 pts", statut: "DEPASSE" },
];

const COLORS = {
  primary: "#00D4FF", // cyan accent
  critique: "#EF4444", // rouge
  depasse: "#F97316", // orange
  ok: "#22C55E", // vert
  gray: "#7A9CBD" // textmuted
};

const getStatusColor = (status: string) => {
  if (status === 'CRITIQUE') return COLORS.critique;
  if (status === 'DEPASSE') return COLORS.depasse;
  return COLORS.ok;
};

const getStatusClass = (status: string) => {
  if (status === 'CRITIQUE') return 'status-red';
  if (status === 'DEPASSE') return 'status-orange';
  return 'status-green';
};

// Custom tooltip for dark mode Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#101F38] border border-[#00D4FF]/20 p-3 rounded-md shadow-2xl">
        <p className="font-display font-bold text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name} : {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- COMPONENTS ---

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [regionFilter, setRegionFilter] = useState('Toutes les régions');
  const [yearFilter, setYearFilter] = useState('2023');

  const donutData = [
    { name: 'OK', value: 0, color: COLORS.ok },
    { name: 'DEPASSE', value: 2, color: COLORS.depasse },
    { name: 'CRITIQUE', value: 3, color: COLORS.critique },
  ];

  return (
    <div className="w-full relative z-10 font-sans min-h-[calc(100vh-73px)] pb-24">
      
      {/* HEADER & SLICERS */}
      <div className="bg-[#101F38]/90 backdrop-blur-md border-b border-[#00D4FF]/10 pt-6 px-8 pb-4 sticky top-[72px] z-40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
          <h1 className="text-3xl font-display font-extrabold text-[#E8F4FD] flex items-center tracking-tight">
             <Layers className="w-8 h-8 text-[#00D4FF] mr-3" />
             Cockpit Analytique
          </h1>
          <div className="flex space-x-4 bg-[#0B1E3E] p-2 rounded-lg border border-[#00D4FF]/20">
             <div className="flex flex-col">
                <label className="text-[10px] text-[#7A9CBD] font-display font-bold mb-1 uppercase tracking-wider">Année</label>
                <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="text-sm bg-[#152843] border border-[#00D4FF]/20 text-white rounded px-3 py-1 outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 transition-all">
                   {['2019', '2020', '2021', '2022', '2023'].map(y => <option key={y}>{y}</option>)}
                </select>
             </div>
             <div className="flex flex-col">
                <label className="text-[10px] text-[#7A9CBD] font-display font-bold mb-1 uppercase tracking-wider">Région</label>
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="text-sm bg-[#152843] border border-[#00D4FF]/20 text-white rounded px-3 py-1 outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 transition-all">
                   <option>Toutes les régions</option>
                   {regionData.map(r => <option key={r.region}>{r.region}</option>)}
                </select>
             </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex space-x-2 overflow-x-auto pb-1 hide-scrollbar">
          {[
            { id: 1, name: "Vue Nationale" },
            { id: 2, name: "Disparités Régionales" },
            { id: 3, name: "Alertes OMS" },
            { id: 4, name: "Pipeline Data" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-display font-bold uppercase tracking-wider text-[11px] rounded transition-all whitespace-nowrap 
                ${activeTab === tab.id ? 'bg-[#00D4FF] text-[#0B1E3E] shadow-[0_0_15px_rgba(0,212,255,0.3)]' : 'bg-[#152843] text-[#7A9CBD] border border-[#00D4FF]/10 hover:bg-[#101F38] hover:text-[#E8F4FD]'}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTENT SPACE */}
      <div className="p-4 sm:p-8">
        
        {/* ======================= TAB 1 ======================== */}
        {activeTab === 1 && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-[#E8F4FD]">Tendances Prioritaires · 2019-2023</h2>
             </div>
             
             {/* 5 KPI CARDS */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
               {kpiData.map((kpi, idx) => (
                  <div key={idx} className={`alert-data-card p-4 ${getStatusClass(kpi.statut)}`}>
                     <h3 className="font-display font-bold text-[13px] uppercase tracking-wider text-[#7A9CBD] mb-2">{kpi.maladie}</h3>
                     <div className="flex justify-between items-baseline mb-4">
                        <span className="text-3xl font-display font-[300] text-white tracking-tight">{kpi.valeur}</span>
                        {kpi.tendance === 'up' ? <TrendingUp className="w-5 h-5 text-[#EF4444]" /> : <TrendingDown className="w-5 h-5 text-[#22C55E]" />}
                     </div>
                     <div className="flex justify-between items-center mt-auto">
                        <span className="px-2 py-0.5 rounded text-[9px] font-display font-[800] uppercase tracking-wider items-center flex" style={{ backgroundColor: getStatusColor(kpi.statut) + '20', color: getStatusColor(kpi.statut), border: `1px solid ${getStatusColor(kpi.statut)}40` }}>
                           <span className="w-1.5 h-1.5 rounded-full mr-1.5 shadow-sm" style={{ backgroundColor: getStatusColor(kpi.statut), boxShadow: `0 0 5px ${getStatusColor(kpi.statut)}` }}></span>
                           {kpi.statut}
                        </span>
                        <span className="text-[10px] text-[#7A9CBD] opacity-70">Seuil: {kpi.seuil}</span>
                     </div>
                  </div>
               ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evolution globale */}
                <div className="lg:col-span-2 alert-data-card p-6">
                   <h3 className="font-display font-bold text-[#E8F4FD] mb-6 tracking-wide">Évolution quinquennale (Taux relatifs)</h3>
                   <div className="h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={evolutionData}>
                            <XAxis dataKey="year" stroke="#7A9CBD" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(0,212,255,0.1)' }} />
                            <YAxis stroke="#7A9CBD" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(0,212,255,0.1)' }} />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="Diabète" stroke={COLORS.depasse} strokeWidth={3} dot={{ fill: COLORS.depasse, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Hypertension" stroke={COLORS.critique} strokeWidth={3} dot={{ fill: COLORS.critique, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Cancer" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                         </LineChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Comparaison OMS */}
                <div className="alert-data-card p-6">
                   <h3 className="font-display font-bold text-[#E8F4FD] mb-6 tracking-wide">Écart vs Seuils OMS (2023)</h3>
                   <div className="h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={thresholdData} layout="vertical" margin={{ left: 10 }}>
                            <XAxis type="number" stroke="#7A9CBD" fontSize={11} axisLine={{ stroke: 'rgba(0,212,255,0.1)' }} tickLine={false} />
                            <YAxis dataKey="name" type="category" stroke="#7A9CBD" fontSize={11} width={90} axisLine={false} tickLine={false} />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Bar dataKey="Maroc" radius={[0, 4, 4, 0]} barSize={15}>
                               {thresholdData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.Maroc > entry.OMS ? COLORS.critique : COLORS.ok} />
                               ))}
                            </Bar>
                            <Bar dataKey="OMS" fill="#1e3a5f" radius={[0, 4, 4, 0]} barSize={15} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex gap-4 text-[10px] font-display text-[#7A9CBD] uppercase justify-center mt-2">
                       <span className="flex items-center"><span className="w-2 h-2 bg-[#1e3a5f] rounded-full mr-2"></span> Seuil OMS</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ======================= TAB 2 ======================== */}
        {activeTab === 2 && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-[#E8F4FD]">Cartographie Régionale d'Incidence</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* BarChart */}
                <div className="alert-data-card p-6 flex flex-col">
                   <h3 className="font-display font-bold text-[#E8F4FD] mb-6 tracking-wide">Incidence Tuberculose par Région (/100k)</h3>
                   <div className="h-[450px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart layout="vertical" data={regionData.sort((a,b)=>b.tuberculose-a.tuberculose)} margin={{ left: 50, right: 10 }}>
                            <XAxis type="number" stroke="#7A9CBD" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(0,212,255,0.1)' }} />
                            <YAxis dataKey="region" type="category" stroke="#E8F4FD" fontSize={10} width={130} tickLine={false} axisLine={false} />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Bar dataKey="tuberculose" name="Tuberculose" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={12} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Regional Data Table */}
                <div className="alert-data-card overflow-hidden flex flex-col">
                   <div className="px-6 py-5 border-b border-[#00D4FF]/10 bg-[#101F38]">
                      <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide">Analyse Multicritère Géographique</h3>
                   </div>
                   <div className="overflow-x-auto flex-1 h-[450px] overflow-y-auto hide-scrollbar">
                      <table className="w-full text-left text-sm text-[#E8F4FD]">
                         <thead className="text-[10px] text-[#7A9CBD] uppercase tracking-wider font-display bg-[#0B1E3E] sticky top-0 z-10 shadow-sm border-b border-[#00D4FF]/20">
                            <tr>
                               <th className="px-6 py-4">Région</th>
                               <th className="px-4 py-4">Diabète</th>
                               <th className="px-4 py-4">Tuberculose</th>
                               <th className="px-6 py-4 text-center">Niveau Risque</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-[#00D4FF]/5">
                            {regionData.map((reg) => (
                               <tr key={reg.region} className="hover:bg-[#101F38]/80 transition-colors">
                                  <td className="px-6 py-4 font-medium">{reg.region}</td>
                                  <td className="px-4 py-4 text-[#7A9CBD]">{reg.diabete}%</td>
                                  <td className="px-4 py-4 text-[#7A9CBD]">{reg.tuberculose}</td>
                                  <td className="px-6 py-4 text-center">
                                     <span className="px-2 py-1 rounded text-[9px] font-display font-bold uppercase tracking-wider inline-block w-24 border" style={{ backgroundColor: getStatusColor(reg.risque) + '20', color: getStatusColor(reg.risque), borderColor: getStatusColor(reg.risque) + '40' }}>
                                        {reg.risque}
                                     </span>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ======================= TAB 3 ======================== */}
        {activeTab === 3 && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-[#E8F4FD]">Matrice d'Alertes Sanitaires Actives</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Table conditionnelle */}
                <div className="lg:col-span-8 alert-data-card overflow-hidden">
                   <div className="px-6 py-5 border-b border-[#00D4FF]/10 bg-[#101F38] flex items-center">
                      <ShieldAlert className="w-5 h-5 text-[#EF4444] mr-3" />
                      <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide">Détections Algorithmiques de Seuils</h3>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-[#E8F4FD]">
                         <thead className="text-[10px] text-[#7A9CBD] uppercase tracking-wider font-display bg-[#0B1E3E] border-b border-[#00D4FF]/20">
                            <tr>
                               <th className="px-6 py-4">Maladie</th>
                               <th className="px-4 py-4">Indicateur</th>
                               <th className="px-4 py-4 font-bold text-[#00D4FF]">Constat 2023</th>
                               <th className="px-4 py-4">Alerte Sécu. OMS</th>
                               <th className="px-6 py-4">Différentiel</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-[#00D4FF]/5">
                            {alertData.map((row) => (
                               <tr key={row.maladie} style={{ backgroundColor: getStatusColor(row.statut) + '0A' }} className="border-l-4 transition-colors hover:bg-black/20" style={{borderLeftColor: getStatusColor(row.statut)}}>
                                  <td className="px-6 py-4 font-bold">{row.maladie}</td>
                                  <td className="px-4 py-4 text-[#7A9CBD]">{row.indicateur}</td>
                                  <td className="px-4 py-4 font-display font-bold text-[16px]" style={{ color: getStatusColor(row.statut) }}>{row.maroc}</td>
                                  <td className="px-4 py-4 text-[#7A9CBD]">{row.oms}</td>
                                  <td className="px-6 py-4 font-medium">{row.ecart}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Donut and Gauges */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                   <div className="alert-data-card p-6 flex flex-col items-center justify-center">
                      <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide w-full text-left mb-4">Répartition des Statuts</h3>
                      <div className="h-[180px] w-full relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                               <Pie data={donutData} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                                  {donutData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                               </Pie>
                               <RechartsTooltip content={<CustomTooltip />} />
                            </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="font-display font-bold text-3xl text-white">5</span>
                         </div>
                      </div>
                      <div className="flex gap-4 text-[10px] font-display font-bold uppercase tracking-wider text-[#7A9CBD] mt-2">
                         <span className="flex items-center"><span className="w-2.5 h-2.5 bg-[#EF4444] rounded-sm mr-2 shadow-[0_0_5px_#EF4444]"></span> Critique (3)</span>
                         <span className="flex items-center"><span className="w-2.5 h-2.5 bg-[#F97316] rounded-sm mr-2 shadow-[0_0_5px_#F97316]"></span> Dépassé (2)</span>
                         <span className="flex items-center"><span className="w-2.5 h-2.5 bg-[#22C55E] rounded-sm mr-2 shadow-[0_0_5px_#22C55E]"></span> Ok (0)</span>
                      </div>
                   </div>

                   <div className="alert-data-card p-6 status-blue flex-1">
                      <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide mb-5">Mesures Correctives OMS</h3>
                      <ul className="space-y-4 text-sm text-[#E8F4FD]">
                         <li className="flex gap-3 bg-[#101F38] p-3 border border-[#EF4444]/20 rounded-lg">
                           <ShieldAlert className="w-5 h-5 text-[#EF4444] shrink-0" />
                           <span className="leading-relaxed"><b>Tuberculose :</b> Renforcer immédiatement le programme PNLT, dépistage actif.</span>
                         </li>
                         <li className="flex gap-3 bg-[#101F38] p-3 border border-[#EF4444]/20 rounded-lg">
                           <ShieldAlert className="w-5 h-5 text-[#EF4444] shrink-0" />
                           <span className="leading-relaxed"><b>Hypertension :</b> Campagnes drastiques de prévention, urgence de réduction sel.</span>
                         </li>
                         <li className="flex gap-3 bg-[#101F38] p-3 border border-[#EF4444]/20 rounded-lg">
                           <ShieldAlert className="w-5 h-5 text-[#EF4444] shrink-0" />
                           <span className="leading-relaxed"><b>Cardio :</b> Promotion vitale de l'activité physique, révision de l'alimentation.</span>
                         </li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ======================= TAB 4 ======================== */}
        {activeTab === 4 && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-[#E8F4FD]">Diagnostic Pipeline Data</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Schema Flux */}
                <div className="alert-data-card p-8">
                   <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide mb-8 flex items-center"><Activity className="w-5 h-5 mr-3 text-[#00D4FF]" /> Schéma Data-Flow Architectural</h3>
                   
                   <div className="flex flex-col items-center gap-3">
                      <div className="bg-[#101F38] border border-[#7A9CBD]/30 p-4 rounded-xl w-full text-center text-sm shadow-md">
                         <span className="font-display font-bold text-white tracking-widest text-[11px] uppercase block mb-1">Sources Brutes Officielles</span>
                         <span className="text-[#7A9CBD]">DELM · OMS Maroc · HCP/ENPS</span>
                      </div>
                      <div className="h-6 w-[1px] bg-[#00D4FF] opacity-50 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF] animate-pulseDot"></div>
                      </div>
                      <div className="bg-[#101F38] border border-[#8b5cf6]/50 p-4 rounded-xl w-64 text-center text-sm shadow-md">
                         <span className="font-bold text-[#8b5cf6]">Extraction OCR / Parsing IA</span>
                      </div>
                      <div className="h-6 w-[1px] bg-[#00D4FF] opacity-50"></div>
                      <div className="bg-[#101F38] border border-[#22C55E]/50 p-4 rounded-xl w-full text-center text-sm shadow-md">
                         <span className="font-display font-bold text-[#4ade80] tracking-widest text-[11px] uppercase block mb-1">Dépôt Structuré</span>
                         Google Sheets (Data Lake Opérationnel)
                      </div>
                      <div className="flex h-6">
                         <div className="w-[1px] h-full bg-[#00D4FF] opacity-50 transform -rotate-[30deg] translate-x-[40px] translate-y-3"></div>
                         <div className="w-[1px] h-full bg-[#00D4FF] opacity-50 transform rotate-[30deg] -translate-x-[40px] translate-y-3"></div>
                      </div>
                      <div className="flex w-full gap-4 justify-center mt-3">
                         <div className="bg-[#101F38] border border-[#F97316]/50 p-4 flex-1 rounded-xl text-center shadow-md">
                           <span className="font-display font-bold text-[#fb923c] tracking-widest text-[11px] uppercase block">Automatisations n8n</span>
                         </div>
                         <div className="bg-[#101F38] border border-[#00D4FF]/50 p-4 flex-1 rounded-xl text-center shadow-md">
                           <span className="font-display font-bold text-[#00D4FF] tracking-widest text-[11px] uppercase block">Modéles LLM (GPT-4)</span>
                         </div>
                      </div>
                      <div className="flex h-6 mt-1">
                         <div className="w-[1px] h-full bg-[#00D4FF] opacity-50 transform rotate-[30deg] translate-x-[40px] -translate-y-3"></div>
                         <div className="w-[1px] h-full bg-[#00D4FF] opacity-50 transform -rotate-[30deg] -translate-x-[40px] -translate-y-3"></div>
                      </div>
                      <div className="bg-[#0B1E3E] text-white p-5 border border-[#00D4FF] rounded-xl w-full text-center font-display font-bold shadow-[0_0_20px_rgba(0,212,255,0.15)] mt-[-10px] z-10 relative overflow-hidden">
                         <div className="absolute top-0 left-0 right-0 shimmer-line pointer-events-none"></div>
                         BOTPRESS & SEHHA DASHBOARD
                      </div>
                   </div>
                </div>

                {/* Scorecard & Structure */}
                <div className="flex flex-col gap-6">
                   <div className="alert-data-card p-6 status-blue">
                      <h3 className="font-display font-bold text-[#E8F4FD] tracking-wide mb-5 flex items-center"><Database className="w-5 h-5 mr-3 text-[#00D4FF]" /> Structure Data Tables</h3>
                      <table className="w-full text-sm">
                         <tbody className="divide-y divide-[#00D4FF]/10 text-[#E8F4FD]">
                            <tr className="hover:bg-[#101F38]"><td className="py-3 px-2 font-display font-bold text-[11px] uppercase tracking-wider text-[#7A9CBD]">Données_brutes</td><td className="py-3 px-2 opacity-80">source | région | maladie | an | val</td></tr>
                            <tr className="hover:bg-[#101F38]"><td className="py-3 px-2 font-display font-bold text-[11px] uppercase tracking-wider text-[#7A9CBD]">Indicateurs</td><td className="py-3 px-2 opacity-80">taux | mortalité | couverture</td></tr>
                            <tr className="hover:bg-[#101F38]"><td className="py-3 px-2 font-display font-bold text-[11px] uppercase tracking-wider text-[#7A9CBD]">Tendances</td><td className="py-3 px-2 opacity-80">évolution 5 ans (calculs)</td></tr>
                            <tr className="hover:bg-[#101F38]"><td className="py-3 px-2 font-display font-bold text-[11px] uppercase tracking-wider text-[#EF4444]">Alertes</td><td className="py-3 px-2 text-[#f87171]">seuils épidémiques dépassés</td></tr>
                         </tbody>
                      </table>
                   </div>

                   <div className="alert-data-card p-6 status-orange bg-[#F97316]/5">
                      <h3 className="font-display font-bold text-[#fb923c] tracking-wide mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-3" /> Risques Éthiques & Biais</h3>
                      <ul className="text-sm text-[#E8F4FD] space-y-3 opacity-90">
                         <li className="flex items-start">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 mr-2 shrink-0"></span>
                           <div><b className="text-[#fb923c]">Déclaration :</b> Sous-déclaration massive potentielle dans les DR de santé en zones rurales.</div>
                         </li>
                         <li className="flex items-start">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 mr-2 shrink-0"></span>
                           <div><b className="text-[#fb923c]">Disponibilité :</b> Latence forte de publication des bulletins régionaux.</div>
                         </li>
                         <li className="flex items-start">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 mr-2 shrink-0"></span>
                           <div><b className="text-[#fb923c]">Causalité :</b> Une hausse de détection (dépistage actif) peut gonfler l'incidence apparente face aux anciennes données.</div>
                         </li>
                      </ul>
                   </div>
                </div>

             </div>
          </div>
        )}

      </div>
    </div>
  );
}
