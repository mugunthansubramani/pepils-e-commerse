import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductPage from "./pages/productPage";
import Underconstuction from "./pages/underconstuction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/underconstruction" element={<Underconstuction/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
