'use client';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Building, Users, DollarSign, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    tenants: 0,
    revenue: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  const statCards = [
    { title: 'Total Properties', value: stats.properties, icon: <Building />, change: '+12%', up: true, color: 'bg-blue-500' },
    { title: 'Total Tenants', value: stats.tenants, icon: <Users />, change: '+8%', up: true, color: 'bg-green-500' },
    { title: 'Total Revenue', value: `KSh ${Number(stats.revenue).toLocaleString()}`, icon: <DollarSign />, change: '+12%', up: true, color: 'bg-orange-500' },
    { title: 'Pending Payments', value: stats.pending, icon: <Clock />, change: '-10%', up: false, color: 'bg-purple-500' },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Good afternoon, Admin</h1>
        <p className="text-gray-500 text-sm">Here's what's happening with your properties today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className={`text-sm flex items-center mt-2 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} {stat.change} from last month
              </p>
            </div>
            <div className={`${stat.color} text-white p-4 rounded-full`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-bold mb-4">Monthly Payments Trend</h3>
          <div className="h-full flex items-end justify-around pb-8">
             <div className="w-12 bg-blue-200 h-1/4 rounded-t-md"></div>
             <div className="w-12 bg-blue-300 h-2/4 rounded-t-md"></div>
             <div className="w-12 bg-blue-400 h-3/4 rounded-t-md"></div>
             <div className="w-12 bg-blue-500 h-full rounded-t-md"></div>
             <div className="w-12 bg-blue-600 h-2/3 rounded-t-md"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-bold mb-4">Recent Payments</h3>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr><th className="pb-2">Tenant</th><th className="pb-2">Amount</th><th className="pb-2">Status</th></tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-3">John Kamau</td><td className="py-3">KSh 25,000</td><td><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Paid</span></td></tr>
              <tr className="border-b"><td className="py-3">Mary Wangari</td><td className="py-3">KSh 22,000</td><td><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
