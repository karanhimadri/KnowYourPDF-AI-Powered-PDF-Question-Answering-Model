import React, { useEffect, useRef } from "react";
import "./Resultbar.css";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { marked } from "marked";
import Prism from "prismjs"; // Import Prism
import "prismjs/components/prism-javascript"; // Add language support as needed
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";

const Resultbar = () => {
  const messages = useSelector((state) => state.chatsHandler.messages) ?? [];
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    Prism.highlightAll(); // Highlight code blocks after rendering
  }, [messages]);

  const parseMarkdown = (text) => {
    if (!text) return { __html: "" }; // Return empty if text is null or undefined

    return {
      __html: marked(text, {
        highlight: (code, lang) => {
          if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
          }
          return code; // Return plain code if language is not recognized
        },
      }),
    };
  };

  return (
    <div className="code-output-container">
      {messages.length === 0 ? (
        <h1 className="code-output-heading">
          Hi, Welcome to <span>KnowYourPDF !</span>
        </h1>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="message-box">
            <div className="input-msg">
              <button className="input-icon">
                <MdAccountCircle />
              </button>
              <span className="input-span">{msg.input}</span>
            </div>
            <div className="output-msg">
              <pre>
                <code
                  dangerouslySetInnerHTML={parseMarkdown(msg.output)}
                ></code>
              </pre>
            </div>
          </div>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Resultbar;
