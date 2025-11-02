import React from "react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FButton from "./FButton";

const AIPlanOutput = ({ plan, onBack }) => {
  const handleDownloadPDF = async () => {
    const content = document.getElementById("plan-content");
    const canvas = await html2canvas(content, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("AI_Fitness_Diet_Plan.pdf");
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "900px" }}>

      <div
        className="p-4 mb-4 text-white rounded shadow-sm"
        style={{
          background: "linear-gradient(90deg, #4b6cb7, #182848)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 className="fw-bold mb-1">
            <i className="fas fa-brain me-2"></i>Your AI-Generated Fitness Plan
          </h3>
          <p className="mb-0 text-light">Smart. Personalized. Science-Driven. 💪</p>
        </div>
        <div className="d-flex gap-2">
          <FButton text="⬅ Back" variant="light" onClick={onBack} />
          <FButton text="📄 Save as PDF" variant="success" onClick={handleDownloadPDF} />
        </div>
      </div>

 
      <div
        id="plan-content"
        className="bg-white border rounded shadow p-4"
        style={{
          lineHeight: "1.7",
          fontSize: "16px",
          transition: "0.3s ease",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-primary border-bottom pb-2 mt-3"
                style={{ fontWeight: "700" }}
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-dark border-bottom pb-1 mt-4"
                style={{ fontWeight: "600" }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-1" style={{ listStyle: "disc inside" }} {...props} />
            ),
          }}
        >
          {plan}
        </ReactMarkdown>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default AIPlanOutput;
