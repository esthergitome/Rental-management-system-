'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Users, CreditCard, FileText, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Properties', path: '/properties', icon: <Building2 size={20} /> },
    { name: 'Tenants', path: '/tenants', icon: <Users size={20} /> },
    { name: 'Payments', path: '/payments', icon: <CreditCard size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-xl font-bold flex items-center gap-2 border-b border-slate-800">
        <Building2 size={24} /> Rental Management
      </div>
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-slate-800 transition ${
              pathname === item.path ? 'bg-blue-600 border-r-4 border-blue-400' : ''
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
