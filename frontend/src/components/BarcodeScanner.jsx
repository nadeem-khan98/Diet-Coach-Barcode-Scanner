import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function BarcodeScanner({ onScan, onClose }) {

  const qrRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {

    const qr = new Html5Qrcode("reader");
    qrRef.current = qr;

    // ✅ START BACK CAMERA
    qr.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },

      (decodedText) => {
        onScan(decodedText);
        stopScanner();
      },

      () => {}
    )
    .then(() => {
      runningRef.current = true;
    })
    .catch(err => console.log(err));

    // cleanup
    return () => {
      stopScanner();
    };

  }, []);

  // ✅ SAFE STOP FUNCTION
  const stopScanner = async () => {
    try {
      if (qrRef.current && runningRef.current) {
        await qrRef.current.stop();
        runningRef.current = false;
        onClose();
      }
    } catch (err) {
      console.log("Stop error ignored");
    }
  };

  // ✅ IMAGE FILE SCAN (FIXED)
  const scanFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // stop camera before image scan
      if (qrRef.current && runningRef.current) {
        await qrRef.current.stop();
        runningRef.current = false;
      }

      const decodedText = await qrRef.current.scanFile(file, true);

      onScan(decodedText);
      onClose();

    } catch (err) {
      console.log("File scan error:", err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>

      {/* Camera View */}
      <div id="reader"></div>

      {/* Upload Image Option */}
      <div style={{ marginTop: "15px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={scanFile}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={stopScanner}
        style={{ marginTop: "10px" }}
      >
        Close Camera
      </button>

    </div>
  );
}