// UploadPrescription.jsx
import React, { useState } from "react";
import axios from "axios";

export default function UploadPrescription() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ocrText, setOcrText] = useState("");
    const [gemmaResponse, setGemmaResponse] = useState("");

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:1234/extract-text", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Clean up the OCR text
            const cleanOcrText = res.data.extractedText.replace(/\s+/g, ' ').trim();
            setOcrText(cleanOcrText);

            // Clean up Gemma's response
            const cleanGemma = res.data.gemmaResponse.replace(/\n+/g, '\n').trim();
            setGemmaResponse(cleanGemma);

        } catch (err) {
            console.error(err);
            alert("Failed to extract text");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "700px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#4a148c" }}>Prescription Upload & Analysis</h2>
            <div style={{ marginBottom: "20px" }}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button
                    onClick={handleUpload}
                    style={{
                        marginLeft: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#4a148c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Processing..." : "Upload & Extract"}
                </button>
            </div>

            {ocrText && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#fff3e0",
                    border: "1px solid #ffb74d",
                    borderRadius: "8px"
                }}>
                    <h3 style={{ color: "#ef6c00" }}>OCR Extracted Text:</h3>
                    <p style={{ whiteSpace: "pre-wrap", color: "#6d4c41" }}>{ocrText}</p>
                </div>
            )}

            {gemmaResponse && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#e0f7fa",
                    border: "1px solid #4dd0e1",
                    borderRadius: "8px"
                }}>
                    <h3 style={{ color: "#006064" }}>AI Prediction (Gemma 2):</h3>
                    <p style={{ whiteSpace: "pre-wrap", color: "#004d40" }}>{gemmaResponse}</p>
                </div>
            )}
        </div>
    );
}
