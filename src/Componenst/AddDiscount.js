import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDiscount = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch product details
  const fetchProductDetails = async () => {
    setError("");
    console.log(inventory);
    setProduct(null);
    setInventory(null);

    if (!identifier) {
      setError("Please enter a Barcode or SKU");
      return;
    }

    setLoading(true);

    try {
      // Check if identifier is a barcode (numeric) or an SKU (alphanumeric)
      const isBarcode = /^\d+$/.test(identifier);
      const url = isBarcode
        ? `https://warehouse.apnimandi.us/api/api/inventory/barcode/${identifier}`
        : `https://warehouse.apnimandi.us/api/api/inventory/sku/${identifier}`;

      const response = await axios.get(url);

      if (response?.data?.product) {
        setProduct(response.data.product);
        setInventory(response.data.inventory || { quantity: 0 });
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a discount
  const handleAddDiscount = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier) {
      setError("Please enter a Barcode or SKU");
      return;
    }

    // Check if identifier is a number (barcode) or a string (SKU)
    const isBarcode = /^\d+$/.test(identifier);
    const barcode = isBarcode ? identifier : null;
    const sku = isBarcode ? null : identifier;

    try {
      await axios.post("https://warehouse.apnimandi.us/api/api/discounts/add", {
        barcode,
        sku,
        discountType,
        discountValue: Number(discountValue),
        startDate,
        endDate,
      });

      alert("Discount added successfully");

      // Reset form fields
      setIdentifier("");
      setDiscountValue("");
      setStartDate("");
      setEndDate("");
      setProduct(null);
      setInventory(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add discount");
    }
  };

  return (
    <div className="container">
      <h2>Add Discount</h2>
      <button onClick={() => navigate("/all-discounts")}>All Discounts</button>

      <form className="form-container" onSubmit={handleAddDiscount}>
        {/* Identifier Input Field */}
        <input
          type="text"
          placeholder="Enter Barcode or SKU"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        {/* Fetch Product Button */}
        <button type="button" onClick={fetchProductDetails} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Product"}
        </button>

        {/* Display Product Details if found */}
        {product && (
          <div>
            <h3>Product Details</h3>
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

        {/* Discount Type Selection */}
        <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>

        {/* Discount Value Input */}
        <input
          type="number"
          placeholder="Discount Value"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          required
        />

        {/* Date Inputs */}
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

        {/* Submit Button */}
        <button type="submit">Add Discount</button>
      </form>

      {/* Error Message Display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddDiscount;
