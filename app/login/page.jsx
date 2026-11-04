'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await res.json();
    
    if (data.success) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-center p-12 relative">
         <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
         <div className="z-10 relative">
            <div className="flex items-center gap-3 mb-4">
               <Building2 size={40} />
               <h1 className="text-4xl font-bold">Rental Management</h1>
            </div>
            <p className="text-gray-200 text-lg">Manage your properties, tenants and payments all in one place.</p>
         </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>
          
          {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-8">
            © 2025 Rental Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
