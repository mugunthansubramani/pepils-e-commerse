// ProductPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchSimilarProducts } from "../api.js"; // assume fetchSimilarProducts exists
// import Navbar from "./Navbar";
import "./productPage.css";
import Navbar from "../components/navbar/navbar.js";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        return fetchSimilarProducts(data.category); // Fetch similar products based on category
      })
      .then((similarData) => setSimilarProducts(similarData))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
        <Navbar/>
      <div className="product-detail-container">
        <div className="product-image-carousel">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="main-product-image"
          />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">
            <span className="special-price">${product.price}</span>{" "}
            <span className="original-price">${product.originalPrice}</span>{" "}
            <span className="discount-percentage">
              ({product.discountPercentage}% off)
            </span>
          </p>
          <div className="available-offers">
            <h5>Available Offers</h5>
            <ul>
              <li>
                Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit
                Card
              </li>
              <li>
                Extra ₹300 Off on UPI Transactions, on Orders of ₹4,000 and
                above
              </li>
              <li>
                Special Price: Get extra 16% off (price inclusive of
                cashback/coupon)
              </li>
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
            <button className="btn btn-warning add-to-cart-button">
              Add to Cart
            </button>
            <button className="btn btn-danger buy-now-button">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="similar-products-section">
        <h3>Similar Products</h3>
        <div className="similar-products-list justify-content-between">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id}>
              {/* <img src={similarProduct.thumbnail} alt={similarProduct.title} />
              <p>{similarProduct.title}</p>
              <p>${similarProduct.price}</p>
              <p className="product-rating text-warning">
            Rating: {product.rating} <span>⭐</span>
          </p> */}

              <div className="card product-card shadow-lg">
                <div className="product-image text-center">
                  <img
                    src={similarProduct.thumbnail}
                    className="card-img-top img-fluid"
                    alt={similarProduct.title}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body product-info">
                  <h5 className="card-title product-title">
                    {similarProduct.title}
                  </h5>
                  <p
                    className="product-price"
                    style={{ color: "#28a745", fontWeight: "bold" }}
                  >
                    ₹ {similarProduct.price} Rs
                    {/* <span className="text-muted" style={{ textDecoration: "line-through", marginLeft: "5px" }}>
              ${product.originalPrice}
            </span> */}
                  </p>
                  <p className="product-discount text-success">
                    Discount: {similarProduct.discountPercentage}%
                  </p>
                  <p className="product-rating text-warning">
                    Rating: {similarProduct.rating} <span>⭐</span>
                  </p>
                  <Link
                    to={`/product/${similarProduct.encryptedId}`}
                    className="view-details-button"
                  >
                    <button className="btn btn-primary btn-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
