import React, { useState } from 'react';
import axios from 'axios';

const DiscountManagement = () => {
  const [barcode, setBarcode] = useState('');
  const [sku, setSku] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productDiscount, setProductDiscount] = useState(null);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddDiscount = async (e) => {
    e.preventDefault();
    setError('');
    if (!barcode && !sku) {
      setError('Please enter either Barcode or SKU');
      return;
    }

    try {
      await axios.post('https://warehouse.apnimandi.us/api/api/discounts/add', {
        barcode: barcode || null,
        sku: sku || null,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
      });

      alert('Discount added successfully');
      setBarcode('');
      setSku('');
      setDiscountValue('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add discount');
    }
  };

  const handleFetchDiscount = async () => {
    setError('');
    setProductDiscount(null);

    if (!barcode && !sku) {
      setError('Please enter either Barcode or SKU');
      return;
    }

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

  const handleFetchAllDiscounts = async () => {
    setError('');
    setAllDiscounts([]);

    try {
      setLoading(true);
      const response = await axios.get('https://warehouse.apnimandi.us/api/api/discounts/all');
      setAllDiscounts(response.data);
    } catch (err) {
      setError('Failed to fetch discounts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F47820]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png"
            alt="Apni Mandi Logo"
            className="h-16 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Discount Management
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add Discount
            </h3>
            <form onSubmit={handleAddDiscount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Barcode
                </label>
                <input
                  type="text"
                  placeholder="Enter Barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Value
                </label>
                <input
                  type="number"
                  placeholder="Discount Value"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
              >
                Add Discount
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Get Discount for Product
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Barcode
                </label>
                <input
                  type="text"
                  placeholder="Enter Barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
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
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              All Discounts
            </h3>
            <button
              onClick={handleFetchAllDiscounts}
              disabled={loading}
              className="w-full py-3 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch All Discounts'}
            </button>

            {allDiscounts.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Discounts List:
                </h4>
                <ul className="space-y-4">
                  {allDiscounts.map((discount) => (
                    <li key={discount._id} className="border-b pb-2">
                      <p>
                        <strong>Product:</strong> {discount.product.productName}
                      </p>
                      <p>
                        <strong>Type:</strong> {discount.discountType}
                      </p>
                      <p>
                        <strong>Value:</strong> {discount.discountValue}
                      </p>
                      <p>
                        <strong>Start Date:</strong>{' '}
                        {new Date(discount.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>End Date:</strong>{' '}
                        {new Date(discount.endDate).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DiscountManagement;