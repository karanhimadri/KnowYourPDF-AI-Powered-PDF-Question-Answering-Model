require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

// CORS Setup
app.use(
  cors({
    origin: "*", // Update as necessary for production
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const upload = multer({ dest: "uploads/" });
const UPLOAD_PATH = "uploads/uploaded.pdf";

if (!process.env.GEMINI_API_KEY || !process.env.PORT) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to ask Gemini with optional context
async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text() || "No answer found.";
  } catch (err) {
    return `Error querying Gemini API: ${err.message}`;
  }
}

// Extract text from PDF
async function extractTextFromPDF(pdfPath) {
  try {
    console.log(`Extracting text from: ${pdfPath}`); // Log file path
    const data = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(data);
    console.log("Extracted text length:", pdfData.text.length); // Log text length
    return pdfData.text || "No text found in the PDF.";
  } catch (err) {
    console.error("PDF extraction error:", err); // Log errors
    return `Error extracting text from PDF: ${err.message}`;
  }
}

// Simple root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Upload endpoint
app.post("/upload/file", upload.single("file"), (req, res) => {
  if (!req.file || !req.file.mimetype.includes("pdf")) {
    return res
      .status(400)
      .send({ message: "Invalid file type. Only PDFs are allowed." });
  }

  try {
    fs.renameSync(req.file.path, UPLOAD_PATH);
    res
      .status(200)
      .send({ success: true, message: "File uploaded successfully!" });
  } catch (err) {
    res.status(500).send({ message: `Error saving file: ${err.message}` });
  }
});

// Query endpoint with context handling
app.get("/api/query", async (req, res) => {
  const question = req.query.q;
  const context = req.query.context === "true"; // Ensure context is a boolean

  if (!question) {
    return res.status(400).send({ message: "No query provided." });
  }

  try {
    let prompt;
    if (context) {
      if (!fs.existsSync(UPLOAD_PATH)) {
        return res.status(400).send({ message: "No uploaded PDF file found." });
      }
      const pdfData = await extractTextFromPDF(UPLOAD_PATH);
      prompt = `Use the following context to answer the question:\n\n${pdfData}\n\nQuestion: ${question}`;
    } else {
      prompt = question;
    }

    const answer = await askGemini(prompt);
    res.send({ message: answer });
  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err.message}` });
  }
});

// Start server
const LOCAL_IP = '192.168.0.149'
app.listen(process.env.PORT,LOCAL_IP, () => {
  console.log(`Server running at http://${LOCAL_IP}:${process.env.PORT}`);
});
