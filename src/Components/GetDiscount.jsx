import React, { useState } from 'react';
import axios from 'axios';

const GetDiscount = () => {
  const [identifier, setIdentifier] = useState('');
  const [productDiscount, setProductDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchDiscount = async () => {
    setError('');
    setProductDiscount(null);

    if (!identifier) {
      setError('Please enter a Barcode or SKU');
      return;
    }

    const isBarcode = /^\d+$/.test(identifier);
    const barcode = isBarcode ? identifier : null;
    const sku = isBarcode ? null : identifier;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://warehouse.apnimandi.us/api/api/discounts/product/${barcode || ''}/${sku || ''}`
      );
      setProductDiscount(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Discount not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png"
            alt="Apni Mandi Logo"
            className="h-16 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Get Discount for Product
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode or SKU
            </label>
            <input
              type="text"
              placeholder="Enter Barcode or SKU"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleFetchDiscount}
            disabled={loading}
            className="w-full py-3 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Get Discount'}
          </button>

          {productDiscount && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Discount Details:
              </h4>
              <p>
                <strong>Type:</strong> {productDiscount.discountType}
              </p>
              <p>
                <strong>Value:</strong> {productDiscount.discountValue}
              </p>
              <p>
                <strong>Start Date:</strong>{' '}
                {new Date(productDiscount.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {new Date(productDiscount.endDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default GetDiscount;