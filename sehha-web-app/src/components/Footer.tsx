import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Colonne Logo */}
          <div className="md:col-span-1">
             <div className="flex flex-col items-start leading-tight mb-6">
                <span className="font-bold text-2xl text-white tracking-tight">SEHHA DATA</span>
                <span className="text-xs font-medium text-[#00D4FF] tracking-widest">صحة داتا</span>
             </div>
             <p className="text-sm text-slate-400">
               L'intelligence artificielle au service de la santé publique marocaine.
             </p>
          </div>

          {/* Colonne Produit */}
          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Produit</h4>
             <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-[#00D4FF] transition-colors">Dashboard</Link></li>
                <li><Link href="/assistant" className="hover:text-[#00D4FF] transition-colors">Assistant</Link></li>
                <li><Link href="/rapport" className="hover:text-[#00D4FF] transition-colors">Rapport citoyen</Link></li>
             </ul>
          </div>

          {/* Colonne Sources */}
          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Sources</h4>
             <ul className="space-y-3 text-sm text-slate-400">
                <li>DELM</li>
                <li>OMS Maroc</li>
                <li>HCP/ENPS</li>
             </ul>
          </div>

          {/* Colonne Contact */}
          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact</h4>
             <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="mailto:sanaaammar214@gmail.com" className="hover:text-[#00D4FF] transition-colors">sanaaammar214@gmail.com</a></li>
             </ul>
          </div>

        </div>
        
        {/* Divider ligne */}
        <div className="w-full h-px bg-slate-800 mb-8"></div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 text-center md:text-left gap-4">
           <div>
              <p className="mb-1 text-slate-400">Ces données ne constituent pas un avis médical.</p>
              <p>Ministère de la Santé : <a href="http://www.sante.gov.ma" target="_blank" className="hover:text-white transition-colors">www.sante.gov.ma</a> · Numéro vert : 080 100 47 47</p>
           </div>
           <div>
              <p>&copy; 2025 SEHHA DATA · FST Mohammedia · IA Licence</p>
           </div>
        </div>
        
      </div>
    </footer>
  );
}
