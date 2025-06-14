import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllDiscounts = () => {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleFetchAllDiscounts();
  }, []);

  const handleFetchAllDiscounts = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.get('https://warehouse.apnimandi.us/api/api/discounts/all');
      setAllDiscounts(response.data);
    } catch (err) {
      setError('Failed to fetch discounts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-orange-100">
      <div className="w-full mt-4 mb-4 max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png"
            alt="Apni Mandi Logo"
            className="h-16 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          All Discounts
        </h2>
        {loading && <p className="text-lg text-center text-red-500">Loading...</p>}
        {error && <p className="text-lg text-center text-red-500">{error}</p>}

        {allDiscounts.length > 0 ? (
          <table className="w-full border-collapse bg-white rounded-lg">
            <thead>
              <tr className="bg-[#F47820] text-white">
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {allDiscounts.map((discount) => (
                <tr key={discount._id} className="hover:bg-gray-100 even:bg-gray-50">
                  <td className="p-3 border-b">{discount.productName}</td>
                  <td className="p-3 border-b">{discount.discountType}</td>
                  <td className="p-3 border-b">{discount.discountValue}</td>
                  <td className="p-3 border-b">
                    {new Date(discount.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(discount.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-red-500">No discounts available</p>
        )}
      </div>
    </div>
  );
};

export default AllDiscounts;