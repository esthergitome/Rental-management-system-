'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [formData, setFormData] = useState({
    property_no: '', property_name: '', location: '', rent_amount: '', status: 'Available'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        const propertyToEdit = data.find(p => p.id.toString() === id);
        if (propertyToEdit) setFormData(propertyToEdit);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/properties', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: id })
    });

    if (res.ok) {
      alert('Property updated!');
      router.push('/properties');
    } else {
      alert('Failed to update property');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Property No.</label>
          <input type="text" required value={formData.property_no} className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, property_no: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Property Name</label>
          <input type="text" required value={formData.property_name} className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, property_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Location</label>
          <input type="text" required value={formData.location} className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Rent Amount (KSh)</label>
          <input type="number" required value={formData.rent_amount} className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, rent_amount: e.target.value})} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select value={formData.status} className="w-full border p-2 rounded-lg" 
            onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button type="button" onClick={() => router.push('/properties')} className="px-4 py-2 text-gray-600">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Update Property</button>
        </div>
      </form>
    </div>
  );
}
