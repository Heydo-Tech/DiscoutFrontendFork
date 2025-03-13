import React, { useState } from "react";
import axios from "axios";

const GetDiscount = () => {
  const [identifier, setIdentifier] = useState("");
  const [productDiscount, setProductDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchDiscount = async () => {
    setError("");
    setProductDiscount(null);

    if (!identifier) {
      setError("Please enter a Barcode or SKU");
      return;
    }

    // Determine if the input is a barcode (numeric) or an SKU (alphanumeric)
    const isBarcode = /^\d+$/.test(identifier);
    const barcode = isBarcode ? identifier : null;
    const sku = isBarcode ? null : identifier;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5009/api/discounts/product/${barcode || ""}/${sku || ""}`);
      setProductDiscount(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Discount not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Discount for Product</h2>
      <input
        type="text"
        placeholder="Enter Barcode or SKU"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
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

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GetDiscount;
