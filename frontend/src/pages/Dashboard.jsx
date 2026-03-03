import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import axios from "axios";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const [showScanner, setShowScanner] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  // ✅ Handle Barcode Scan
  const handleScan = async (barcode) => {
    if (!barcode) return;

    try {
      setLoading(true);
      setError("");
      setProduct(null);

      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      // 🔍 Check if product exists
      if (res.data.status !== 1) {
        setError("Product not found.");
        setLoading(false);
        return;
      }

      const p = res.data.product;

      const data = {
        productName: p.product_name || "Unknown",
        calories: p.nutriments?.["energy-kcal_100g"] || 0,
        sugar: p.nutriments?.sugars_100g || 0,
        fat: p.nutriments?.fat_100g || 0,
        protein: p.nutriments?.proteins_100g || 0,
      };

      setProduct(data);
      setShowScanner(false); // close scanner

      // 💾 Save to backend
      await API.post("/scan/save", data);

    } catch (err) {
      setError("Scan failed. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Scan Button */}
      <button onClick={() => setShowScanner(true)}>
        Scan Product
      </button>
      <button onClick={logout}>Logout</button>

      {/* Scanner */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Loading */}
      {loading && <p>Scanning product...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Product Result */}
      {product && (
        <div style={{ marginTop: "20px" }}>
          <h3>{product.productName}</h3>
          <p>Calories: {product.calories}</p>
          <p>Sugar: {product.sugar}</p>
          <p>Fat: {product.fat}</p>
          <p>Protein: {product.protein}</p>
        </div>
      )}
    </div>
  );
}