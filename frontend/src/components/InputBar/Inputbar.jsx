import React, { useRef, useEffect, useState } from "react";
import "./Inputbar.css";
import { FaFilePdf } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../features/files/fileSlice";
import { handleInputMessageAndContext } from "../../features/userChats/chatSlice";
import { handleFileDisribution } from "../../features/files/fileSlice";

const Inputbar = () => {
  const textareaRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState("");
  const { loadingState } = useSelector((state) => state.chatsHandler);
  const dispatch = useDispatch();
  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };

  const fileHandller = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      dispatch(uploadFile(selectedFile));
      dispatch(handleFileDisribution(selectedFile));
    } else if (selectedFile) {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSendButton = () => {
    if (!text.trim()) {
      console.log("please enter a questions");
      return;
    }
    console.log(isChecked);
    dispatch(
      handleInputMessageAndContext({ inputMessage: text, context: isChecked })
    );
    setText("");
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleInput = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", handleInput);

    // Cleanup to avoid memory leaks
    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div className="input-bar-container">
      <div className="inner-bar-container">
        <div className="textarea-input-field">
          <textarea
            onChange={handleOnChange}
            ref={textareaRef}
            name="input-textarea"
            id="text-area"
            placeholder="Ask your Question ...."
            value={text}
          ></textarea>
          <div className="send-btn">
            <button onClick={handleSendButton} disabled={loadingState}>
              {loadingState ? (
                <div class="spinner-grow text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <LuSend className="icon" />
              )}
            </button>
          </div>
        </div>
        <div className="option-field">
          <div className="context-field">
            <input
              id="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckBox}
            />
            <label htmlFor="checkbox">Use context</label>
          </div>
          <div className="upload-file">
            <input
              type="file"
              id="upload"
              accept="application/pdf"
              hidden
              onChange={fileHandller}
            />
            <label htmlFor="upload">
              <FaFilePdf className="pdf-icon" /> Import pdf
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputbar;
