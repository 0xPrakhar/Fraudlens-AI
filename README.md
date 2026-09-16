<div align="center">

# 🛡️ FraudLens AI

### AI-Powered Threat Detection & Phishing Protection Platform

**TNX Codathon Submission**
**TechNeekX**

[![Team Jugadu Geeks](https://img.shields.io/badge/Team-Jugadu%20Geeks-indigo?style=for-the-badge)](https://github.com/0xPrakhar/Fraudlens-AI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 🔎 Overview

**FraudLens AI** is an AI-powered cybersecurity platform designed to help users identify and analyze potentially malicious or fraudulent digital content.

The platform combines a **web dashboard, browser extension, AI-powered threat analysis, authentication, and multi-vector scanning** to provide users with security insights while browsing or investigating suspicious content.

FraudLens AI supports analysis of:

* 🌐 URLs
* 📝 Text (SMS/Messages)
* 📷 QR codes
* 🖼️ Screenshots (OCR)
* 🔗 Web content

The project was developed as a submission for **TNX Codathon by TechNeekX** by **Team Jugadu Geeks**.

---

# 💡 Problem Statement

Phishing and online scams increasingly use deceptive URLs, QR codes, social-engineering messages, and malicious web content to trick users into revealing sensitive information or making fraudulent payments.

Traditional blocklists and static detection methods can struggle with newly created or previously unseen threats.

FraudLens AI addresses this problem by combining:

> **Real-time browser monitoring + AI-assisted threat analysis + centralized scan history**

This allows users to investigate suspicious content and receive understandable security insights from a single platform.

---

# ✨ Key Features

### 🧠 AI-Powered Threat Analysis

Uses an advanced LLM-powered analysis pipeline (Google Gemini) to examine suspicious inputs and identify indicators associated with phishing, scams, and potentially malicious content.

The system generates a structured threat assessment with an explanation of the detected indicators, risk scores (0–100), and actionable safety guides.

---

### 🔌 Real-Time Browser Extension

A **Manifest V3 browser extension** monitors the active browsing environment and communicates with the FraudLens backend for threat analysis.

The extension can:

* Analyze active URLs
* Calculate/display threat information
* Show warnings for potentially risky websites
* Provide scan results through the extension popup
* Communicate with the central backend

---

### 🔄 Web-to-Extension Authentication

FraudLens connects the web application and browser extension through a shared authentication flow.

Firebase authentication (Google OAuth & Email/Password) is used to establish the user's identity, allowing authenticated users to access their relevant threat-analysis functionality across the platform.

---

### 📊 Threat History & Audit Logs

Scan results are stored securely so users can review previous security analyses.

The history system provides:

* Previous scan results
* Threat classifications
* Scan metadata
* User-specific records
* Centralized history across the platform

---

### 🔍 Multi-Vector Threat Scanner

FraudLens supports multiple input types:

| Scanner | Purpose |
| :--- | :--- |
| 🌐 URL Scanner | Analyze suspicious links |
| 📝 Text Scanner | Identify scam/phishing indicators |
| 📷 QR Scanner | Extract and analyze QR content[cite: 1] |
| 🖼️ Screenshot Scanner | Analyze suspicious visual content using OCR[cite: 1] |
| 🔌 Browser Scanner | Analyze URLs during browsing |

---

# 🏗️ System Architecture

```text
                        ┌──────────────────────────┐
                        │         User             │
                        └────────────┬─────────────┘
                                     │
                        ┌────────────┴────────────┐
                        │                         │
                        ▼                         ▼
                 ┌──────────────────┐      ┌────────────────────┐
                 │  FraudLens Web   │      │ Browser Extension  │
                 │ React + Vite     │      │ Manifest V3        │
                 │ Tailwind CSS     │      │ Service Worker     │
                 └────────┬─────────┘      └─────────┬──────────┘
                          │                          │
                          │      API Requests        │
                          └─────────────┬────────────┘
                                        ▼
                         ┌─────────────────────────┐
                         │   Node.js + Express     │
                         │      Backend API        │
                         └───────────┬─────────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
                 ▼                   ▼                   ▼
          ┌─────────────┐     ┌─────────────┐     ┌──────────────┐
          │   MongoDB   │     │ Gemini AI   │     │  Cloudinary  │
          │ Threat Data │     │ AI Analysis │     │ Media Files  │
          └─────────────┘     └─────────────┘     └──────────────┘
                                     │
                                     ▼
                         ┌─────────────────────────┐
                         │ Threat Assessment       │
                         │ + Explanation           │
                         └─────────────────────────┘
