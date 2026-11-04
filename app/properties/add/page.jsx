'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    property_no: '', property_name: '', location: '', rent_amount: '', status: 'Available'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Property added successfully!');
      router.push('/properties'); // Redirect back to the list
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Property No.</label>
          <input type="text" required className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, property_no: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Property Name</label>
          <input type="text" required className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, property_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Location</label>
          <input type="text" required className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Rent Amount (KSh)</label>
          <input type="number" required className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, rent_amount: e.target.value})} />
        </div>
        
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button type="button" onClick={() => router.push('/properties')} className="px-4 py-2 text-gray-600">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Property</button>
        </div>
      </form>
    </div>
  );
}
