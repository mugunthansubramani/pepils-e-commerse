import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api.js";
import "./productPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image-carousel">
        {/* Image carousel placeholder; replace with actual carousel if you have multiple images */}
        <img src={product.thumbnail} alt={product.title} className="main-product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">
          <span className="special-price">${product.price}</span>{" "}
          <span className="original-price">${product.originalPrice}</span>{" "}
          <span className="discount-percentage">({product.discountPercentage}% off)</span>
        </p>
        <div className="available-offers">
          <h5>Available Offers</h5>
          <ul>
            <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
            <li>Extra ₹300 Off on UPI Transactions, on Orders of ₹4,000 and above</li>
            <li>Special Price: Get extra 16% off (price inclusive of cashback/coupon)</li>
          </ul>
        </div>
        <p className="product-rating">Rating: {product.rating} ⭐</p>
        <div className="product-details">
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>SKU: {product.sku}</p>
          <p>Stock: {product.stock}</p>
        </div>
        <div className="action-buttons">
          <button className="btn btn-warning add-to-cart-button">Add to Cart</button>
          <button className="btn btn-danger buy-now-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
