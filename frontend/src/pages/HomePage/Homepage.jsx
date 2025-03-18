import React, { useEffect } from "react";
import "./Homepage.css";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthDetails } from "../../features/authDetails/authSlice";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthDetails());
  }, []);

  return (
    <div className="kypdf-container">
      <div className="homapage-container">
        <div className="homepage-inner-container">
          <h2>Chat with any PDF document</h2>
          <p className="para">
            From legal agreements to financial reports, KnowYourPDF.ai brings
            your documents to life. You can ask questions, get summaries, find
            information, and more.
          </p>
          <div className="homepage-btns">
            <button className="hp-gsff">Get started for free</button>
            <button className="hp-ttd" onClick={() => navigate("/pdf-chat")}>
              Try the demo
              <p className="hp-arrow-icon">
                <FaArrowRightLong />
              </p>
            </button>
          </div>
          <div className="homepage-img-icons">
            <img src="https://pdf.ai/assets/customers/rita.jpg" alt="" />
            <img src="https://pdf.ai/assets/customers/christina.jpg" alt="" />
            <img src="https://pdf.ai/assets/customers/courtney.jpg" alt="" />
            <img src="https://pdf.ai/assets/customers/irene.jpg" alt="" />
            <img src="https://pdf.ai/assets/customers/etty.jpg" alt="" />
            <p>Loved by 1,500,000+ happy users and counting!</p>
          </div>
        </div>
      </div>
      <div className="homepage-second-container">
        <div className="homepage-second-inner-container">
          <div className="hp-block block1">
            <div className="image1">
              <img src="https://pdf.ai/upload-documents.svg" alt="" />
            </div>
            <h1>Upload documents</h1>
            <p>Easily upload the PDF documents you'd like to chat with.</p>
          </div>
          <div className="hp-block block2">
            <div className="image2">
              <img src="https://pdf.ai/instant-answers.svg" alt="" />
            </div>
            <h1>Instant answers</h1>
            <p>
              Ask questions, extract information, and summarize documents with
              AI.
            </p>
          </div>
          <div className="hp-block block3">
            <div className="image3">
              <img src="https://pdf.ai/sources-cited.svg" alt="" />
            </div>
            <h1>Sources included</h1>
            <p>
              Every response is backed by sources extracted from the uploaded
              document.
            </p>
          </div>
        </div>
      </div>
      <div className="homepage-third-container">
        <div className="homepage-testimonials">
          <div className="test1">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x80/c3f2b4981d/1.svg"
              alt=""
            />
            <h5>Your PDF, AI’s Insights</h5>
            <p>
              Say goodbye to reading through long documents and research papers.
              Our AI PDF reader takes your lengthy PDF files and extracts key
              insights in seconds. You’ve got questions, AI’s got instant
              answers.
            </p>
          </div>
          <div className="test1 bl-2">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x80/408f7b44ec/2.svg"
              alt=""
            />
            <h5>PDF AI on Any Device</h5>
            <p>
              AI PDF works in your browser. That means you can analyze your PDF
              files on Mac, Windows, Linux, and mobile. All you need is an
              internet connection.
            </p>
          </div>
          <div className="test1 bl-3">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x80/147007a341/3.svg"
              alt=""
            />
            <h5>Unlimited Access, Unlimited Potential</h5>
            <p>
              Access AI PDF with no restrictions. Ask all you like, and keep
              refining your prompts until you get exactly what you need. No
              cost. No signup. Just easy insights.
            </p>
          </div>
        </div>
        <div className="homepage-testimonials">
          <div className="test1">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x81/503ee1cd4e/5.svg"
              alt=""
            />
            <h5>Automatic AI Text Recognition</h5>
            <p>
              When you upload your file, the Smallpdf AI tool reads your text
              with precision. It even converts images to readable PDFs. It's
              effortless AI document analysis for concise summaries.
            </p>
          </div>
          <div className="test1">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x80/25ce147de5/4.svg"
              alt=""
            />
            <h5>Like Chatting With a (Very Smart) Friend</h5>
            <p>
              Our AI PDF reader instantly scans the content of your files and
              waits for your questions. Even if it’s your first time with PDF
              AI, our intuitive interface makes complex tasks easy.
            </p>
          </div>
          <div className="test1">
            <img
              src="https://s.smallpdf.com/static/cms/f/102628/80x81/bd28bbfce3/6.svg"
              alt=""
            />
            <h5>Copy-Paste With a Click</h5>
            <p>
              Every AI response comes with a click-to-copy button. So you can
              grab what you need with a single click, and carry it with you to
              your next task. It couldn’t be simpler.
            </p>
          </div>
        </div>
      </div>
      <hr className="hr-tag" />
      <Footer />
    </div>
  );
};

export default Homepage;
