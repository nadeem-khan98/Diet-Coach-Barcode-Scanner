import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import axios from "axios";
import API from "../services/api";

export default function Dashboard() {
  const [showScanner, setShowScanner] = useState(false);
  const [product, setProduct] = useState(null);

  // 🔍 when barcode scanned
  const handleScan = async (barcode) => {
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      const p = res.data.product;

      const data = {
        productName: p.product_name || "Unknown",
        calories: p.nutriments?.["energy-kcal_100g"] || 0,
        sugar: p.nutriments?.sugars_100g || 0,
        fat: p.nutriments?.fat_100g || 0,
        protein: p.nutriments?.proteins_100g || 0,
      };

      setProduct(data);

      // save to backend
      await API.post("/scan/save", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* ✅ Scan Button */}
      <button onClick={() => setShowScanner(true)}>
        Scan Product
      </button>

      {/* ✅ Show scanner only when clicked */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* ✅ Product Result */}
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