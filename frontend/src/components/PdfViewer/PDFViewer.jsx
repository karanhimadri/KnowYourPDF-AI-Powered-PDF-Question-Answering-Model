import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const file = useSelector((state) => state.fileHandler.file);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    return () => URL.revokeObjectURL(url); // Clean up the object URL
  }, [file]);

  return (
    <div style={{ textAlign: "center", marginTop: "56px" }}>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          style={{
            width: "100%",
            height: "668px",
            border: "1px solid black",
          }}
        ></iframe>
      )}
    </div>
  );
};

export default PDFViewer;
