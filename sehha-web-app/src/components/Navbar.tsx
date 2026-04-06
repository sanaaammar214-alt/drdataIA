'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/rapport', label: 'Rapport' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full top-0 left-0 bg-[rgba(11,30,62,0.85)] backdrop-blur-[20px] border-b border-[#00D4FF]/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-tight group">
            <span className="font-display font-extrabold text-xl text-[#00D4FF] tracking-[-1px] group-hover:text-white transition-colors duration-200">SEHHA DATA</span>
            <span className="font-display text-[9px] font-bold text-[#E8F4FD]/60 tracking-[0.25em] uppercase">صحة داتا</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-[#00D4FF]'
                      : 'text-[#7A9CBD] hover:text-[#E8F4FD] hover:bg-[#152843]/50'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-[-19px] left-0 w-full h-[2px] bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/assistant"
            className="px-6 py-2.5 rounded-full text-sm font-bold font-display text-[#0B1E3E] bg-[#00D4FF] hover:bg-white hover:text-[#0B1E3E] transition-all duration-300 glow-box transform hover:-translate-y-0.5 whitespace-nowrap uppercase tracking-wider text-[11px]"
          >
            Parler à Dr. Sehha →
          </Link>
        </div>

        {/* Shimmer line */}
        <div className="absolute bottom-[-1px] left-0 right-0 shimmer-line pointer-events-none opacity-60"></div>
      </div>
    </nav>
  );
}
