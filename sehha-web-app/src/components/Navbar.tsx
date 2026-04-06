import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0 bg-white border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo gauche */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-start leading-tight">
              <span className="font-bold text-xl text-[#1A3A8F] tracking-tight">SEHHA DATA</span>
              <span className="text-[10px] font-medium text-[#00D4FF] tracking-widest">صحة داتا</span>
            </Link>
          </div>
          
          {/* Liens centre */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#64748B] hover:text-[#1A3A8F] px-2 py-2 text-[15px] font-medium transition-colors">Accueil</Link>
            <Link href="/dashboard" className="text-[#64748B] hover:text-[#1A3A8F] px-2 py-2 text-[15px] font-medium transition-colors">Dashboard</Link>
            <Link href="/assistant" className="text-[#64748B] hover:text-[#1A3A8F] px-2 py-2 text-[15px] font-medium transition-colors">Assistant</Link>
            <Link href="/rapport" className="text-[#64748B] hover:text-[#1A3A8F] px-2 py-2 text-[15px] font-medium transition-colors">Rapport</Link>
          </div>

          {/* Bouton droit */}
          <div className="flex items-center">
            <Link
              href="/assistant"
              className="ml-4 px-6 py-2.5 rounded-full shadow-sm text-sm font-semibold text-white bg-[#1A3A8F] hover:bg-[#152e72] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A3A8F] transition-all duration-200"
            >
              Parler à Dr. Sehha →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
