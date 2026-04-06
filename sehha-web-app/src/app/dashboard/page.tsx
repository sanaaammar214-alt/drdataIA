'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Database, Activity, ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

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
  primary: "#0ea5e9", // bleu médical
  critique: "#ef4444", // rouge
  depasse: "#f97316", // orange
  ok: "#22c55e", // vert
  gray: "#94a3b8"
};

const getStatusColor = (status: string) => {
  if (status === 'CRITIQUE') return COLORS.critique;
  if (status === 'DEPASSE') return COLORS.depasse;
  return COLORS.ok;
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
    <div className="bg-[#f3f4f6]" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* HEADER & SLICERS */}
      <div className="bg-white border-b border-gray-200 shadow-sm pt-6 px-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
             <Layers className="w-8 h-8 text-[#0ea5e9] mr-3" />
             SEHHA DATA صحة داتا
          </h1>
          <div className="flex space-x-4 bg-gray-50 p-2 rounded-lg border border-gray-200">
             <div className="flex flex-col">
                <label className="text-xs text-gray-500 font-semibold mb-1 uppercase">Année</label>
                <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="text-sm bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#0ea5e9]">
                   {['2019', '2020', '2021', '2022', '2023'].map(y => <option key={y}>{y}</option>)}
                </select>
             </div>
             <div className="flex flex-col">
                <label className="text-xs text-gray-500 font-semibold mb-1 uppercase">Région</label>
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="text-sm bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#0ea5e9]">
                   <option>Toutes les régions</option>
                   {regionData.map(r => <option key={r.region}>{r.region}</option>)}
                </select>
             </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto pb-px">
          {[
            { id: 1, name: "Vue Nationale" },
            { id: 2, name: "Disparités Régionales" },
            { id: 3, name: "Alertes OMS" },
            { id: 4, name: "Pipeline Data" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTENT SPACE */}
      <div className="p-8 min-h-[calc(100vh-280px)]">
        
        {/* ======================= TAB 1 ======================== */}
        {activeTab === 1 && (
          <div className="animate-in fade-in duration-300">
             <div className="mb-6 flex justify-between items-end">
                <h2 className="text-xl font-bold text-gray-800">Top 5 Maladies Prioritaires · Maroc 2019-2023</h2>
             </div>
             
             {/* 5 KPI CARDS */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
               {kpiData.map((kpi, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderColor: getStatusColor(kpi.statut) }}>
                     <h3 className="text-sm font-semibold text-gray-500 mb-2">{kpi.maladie}</h3>
                     <div className="flex justify-between items-baseline mb-2">
                        <span className="text-2xl font-bold text-gray-800">{kpi.valeur}</span>
                        {kpi.tendance === 'up' ? <TrendingUp className="w-5 h-5 text-red-500" /> : <TrendingDown className="w-5 h-5 text-green-500" />}
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="px-2 py-1 rounded font-bold text-white" style={{ backgroundColor: getStatusColor(kpi.statut) }}>
                           {kpi.statut}
                        </span>
                        <span className="text-gray-400">Seuil: {kpi.seuil}</span>
                     </div>
                  </div>
               ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evolution globale */}
                <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="text-md font-bold mb-4 text-gray-700">Évolution 5 ans 2019→2023 (Taux relatifs)</h3>
                   <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={evolutionData}>
                            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="Diabète" stroke={COLORS.depasse} strokeWidth={2} />
                            <Line type="monotone" dataKey="Hypertension" stroke={COLORS.critique} strokeWidth={2} />
                            <Line type="monotone" dataKey="Cancer" stroke="#8b5cf6" strokeWidth={2} />
                         </LineChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Comparaison OMS */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="text-md font-bold mb-4 text-gray-700">Comparaison Maroc vs Seuil OMS 2023</h3>
                   <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={thresholdData} layout="vertical" margin={{ left: -10 }}>
                            <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                            <RechartsTooltip />
                            <Bar dataKey="Maroc" radius={[0, 4, 4, 0]}>
                               {thresholdData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.Maroc > entry.OMS ? COLORS.critique : COLORS.ok} />
                               ))}
                            </Bar>
                            <Bar dataKey="OMS" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ======================= TAB 2 ======================== */}
        {activeTab === 2 && (
          <div className="animate-in fade-in duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Disparités Régionales — 12 Régions Administratives Maroc</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Simulated Choropleth with Tiles & BarChart */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                   <h3 className="text-md font-bold mb-4 text-gray-700">Incidence Tuberculose & Diabète par région</h3>
                   <div className="h-[450px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart layout="vertical" data={regionData.sort((a,b)=>b.tuberculose-a.tuberculose)} margin={{ left: 30 }}>
                            <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                            <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={11} width={120} />
                            <RechartsTooltip />
                            <Bar dataKey="tuberculose" name="Tuberculose (/100k)" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Regional Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                   <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-md font-bold text-gray-700">Données détaillées par région</h3>
                   </div>
                   <div className="overflow-x-auto flex-1 h-[450px] overflow-y-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                         <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                            <tr>
                               <th className="px-4 py-3">Région</th>
                               <th className="px-4 py-3">Diabète (%)</th>
                               <th className="px-4 py-3">Tuberculose</th>
                               <th className="px-4 py-3 text-center">Risque global</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {regionData.map((reg) => (
                               <tr key={reg.region} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 font-medium text-gray-800">{reg.region}</td>
                                  <td className="px-4 py-3">{reg.diabete}</td>
                                  <td className="px-4 py-3">{reg.tuberculose}/100k</td>
                                  <td className="px-4 py-3 text-center">
                                     <span className="px-2 py-1 rounded text-xs font-bold text-white w-20 inline-block text-center" style={{ backgroundColor: getStatusColor(reg.risque) }}>
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
          <div className="animate-in fade-in duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Tableau de Bord Alertes — Seuils OMS</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Table conditionnelle */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                   <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
                      <ShieldAlert className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="text-md font-bold text-gray-700">Alertes actives</h3>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                         <thead className="text-xs text-gray-500 uppercase bg-white">
                            <tr>
                               <th className="px-4 py-3">Maladie</th>
                               <th className="px-4 py-3">Indicateur</th>
                               <th className="px-4 py-3 font-bold text-gray-900">Valeur 2023</th>
                               <th className="px-4 py-3">Seuil OMS</th>
                               <th className="px-4 py-3">Écart</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {alertData.map((row) => (
                               <tr key={row.maladie} style={{ backgroundColor: getStatusColor(row.statut) + '1A' }} className="border-l-4" style={{borderLeftColor: getStatusColor(row.statut), backgroundColor: getStatusColor(row.statut) + '1A'}}>
                                  <td className="px-4 py-3 font-bold text-gray-800">{row.maladie}</td>
                                  <td className="px-4 py-3">{row.indicateur}</td>
                                  <td className="px-4 py-3 font-extrabold" style={{ color: getStatusColor(row.statut) }}>{row.maroc}</td>
                                  <td className="px-4 py-3 text-gray-500">{row.oms}</td>
                                  <td className="px-4 py-3 font-semibold">{row.ecart}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Donut and Gauges */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                   <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
                      <h3 className="text-md font-bold mb-2 text-gray-700 w-full text-left">Répartition statuts OMS</h3>
                      <div className="h-[150px] w-full relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                               <Pie data={donutData} innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                                  {donutData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                               </Pie>
                               <RechartsTooltip />
                            </PieChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="flex gap-4 text-xs font-semibold text-gray-600">
                         <span className="flex items-center"><span className="w-3 h-3 bg-[#ef4444] rounded-full mr-1"></span> CRITIQUE (3)</span>
                         <span className="flex items-center"><span className="w-3 h-3 bg-[#f97316] rounded-full mr-1"></span> DEPASSE (2)</span>
                         <span className="flex items-center"><span className="w-3 h-3 bg-[#22c55e] rounded-full mr-1"></span> OK (0)</span>
                      </div>
                   </div>

                   <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-md font-bold mb-3 text-gray-700">Recommandations OMS</h3>
                      <ul className="space-y-3 text-sm text-gray-600">
                         <li className="flex gap-2">
                           <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                           <span><b>Tuberculose :</b> Renforcer le programme PNLT, dépistage actif.</span>
                         </li>
                         <li className="flex gap-2">
                           <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                           <span><b>Hypertension :</b> Campagnes de prévention, réduction sel.</span>
                         </li>
                         <li className="flex gap-2">
                           <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                           <span><b>Cardiovasculaires :</b> Promotion activité physique, alimentation.</span>
                         </li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ======================= TAB 4 ======================== */}
        {activeTab === 4 && (
          <div className="animate-in fade-in duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Architecture Pipeline SEHHA DATA</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Schema Flux */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="text-md font-bold mb-6 text-gray-700 flex items-center"><Activity className="w-5 h-5 mr-2 text-[#0ea5e9]" /> Schéma flux de données</h3>
                   
                   <div className="flex flex-col items-center gap-2">
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg w-full text-center">
                         <b>Sources officielles</b> (DELM, OMS, HCP/ENPS)
                      </div>
                      <div className="h-4 w-0.5 bg-gray-300"></div>
                      <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg w-64 text-center">
                         🤖 Extraction IA (OCR / Parsing)
                      </div>
                      <div className="h-4 w-0.5 bg-gray-300"></div>
                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg w-full text-center">
                         <b>Google Sheets</b> (Base de données structurée)
                      </div>
                      <div className="h-4 w-0.5 bg-gray-300"></div>
                      <div className="flex w-full gap-4 justify-center">
                         <div className="bg-orange-50 border border-orange-200 p-3 flex-1 rounded-lg text-center font-bold">n8n / Automatisations</div>
                         <div className="bg-slate-100 border border-slate-300 p-3 flex-1 rounded-lg text-center font-bold">Modèles LLM</div>
                      </div>
                      <div className="flex gap-16 mt-1">
                         <div className="h-4 w-0.5 bg-gray-300"></div>
                         <div className="h-4 w-0.5 bg-gray-300"></div>
                      </div>
                      <div className="bg-gray-800 text-white p-4 rounded-lg w-full text-center font-bold shadow-md">
                         BOTPRESS & SEHHA DASHBOARD
                      </div>
                   </div>
                </div>

                {/* Scorecard & Structure */}
                <div className="flex flex-col gap-6">
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-md font-bold mb-4 text-gray-700 flex items-center"><Database className="w-5 h-5 mr-2 text-[#0ea5e9]" /> Structure Google Sheets</h3>
                      <table className="w-full text-sm">
                         <tbody className="divide-y divide-gray-100 text-gray-600">
                            <tr><td className="py-2 font-semibold">Données_brutes</td><td className="py-2">source | région | maladie | année | valeur</td></tr>
                            <tr><td className="py-2 font-semibold">Indicateurs</td><td className="py-2">taux | mortalité | couverture</td></tr>
                            <tr><td className="py-2 font-semibold">Tendances</td><td className="py-2">évolution 5 ans (calculs)</td></tr>
                            <tr><td className="py-2 font-semibold text-red-500">Alertes</td><td className="py-2 text-red-500">seuils dépassés automatisément détectés</td></tr>
                         </tbody>
                      </table>
                   </div>

                   <div className="bg-[#fffbeb] p-6 rounded-xl shadow-sm border border-[#fef3c7]">
                      <h3 className="text-md font-bold mb-3 text-orange-800 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Éthique & Limites (Biais)</h3>
                      <ul className="text-sm text-orange-900 space-y-2">
                         <li><b>⚠️ Biais déclaration :</b> sous-déclaration flagrante en zones rurales.</li>
                         <li><b>⚠️ Biais disponibilité :</b> disparités des données selon les DR Santé.</li>
                         <li><b>⚠️ Biais causalité :</b> une hausse de détection (meilleur dépistage) peut être confondue avec une hausse d'incidence.</li>
                      </ul>
                   </div>
                </div>

             </div>
          </div>
        )}

      </div>

      {/* FOOTER DASHBOARD */}
      <div className="bg-slate-800 text-slate-300 text-xs py-4 px-8 flex flex-col md:flex-row justify-between items-center fixed bottom-0 w-full z-50">
        <p>Sources : DELM · Ministère de la Santé · OMS Bureau Maroc · HCP/ENPS. <i className="opacity-70">Ces données ne constituent pas un avis médical.</i></p>
        <p className="font-semibold text-[#0ea5e9]">Ministère de la Santé : www.sante.gov.ma · Numéro vert : 080 100 47 47</p>
      </div>

    </div>
  );
}
