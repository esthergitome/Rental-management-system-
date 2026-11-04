'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Printer, Trash2 } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payments')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Link href="/payments/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Record Payment
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-gray-400">
          <Search size={18} />
          <input type="text" placeholder="Search by tenant name or receipt no..." className="w-full outline-none text-sm text-gray-700" />
        </div>

        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading payments...</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-4 font-medium">Tenant</th>
                <th className="p-4 font-medium">Property</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Month/Year</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Receipt No.</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{pay.first_name} {pay.last_name}</td>
                  <td className="p-4 text-blue-600">{pay.property_no}</td>
                  <td className="p-4">KSh {pay.amount}</td>
                  <td className="p-4">{pay.month_paid} {pay.year_paid}</td>
                  <td className="p-4">{new Date(pay.payment_date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pay.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      pay.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {pay.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{pay.receipt_no}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button className="text-gray-400 hover:text-blue-600" title="Print Receipt"><Printer size={16} /></button>
                    <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
