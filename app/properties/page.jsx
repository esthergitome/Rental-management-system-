'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = () => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const res = await fetch(`/api/properties?id=${id}`, { method: 'DELETE' });
    
    if (res.ok) {
      setProperties(properties.filter(p => p.id !== id));
      alert('Property deleted');
    } else {
      alert('Cannot delete property. It might be assigned to a tenant.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Link href="/properties/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-gray-400">
          <Search size={18} />
          <input type="text" placeholder="Search by property name or location..." className="w-full outline-none text-sm text-gray-700" />
        </div>

        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading properties...</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-4 font-medium">Property No.</th>
                <th className="p-4 font-medium">Property Name</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Rent (KSh)</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-blue-600">{prop.property_no}</td>
                  <td className="p-4">{prop.property_name}</td>
                  <td className="p-4">{prop.location}</td>
                  <td className="p-4">{prop.rent_amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prop.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button className="text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(prop.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
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
