// src/App.jsx
import React, { useState } from "react";
import UploadPrescription from "./components/UploadPrescription";
import PredictionResult from "./components/PredictionResult";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Prescription Analyzer</h1>
      <UploadPrescription setPrediction={setPrediction} />
      <PredictionResult prediction={prediction} />
    </div>
  );
}

export default App;
