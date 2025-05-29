import React, { useState } from "react";
import axios from "axios";

const DiscountManagement = () => {
  const [barcode, setBarcode] = useState("");
  const [sku, setSku] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productDiscount, setProductDiscount] = useState(null);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add a new discount
  const handleAddDiscount = async (e) => {
    e.preventDefault();
    setError("");
    if (!barcode && !sku) {
      setError("Please enter either Barcode or SKU");
      return;
    }

    try {
      await axios.post("https://warehouse.apnimandi.us/api/api/discounts/add", {
        barcode: barcode || null,
        sku: sku || null,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
      });

      alert("Discount added successfully");
      setBarcode("");
      setSku("");
      setDiscountValue("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add discount");
    }
  };

  // Get discount for a product
  const handleFetchDiscount = async () => {
    setError("");
    setProductDiscount(null);

    if (!barcode && !sku) {
      setError("Please enter either Barcode or SKU");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://warehouse.apnimandi.us/api/api/discounts/product/${barcode || ""}/${sku || ""}`
      );
      setProductDiscount(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Discount not found");
    } finally {
      setLoading(false);
    }
  };

  // Get all discounts
  const handleFetchAllDiscounts = async () => {
    setError("");
    setAllDiscounts([]);

    try {
      setLoading(true);
      const response = await axios.get("https://warehouse.apnimandi.us/api/api/discounts/all");
      setAllDiscounts(response.data);
    } catch (err) {
      setError("Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Discount Management</h2>

      {/* Add Discount Form */}
      <div className="form-container">
        <h3>Add Discount</h3>
        <form onSubmit={handleAddDiscount}>
          <input
            type="text"
            placeholder="Enter Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          <input
            type="number"
            placeholder="Discount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit">Add Discount</button>
        </form>
      </div>

      {/* Fetch Discount for a Product */}
      <div className="form-container">
        <h3>Get Discount for Product</h3>
        <input
          type="text"
          placeholder="Enter Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <button onClick={handleFetchDiscount} disabled={loading}>
          {loading ? "Fetching..." : "Get Discount"}
        </button>

        {productDiscount && (
          <div className="discount-details">
            <h4>Discount Details:</h4>
            <p><strong>Type:</strong> {productDiscount.discountType}</p>
            <p><strong>Value:</strong> {productDiscount.discountValue}</p>
            <p><strong>Start Date:</strong> {new Date(productDiscount.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(productDiscount.endDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {/* Fetch All Discounts */}
      <div className="form-container">
        <h3>All Discounts</h3>
        <button onClick={handleFetchAllDiscounts} disabled={loading}>
          {loading ? "Loading..." : "Fetch All Discounts"}
        </button>

        {allDiscounts.length > 0 && (
          <div className="discount-list">
            <h4>Discounts List:</h4>
            <ul>
              {allDiscounts.map((discount) => (
                <li key={discount._id}>
                  <p><strong>Product:</strong> {discount.product.productName}</p>
                  <p><strong>Type:</strong> {discount.discountType}</p>
                  <p><strong>Value:</strong> {discount.discountValue}</p>
                  <p><strong>Start Date:</strong> {new Date(discount.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(discount.endDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DiscountManagement;
