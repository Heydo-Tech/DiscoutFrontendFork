import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDiscount = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
    setError('');
    setProduct(null);
    setInventory(null);

    if (!identifier) {
      setError('Please enter a Barcode or SKU');
      return;
    }

    setLoading(true);

    try {
      const isBarcode = /^\d+$/.test(identifier);
      const url = isBarcode
        ? `https://warehouse.apnimandi.us/api/api/inventory/barcode/${identifier}`
        : `https://warehouse.apnimandi.us/api/api/inventory/sku/${identifier}`;

      const response = await axios.get(url);

      if (response?.data?.product) {
        setProduct(response.data.product);
        setInventory(response.data.inventory || { quantity: 0 });
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDiscount = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Please enter a Barcode or SKU');
      return;
    }

    const isBarcode = /^\d+$/.test(identifier);
    const barcode = isBarcode ? identifier : null;
    const sku = isBarcode ? null : identifier;

    try {
      await axios.post('https://warehouse.apnimandi.us/api/api/discounts/add', {
        barcode,
        sku,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
      });

      alert('Discount added successfully');
      setIdentifier('');
      setDiscountValue('');
      setStartDate('');
      setEndDate('');
      setProduct(null);
      setInventory(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add discount');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="w-full mt-4 mb-4 max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png"
            alt="Apni Mandi Logo"
            className="h-16 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Discount</h2>
        <button
          onClick={() => navigate('/all-discounts')}
          className="w-full py-3 mb-6 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
        >
          All Discounts
        </button>

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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
            />
          </div>
          <button
            type="button"
            onClick={fetchProductDetails}
            disabled={loading}
            className="w-full py-3 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch Product'}
          </button>

          {product && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Product Details</h3>
              <p>
                <strong>Name:</strong> {product.productName}
              </p>
              <p>
                <strong>Category:</strong> {product.productCategory}
              </p>
              <p>
                <strong>Subcategory:</strong> {product.productSubcategory}
              </p>
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleAddDiscount}
            className="w-full py-3 bg-[#F47820] text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            Add Discount
          </button>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;