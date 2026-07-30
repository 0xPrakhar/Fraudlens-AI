 🛡️ FraudLens

### AI-Powered Real-Time Scam Detection Platform

**Think Like AI. Defend Like a Cyber Expert.**


**FraudLens** is an AI-powered cybersecurity platform that helps users detect online scams in real time using Large Language Models (LLMs), OCR, and intelligent threat analysis.

---
## 👥 Team

| Member | Role | Contact |
|---------|------|---------|
| **Aman Yadav** | Frontend Development & AI Integration | amanyadav41569@gmail.com |
| **Adarsh Gupta** | Project Support & Testing Assistance | Gadrash441@gmail.com |
| **Prakhar Gupta** | Backend Development (Node.js, Database & Firebase), API Integration & Testing | prakhargupta9083@gmail.com |
| **Vinayak Chauhan** | Presentation (PPT), Documentation & Project Demonstration | shikhaashish1587@gmail.com |
| **Aditya Singh** | UI/UX Design & User Experience | thatadityasignh@gmail.com |


## 📖 Overview

Cyber scams are becoming increasingly sophisticated, making it difficult for everyday users to distinguish legitimate messages from fraudulent ones.

FraudLens leverages Artificial Intelligence to analyze suspicious content—including URLs, SMS messages, emails, and screenshots—and provides an instant risk assessment with human-readable explanations.

Instead of simply telling users **whether** something is dangerous, FraudLens explains **why**, helping improve cyber awareness while preventing fraud.

---

# 🚨 Problem Statement

Every day, millions of people fall victim to online scams such as:

- 📱 SMS Phishing (Smishing)
- 🌐 Phishing Websites
- 📧 Fraudulent Emails
- 💼 Fake Job Offers
- 💳 Banking Scams
- 🎁 Lottery & Prize Scams
- 📦 Fake Delivery Notifications

### Current Challenges

- Scam techniques evolve rapidly.
- Most users cannot identify phishing attempts.
- Existing tools focus on only one type of threat.
- Users often click suspicious links without verification.
- Non-technical users struggle to understand cybersecurity warnings.

---

# 💡 Our Solution

FraudLens is a centralized AI-powered scam detection platform capable of analyzing multiple types of digital threats from a single dashboard.

Using Google's Gemini AI, OCR, and intelligent security analysis, the platform generates:

- AI Risk Score
- Threat Classification
- Detailed Explanation
- Security Recommendations
- Scan History

---

# ✨ Key Features

## 📱 AI SMS Scam Detection

Analyze suspicious SMS messages and determine whether they are:

- ✅ Safe
- ⚠️ Suspicious
- 🚨 Scam

---

## 🌐 URL Scanner

Detect malicious links using AI-powered analysis.

Checks include:

- Suspicious domains
- Phishing indicators
- URL shortening services
- Social engineering patterns
- Brand impersonation

---

## 📧 Email Scam Analysis

Analyze email content to identify:

- Phishing attempts
- Credential theft
- Fake invoices
- Banking fraud
- Business Email Compromise (BEC)

---

## 🖼 Screenshot Scanner

Upload screenshots from:

- WhatsApp
- Gmail
- Telegram
- SMS
- Social Media

Workflow:

```
Upload Screenshot
        │
        ▼
OCR Extracts Text
        │
        ▼
Gemini AI Analysis
        │
        ▼
Risk Report Generated
```

---

## 🤖 AI Risk Assessment

Each scan receives:

- Risk Score (0–100)
- Threat Level
- AI Explanation
- Confidence Score
- Recommended Actions

---

## 📊 Dashboard

View all previous scans in one place.

Features include:

- Total Scans
- High Risk Alerts
- Recent Activity
- Community Reports
- Scan History

---

# ⚙️ How It Works

```
              User Input

                   │

      ┌────────────┼────────────┐

      ▼            ▼            ▼

    SMS          URL       Screenshot

                   │

                   ▼

             FraudLens API

                   │

         OCR (if image uploaded)

                   │

                   ▼

            Gemini AI Analysis

                   │

                   ▼

      Risk Score + Explanation

                   │

                   ▼

      Save History in Supabase

                   │

                   ▼

            User Dashboard
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

---

## Backend

- Nodejs
- Express & LLM API

---

## AI

- Google Gemini API
- Prompt Engineering
- OCR Integration

---

## Database

- MongoDB

---

## Authentication

- Firebase Auth

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB |

---

# 🏗 System Architecture

```
                 User

                  │

                  ▼

         React Web Application

          │               │

          ▼               ▼

   Firebase Auth       Backend

          │               │

          └──────┬────────┘

                 ▼

            Gemini API

                 │

                 ▼

        Scam Detection Engine

                 │

                 ▼

        Risk Analysis Report

                 │

                 ▼

         User Dashboard
```

---

# 📂 Project Structure

```
FraudLens/

├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
│
├── backend/
│   ├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── utils/
│
├── docs/
├── screenshots/
├── README.md
└── LICENSE
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/FraudLens.git

cd FraudLens
```

---
# 🌍 Future Scope

- 📱 Android Application
- 🧩 Chrome Extension
- 💬 WhatsApp Scam Scanner
- 🎙 Voice Scam Detection
- 🛡 Browser Protection
- 🌐 Multi-language Support
- 🤝 Community Threat Intelligence
- 🔔 Real-time Threat Alerts

---

# 🎯 Expected Impact

FraudLens aims to:

- Reduce online financial fraud
- Protect students and senior citizens
- Improve cybersecurity awareness
- Provide instant scam detection
- Explain AI decisions in simple language
- Help users make safer online decisions

---

# 📸 Demo

Coming Soon

- Live URL Scan
- SMS Detection
- Screenshot Analysis
- AI Risk Report
- Dashboard

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Team

**FraudLens Team**

Building AI-powered cybersecurity solutions to create a safer digital world.

### ⭐ If you found this project useful, don't forget to star the repository!

**Made with ❤️ for Hackathons & Cybersecurity**

