'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTenant() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', phone: '', email: '', property_id: '', status: 'Active'
  });

  useEffect(() => {
    fetch('/api/properties').then(res => res.json()).then(data => setProperties(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Tenant added successfully!');
      router.push('/tenants');
    } else {
      alert('Failed to add tenant');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add New Tenant</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">First Name</label>
          <input type="text" required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Last Name</label>
          <input type="text" required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input type="text" required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email Address</label>
          <input type="email" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Assign Property</label>
          <select required className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, property_id: e.target.value})}>
            <option value="">Select a Property</option>
            {properties.map(prop => (
              <option key={prop.id} value={prop.id}>{prop.property_name} ({prop.property_no})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button type="button" onClick={() => router.push('/tenants')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Tenant</button>
        </div>
      </form>
    </div>
  );
}
