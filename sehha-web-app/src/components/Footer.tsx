import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#060F1D] pt-20 pb-10 border-t border-[#00D4FF] border-opacity-10 relative z-10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne Logo */}
          <div className="md:col-span-1">
             <div className="flex flex-col items-start leading-tight mb-6">
                <span className="font-display font-extrabold text-2xl text-[#00D4FF] tracking-tight">SEHHA DATA</span>
                <span className="font-display text-[10px] font-bold text-[#E8F4FD]/50 tracking-[0.2em] uppercase">صحة داتا</span>
             </div>
             <p className="text-sm text-[#7A9CBD] leading-relaxed">
               Plateforme d'intelligence artificielle au service de la santé publique marocaine.
             </p>
          </div>

          {/* Colonne Produit */}
          <div>
             <h4 className="font-display text-[10px] font-bold mb-6 uppercase tracking-[0.15em] text-[#7A9CBD]">Produit</h4>
             <ul className="space-y-4 text-sm text-[#4a6280]">
                <li><Link href="/dashboard" className="hover:text-[#00D4FF] transition-colors">Dashboard</Link></li>
                <li><Link href="/assistant" className="hover:text-[#00D4FF] transition-colors">Assistant IA</Link></li>
                <li><Link href="/rapport" className="hover:text-[#00D4FF] transition-colors">Rapport citoyen</Link></li>
             </ul>
          </div>

          {/* Colonne Sources */}
          <div>
             <h4 className="font-display text-[10px] font-bold mb-6 uppercase tracking-[0.15em] text-[#7A9CBD]">Données Officielles</h4>
             <ul className="space-y-4 text-sm text-[#4a6280]">
                <li className="hover:text-[#E8F4FD] transition-colors">DELM Ministère</li>
                <li className="hover:text-[#E8F4FD] transition-colors">OMS Bureau Maroc</li>
                <li className="hover:text-[#E8F4FD] transition-colors">HCP / ENPS</li>
             </ul>
          </div>

          {/* Colonne Contact / Disclaimer */}
          <div>
             <h4 className="font-display text-[10px] font-bold mb-6 uppercase tracking-[0.15em] text-[#7A9CBD]">Contact</h4>
             <ul className="space-y-4 text-sm text-[#4a6280] mb-6">
                <li><a href="mailto:sanaaammar214@gmail.com" className="hover:text-[#00D4FF] transition-colors">sanaaammar214@gmail.com</a></li>
             </ul>
             
             {/* Disclaimer RED Box */}
             <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-4 rounded-lg">
               <p className="text-[#f87171] text-xs font-medium leading-relaxed">
                 ⚠️ Les indicateurs fournis ne constituent pas un avis médical. 
                 En cas d'urgence: Allo Yakada <strong>080 100 47 47</strong>
               </p>
             </div>
          </div>

        </div>
        
        {/* Divider ligne */}
        <div className="w-full h-px bg-[#152843] mb-8"></div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#7A9CBD] text-center md:text-left gap-4 font-medium">
           <div>
              Ministère de la Santé : <a href="http://www.sante.gov.ma" target="_blank" className="hover:text-white transition-colors underline decoration-[#7A9CBD]/30 underline-offset-4">www.sante.gov.ma</a>
           </div>
           <div>
              <p>&copy; 2025 SEHHA DATA · Architecturé par Sanaa · FST Mohammedia</p>
           </div>
        </div>
        
      </div>
    </footer>
  );
}
