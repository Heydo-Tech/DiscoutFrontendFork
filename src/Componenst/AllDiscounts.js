import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllDiscounts.css"; // Import external CSS

const AllDiscounts = () => {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    handleFetchAllDiscounts();
  }, []);

  const handleFetchAllDiscounts = async () => {
    setError("");
    setLoading(true);

    try {
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
      <h2 className="heading">All Discounts</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {allDiscounts.length > 0 ? (
        <table className="discount-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Value</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {allDiscounts.map((discount) => (
              <tr key={discount._id}>
                <td>{discount.product.productName}</td>
                <td>{discount.discountType}</td>
                <td>{discount.discountValue}</td>
                <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                <td>{new Date(discount.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-discounts">No discounts available</p>
      )}
    </div>
  );
};

export default AllDiscounts;
