// src/components/PredictionResult.jsx
import React from "react";

export default function PredictionResult({ prediction }) {
    if (!prediction) return null;

    return (
        <div className="mt-4 p-4 border rounded-md">
            <h2 className="font-bold mb-2">Prediction Result</h2>
            <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
    );
}
