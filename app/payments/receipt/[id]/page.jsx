'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Printer, ArrowLeft } from 'lucide-react';

export default function ReceiptPage() {
  const params = useParams();
  const { id } = params;
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => {
        const foundPayment = data.find(p => p.id.toString() === id);
        setPayment(foundPayment);
      });
  }, [id]);

  if (!payment) return <div className="p-8 text-center text-gray-500">Loading receipt...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="mb-6 flex gap-4 print:hidden">
        <Link href="/payments" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm border">
          <ArrowLeft size={18} /> Back to Payments
        </Link>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700">
          <Printer size={18} /> Print Receipt
        </button>
      </div>

      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full border-t-8 border-blue-600">
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rental Management System</h1>
            <p className="text-gray-500 text-sm mt-1">123 Property Lane, Nairobi</p>
            <p className="text-gray-500 text-sm">Phone: +254 700 000 000</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-700 uppercase tracking-widest">Official Receipt</h2>
            <p className="text-gray-500 font-mono mt-2">#{payment.receipt_no}</p>
            <p className="text-gray-500 text-sm mt-1">Date: {new Date(payment.payment_date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Billed To:</h3>
          <p className="text-lg font-medium">{payment.first_name} {payment.last_name}</p>
          <p className="text-gray-600">Property: {payment.property_no}</p>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left text-gray-600">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount (KSh)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4">Rent Payment for {payment.month_paid} {payment.year_paid}</td>
              <td className="py-4 text-right font-mono">{Number(payment.amount).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end border-t-2 border-gray-200 pt-4">
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-1">Total Paid</p>
            <p className="text-3xl font-bold text-gray-900">KSh {Number(payment.amount).toLocaleString()}</p>
            <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-green-200 transform -rotate-6">
              {payment.status}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm border-t pt-6">
          <p>Thank you for your payment!</p>
          <p className="mt-1">This is a computer-generated receipt and does not require a signature.</p>
        </div>
      </div>
    </div>
  );
}
