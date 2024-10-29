import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";

function ProductCard({ product }) {
    console.log(product.category);
    
  return (
    <div className="mb-4">
      <div className="card product-card shadow-sm">
        <div className="product-image text-center">
          <img
            src={product.thumbnail}
            className="card-img-top img-fluid"
            alt={product.title}
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        </div>
        <div className="card-body product-info">
          <h5 className="card-title product-title">{product.title}</h5>
          <p className="product-price" style={{ color: "#28a745", fontWeight: "bold" }}>
            ₹ {product.price} Rs
            {/* <span className="text-muted" style={{ textDecoration: "line-through", marginLeft: "5px" }}>
              ${product.originalPrice}
            </span> */}
          </p>
          <p className="product-discount text-success">
            Discount: {product.discountPercentage}%
          </p>
          <p className="product-rating text-warning">
            Rating: {product.rating} <span>⭐</span>
          </p>
          <Link to={`/product/${product.encryptedId}`} className="view-details-button">
            <button className="btn btn-primary btn-sm">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
