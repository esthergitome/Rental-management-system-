'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecordPayment() {
  const router = useRouter();
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  
  // 1. Start with empty strings for the dates
  const [formData, setFormData] = useState({
    tenant_id: '', 
    property_id: '', 
    amount: '', 
    month_paid: '', 
    year_paid: '', 
    payment_date: '', 
    status: 'Completed'
  });

  // 2. Fetch data AND set the dates when the component mounts
  useEffect(() => {
    fetch('/api/tenants').then(res => res.json()).then(data => setTenants(data));
    fetch('/api/properties').then(res => res.json()).then(data => setProperties(data));

    // Set the dates here so they only run on the client side
    const today = new Date();
    setFormData(prev => ({
      ...prev,
      year_paid: today.getFullYear(),
      payment_date: today.toISOString().split('T')[0]
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json();
      alert(`Payment recorded! Receipt No: ${data.receipt_no}`);
      router.push('/payments');
    } else {
      alert('Failed to record payment');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Record Payment</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Select Tenant</label>
          <select required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, tenant_id: e.target.value})}>
            <option value="">Select Tenant</option>
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Select Property</label>
          <select required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, property_id: e.target.value})}>
            <option value="">Select Property</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.property_no} - {p.property_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Amount (KSh)</label>
          <input type="number" required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, amount: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Month Paid</label>
          <select required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, month_paid: e.target.value})}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Year</label>
          <input type="number" required value={formData.year_paid} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, year_paid: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Payment Date</label>
          <input type="date" required value={formData.payment_date} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, payment_date: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button type="button" onClick={() => router.push('/payments')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Payment</button>
        </div>
      </form>
    </div>
  );
}
