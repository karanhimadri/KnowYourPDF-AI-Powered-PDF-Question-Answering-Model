import React from "react";
import "./Workingpage.css";
import PDFViewer from "../../components/PdfViewer/PDFViewer";
import Resultbar from "../../components/ResultBar/Resultbar";
import Inputbar from "../../components/InputBar/Inputbar";
import FileUploader from "../../components/DragAndDrop/FileUploader";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Workingpage = () => {
  const file = useSelector((state) => state.fileHandler.file);

  return (
    <div className="working-page-container">
      <div className="pdf-viewer-container">
        {file === null ? <FileUploader /> : <PDFViewer />}
      </div>
      <div className="user-working-container">
        <div className="result-bar">
          <Resultbar />
        </div>
        <div className="input-bar">
          <Inputbar />
        </div>
      </div>
    </div>
  );
};

export default Workingpage;
