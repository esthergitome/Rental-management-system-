'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ReportsPage() {
  const lineData = [
    { month: 'Jan', income: 350000 },
    { month: 'Feb', income: 380000 },
    { month: 'Mar', income: 420000 },
    { month: 'Apr', income: 390000 },
    { month: 'May', income: 450000 },
    { month: 'Jun', income: 480000 },
  ];

  const pieData = [
    { name: 'Completed', value: 20, color: '#10b981' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Overdue', value: 2, color: '#ef4444' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
         <div className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">Total Income</p>
            <h3 className="text-xl font-bold">KSh 480,000</h3>
         </div>
         <div className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">Total Payments</p>
            <h3 className="text-xl font-bold">24</h3>
         </div>
         <div className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">Pending Payments</p>
            <h3 className="text-xl font-bold">2</h3>
         </div>
         <div className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">Occupancy Rate</p>
            <h3 className="text-xl font-bold">75%</h3>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border h-96">
          <h3 className="font-bold mb-4">Income Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `KSh ${val/1000}k`} />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border h-96 flex flex-col items-center">
          <h3 className="font-bold mb-4 self-start">Payment Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={80} outerRadius={120} paddingAngle={5}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
