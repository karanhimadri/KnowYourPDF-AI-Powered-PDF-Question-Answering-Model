# KnowYourPDF – AI-Powered PDF Question Answering 🧠📄

KnowYourPDF is a **full-stack AI web application** that enables users to upload PDFs and ask questions about the content. It uses the **Gemini API** to process documents and deliver accurate, real-time answers — mimicking a natural chat experience.

🔗 **Live Demo:** [LINK](https://your-live-link.com)  

---

## ⚙️ Tech Stack

- **Architecture:** Based on Model-View-Controller (MVP)
- **Frontend:** React.js, CSS, Bootstrap
- **Backend:** Express.js (Node.js)
- **AI Integration:** Gemini API (Google)
- **Authentication:** JWT (Cookies)
- **Email Service:** Nodemailer (for password reset)
- **Tools:** Git, GitHub

---

## 🚀 Key Features

- 📄 Upload PDFs and interact via **AI-powered Q&A** using the Gemini API.
- 🔐 **User Auth Flow**: Sign up, login, logout, and **password reset via email** (secure token system).
- 🧠 Conversational chat UI for seamless query and response experience.
- 🍪 Session management with **JWT stored in cookies** for security.
- 📱 Fully responsive design for desktop and mobile users.

---

## 📂 Quick Setup

```bash
# Clone Repo
git clone https://github.com/yourusername/knowyourpdf.git && cd knowyourpdf

# Backend Setup
cd backend && npm install
# Add .env with your config (see below)
npm start

# Frontend Setup
cd ../frontend && npm install
npm start
```

## 🔐 .env Example (Project_Backend)

```bash
GEMINI_API_KEY = your_gemini_api_key
PORT = your_port
```

## 🔐 .env Example (Authentication_Backend)

```bash
PORT = your_port
MONGO_URI = your_mongodb_url
JWT_SECRET = jwt_secrec_text
NODE_ENV = "devlopment" or "production" (set_as_your_preference)
SMTP_USER = smtp_service_provide_name
SMTP_PASS = smtp_pass
SENDER_EMAIL = your_smtp_register_email
```
# Thank You
