import axios from "axios";
import CryptoJS from "crypto-js";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products.map((product) => ({
      ...product,
      encryptedId: encodeURIComponent(
        CryptoJS.AES.encrypt(product.id.toString(), "secretKey").toString()
      ),
    }));
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id) => {
  console.log(id);

  try {
    const decryptedId = CryptoJS.AES.decrypt(
      decodeURIComponent(id),
      "secretKey"
    ).toString(CryptoJS.enc.Utf8);
    console.log(decryptedId);

    // Ensure decryptedId is a valid number before making the API call
    if (isNaN(decryptedId)) {
      throw new Error("Invalid product ID");
    }

    const response = await axios.get(`${API_URL}/${decryptedId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product details: " + error.message);
  }
};

// function to fetch similar products by category
export const fetchSimilarProducts = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data.products.map((product) => ({
      ...product,
      encryptedId: encodeURIComponent(
        CryptoJS.AES.encrypt(product.id.toString(), "secretKey").toString()
      ),
    }));
  } catch (error) {
    throw new Error("Failed to fetch similar products: " + error.message);
  }
};
