import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/productCard";
import "./home.css";
import Navbar from "../components/navbar/navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  const [priceRange, setPriceRange] = useState([0, 100000]); // Adjusted INR range (min to max)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const convertedProducts = data.map((product) => ({
          ...product,
          price: Math.round(product.price * 82), // assuming 1 USD ≈ 82 INR
        }));

        setProducts(convertedProducts);
        setLoading(false);

        const uniqueCategories = [
          "All", // Add "All" option
          ...new Set(
            convertedProducts.map(
              (product) =>
                product.category.charAt(0).toUpperCase() +
                product.category.slice(1)
            )
          ),
        ];

        setCategories(uniqueCategories);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (event) => {
    const { value, name } = event.target;
    setPriceRange((prevRange) => [
      name === "min" ? Number(value) : prevRange[0],
      name === "max" ? Number(value) : prevRange[1],
    ]);
  };

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All"
        ? true
        : product.category.charAt(0).toUpperCase() +
            product.category.slice(1) ===
          selectedCategory
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar categories={categories} />
      {/* <nav className="navbar">
        <div className="navbar-brand">MyShop</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search products..." />
          <button>Search</button>
        </div>
        <div className="navbar-icons">
          <i className="fas fa-shopping-cart"></i>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="main-content container-fluid">
        {/* Sidebar */}
        <aside className="sidebar">
          <h5>Categories</h5>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === category ? "bold" : "normal",
                }}
              >
                {category}
              </li>
            ))}
          </ul>

          {/* Price Range Filter */}
          <h5>Price Range (INR)</h5>
          <div className="price-range-slider">
            <label>Min: ₹{priceRange[0]}</label>
            <input
              type="range"
              name="min"
              min="0"
              max="100000"
              value={priceRange[0]}
              onChange={handlePriceChange}
              style={{ marginRight: "10px" }}
            />
            <label>Max: ₹{priceRange[1]}</label>
            <input
              type="range"
              name="max"
              min="0"
              max="100000"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.encryptedId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
