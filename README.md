# 🛡️ FraudLens AI

### See Through the Scam. Browse With Confidence.

**An AI-powered cybersecurity platform for analyzing suspicious URLs, phishing messages, QR codes, screenshots, and potentially malicious web content.**

FraudLens AI brings multi-vector threat analysis, browser-based protection, and centralized scan history together in one platform—helping users investigate suspicious digital content and make more informed security decisions.

<p align="center">
  <a href="https://github.com/0xPrakhar/Fraudlens-AI">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
  <img src="https://img.shields.io/badge/AI-Powered-7C3AED?style=for-the-badge" alt="AI Powered">
  <img src="https://img.shields.io/badge/Cybersecurity-Threat%20Analysis-0F766E?style=for-the-badge" alt="Cybersecurity">
  <img src="https://img.shields.io/badge/Browser%20Extension-Manifest%20V3-2563EB?style=for-the-badge" alt="Browser Extension">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge" alt="MIT License">
  </a>
</p>

---

## 📌 Table of Contents

* [Overview](#-overview)
* [The Problem](#-the-problem)
* [Our Solution](#-our-solution)
* [Key Features](#-key-features)
* [Multi-Vector Threat Analysis](#-multi-vector-threat-analysis)
* [How It Works](#-how-it-works)
* [System Architecture](#-system-architecture)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Configuration](#-environment-configuration)
* [Security Considerations](#-security-considerations)
* [Limitations](#-limitations)
* [Future Roadmap](#-future-roadmap)
* [Team](#-team)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🔎 Overview

Online fraud is no longer limited to suspicious emails. Attackers use deceptive websites, shortened URLs, QR codes, fraudulent messages, and manipulated screenshots to make malicious activities appear legitimate.

**FraudLens AI is designed to help users investigate these threats through a unified cybersecurity platform.**

The platform combines a web application, an AI-assisted analysis pipeline, a browser extension, and a centralized backend to provide security insights across multiple types of digital content.

Rather than relying exclusively on a single input type, FraudLens AI supports several investigation workflows within one application.

### What makes FraudLens AI different?

* **Multi-vector analysis:** Investigate URLs, text messages, QR codes, screenshots, and web content.
* **AI-assisted explanations:** Understand why an input may be suspicious instead of receiving only a basic warning.
* **Browser integration:** Access URL analysis and potential threat warnings through a Manifest V3 browser extension.
* **Centralized scan history:** Review previous analyses and associated threat assessments.
* **Connected authentication:** Integrate the web application and browser extension through a shared identity and authentication workflow.
* **Actionable security insights:** Present risk assessments and safety recommendations to help users make informed decisions.

> **Our goal:** Make cybersecurity analysis more accessible, understandable, and convenient for everyday internet users.

---

## 🎯 The Problem

Cybercriminals exploit trust, urgency, curiosity, and a lack of technical awareness to manipulate internet users.

Common attack patterns include:

* Phishing websites that imitate legitimate services.
* Fraudulent messages requesting payments or sensitive information.
* Malicious or misleading QR codes.
* Deceptive links distributed through social media and messaging platforms.
* Screenshots containing fraudulent offers, payment requests, or impersonation attempts.
* Suspicious web content designed to manipulate users into unsafe actions.

Traditional blocklists can identify known threats, but newly created or modified attacks may not immediately appear in those lists.

Users also frequently lack the technical knowledge required to interpret suspicious URLs, recognize social-engineering techniques, or understand why particular content may be dangerous.

### The challenge

How can users investigate suspicious digital content through a single, accessible interface while receiving understandable security insights?

**FraudLens AI explores this challenge by combining AI-assisted analysis, multiple scanning methods, browser integration, and centralized scan management.**

---

## 💡 Our Solution

FraudLens AI provides an integrated environment for examining potentially fraudulent digital content.

The platform follows four core principles:

| Principle             | Implementation                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Accessibility         | A web interface for submitting and investigating suspicious content.                           |
| Multi-vector analysis | Dedicated workflows for URLs, text, QR codes, screenshots, and browser-based investigation.    |
| Explainability        | AI-generated explanations and risk assessments intended to make findings easier to understand. |
| Continuity            | Authentication and scan-history functionality that connect investigations across the platform. |

The result is a unified workflow that helps users move from uncertainty to a more informed assessment of potentially suspicious content.

---

## ✨ Key Features

### 🧠 1. AI-Powered Threat Analysis

FraudLens AI integrates a large language model-based analysis pipeline to examine suspicious inputs and identify indicators associated with phishing, scams, and potentially malicious activity.

Depending on the analysis workflow, results can include:

* Threat classification.
* A numerical risk assessment.
* Explanations of suspicious indicators.
* Contextual security insights.
* Recommended precautions and next steps.

The purpose is not simply to label content as suspicious, but to help users understand the reasoning behind an assessment.

**Technology:** Gemini AI integration.

*Note: AI-generated assessments are advisory and may be inaccurate. They should not be treated as definitive proof that content is safe or malicious.*

### 🌐 2. URL Scanner

Investigate suspicious links before interacting with them.

The URL analysis workflow helps examine potentially deceptive web addresses and identify indicators associated with phishing or online fraud.

Potential investigation areas include:

* Suspicious URL patterns.
* Deceptive or misleading address structures.
* Indicators associated with phishing attempts.
* AI-assisted interpretation of the submitted URL.

The scanner is intended to support investigation, not guarantee that a website is safe.

### 📝 3. Text and Message Scanner

Analyze suspicious text, including SMS messages and other written content.

The analysis can help identify potential social-engineering indicators, such as:

* Unusual urgency or pressure.
* Suspicious payment requests.
* Requests for credentials or sensitive information.
* Deceptive claims and potentially fraudulent offers.

This workflow helps users examine the content of a message before deciding how to respond.

### 📷 4. QR Code Scanner

QR codes can conceal the destination of a link behind an ordinary-looking visual pattern.

FraudLens AI supports a QR-code investigation workflow that extracts QR content for further analysis.

This helps users investigate potentially suspicious destinations without relying solely on the visual appearance of the QR code.

**Important:** A QR code is not inherently malicious. Its destination and context determine the associated risk.

### 🖼️ 5. Screenshot Analysis with OCR

Suspicious content is often encountered in screenshots rather than directly accessible web pages.

The screenshot analysis workflow uses optical character recognition (OCR) to extract text from images for further investigation.

Possible use cases include examining:

* Suspicious payment requests.
* Fraudulent promotional offers.
* Impersonation attempts.
* Messages containing potentially deceptive claims.
* Screenshots of suspicious online content.

The quality of extracted text depends on the image's clarity, layout, and language.

### 🔌 6. Browser Extension

FraudLens AI extends its investigation capabilities into the browser through a Manifest V3 browser extension.

The extension connects with the backend to support browser-oriented threat analysis.

Its intended capabilities include:

* Analyzing the active URL.
* Displaying threat information.
* Showing warnings for potentially risky websites.
* Presenting scan results through the extension popup.
* Communicating with the centralized backend.

This integration brings threat investigation closer to the point where users encounter suspicious content.

**Security principle:** The extension should assist users in making informed decisions rather than presenting AI assessments as infallible security guarantees.

### 🔐 7. Authentication Across the Platform

FraudLens AI integrates Firebase Authentication into its user-access workflow.

The authentication implementation supports Google OAuth and email/password authentication.

The platform is designed to connect the web application and browser extension through a shared authentication flow, allowing authenticated users to access supported functionality across both interfaces.

Authentication establishes user identity; backend authorization must independently verify whether a request is permitted.

### 📊 8. Scan History and Audit Records

FraudLens AI incorporates centralized scan-history functionality to help users review previous investigations.

Depending on the supported record fields, stored information can include:

* Previous scan results.
* Threat classifications.
* Risk assessments.
* Scan metadata.
* User-associated records.

This makes it easier to revisit earlier analyses instead of treating each investigation as an isolated event.

Access to historical records should be restricted to the appropriate authenticated user.

---

## 🔍 Multi-Vector Threat Analysis

FraudLens AI supports several investigation paths within one platform.

| Scanner            | Input                     | Primary Purpose                                               |
| ------------------ | ------------------------- | ------------------------------------------------------------- |
| URL Scanner        | Web address               | Investigate potentially suspicious links.                     |
| Text Scanner       | SMS or written text       | Examine potential phishing and social-engineering indicators. |
| QR Scanner         | QR code                   | Extract encoded content for further investigation.            |
| Screenshot Scanner | Image or screenshot       | Extract text through OCR and analyze suspicious content.      |
| Browser Scanner    | Active browser URL        | Support threat investigation while browsing.                  |
| Scan History       | Previous analysis records | Review earlier investigations and results.                    |

Each scanner addresses a different way users encounter potentially fraudulent content.

Combining these workflows provides a more flexible investigation experience than relying on a single type of input.

---

## ⚙️ How It Works

A typical investigation follows this workflow:

**Step 1 — Submit or encounter suspicious content**

The user submits a URL, text message, QR code, or screenshot, or initiates an analysis through the browser extension.

**Step 2 — Process the input**

The relevant workflow prepares the submitted content for analysis. For screenshots, this can include OCR-based text extraction; for QR codes, it can include extracting the encoded content.

**Step 3 — Send the analysis request**

The frontend or browser extension communicates with the backend API.

**Step 4 — Perform AI-assisted analysis**

The backend integrates with the configured AI service to evaluate the input and produce a structured assessment.

**Step 5 — Present the results**

The application presents the available threat classification, risk assessment, explanation, and safety recommendations.

**Step 6 — Preserve the investigation**

Where supported by the implementation, the scan result is stored so the user can review the analysis later.

### Workflow at a glance

```text
                 USER
                   |
          +--------+---------+
          |                  |
          v                  v
      WEB APP          BROWSER EXTENSION
          |                  |
          +--------+---------+
                   |
                   v
            BACKEND API
          Node.js + Express
                   |
          +--------+---------+
          |                  |
          v                  v
      AI ANALYSIS        DATA STORAGE
       Gemini AI           MongoDB
          |
          v
   THREAT ASSESSMENT
          |
          v
  EXPLANATION & SAFETY
    RECOMMENDATIONS
          |
          v
     RESULTS DISPLAY
```

*This diagram represents the logical architecture. Exact request flows, persistence behavior, and integrations depend on the implemented scanner and backend endpoints.*

---

## 🏗️ System Architecture

FraudLens AI uses a layered architecture to separate the user interface, backend processing, AI integration, authentication, and data persistence.

### 1. Presentation Layer

**React + Vite + Tailwind CSS**

Responsible for the web interface, user interactions, input submission, and presentation of analysis results.

### 2. Browser Integration Layer

**Browser Extension — Manifest V3**

Connects browser-oriented interactions with the backend analysis workflow and displays supported threat information through the extension interface.

### 3. Backend Layer

**Node.js + Express**

Provides the API layer responsible for processing application requests and coordinating the supported analysis workflows.

### 4. AI Analysis Layer

**Gemini AI**

Provides language-model-based analysis for supported inputs and helps generate structured security assessments.

### 5. Authentication Layer

**Firebase Authentication**

Supports user sign-in through Google OAuth and email/password authentication.

### 6. Data Layer

**MongoDB**

Supports persistence of scan records and associated application data, according to the implemented data models.

### 7. Media Layer

**Cloudinary**

Provides media storage and management capabilities where integrated into the application's workflows.

---

## 🛠️ Technology Stack

The following table summarizes the technologies used in the project.

| Category            | Technology              | Purpose                                        |
| ------------------- | ----------------------- | ---------------------------------------------- |
| Frontend            | React                   | Component-based user interface.                |
| Build Tool          | Vite                    | Frontend development and build tooling.        |
| Styling             | Tailwind CSS            | Utility-first interface styling.               |
| Backend             | Node.js                 | JavaScript runtime for server-side processing. |
| API Framework       | Express.js              | HTTP API and backend routing.                  |
| Database            | MongoDB                 | Persistence of supported application data.     |
| AI Integration      | Google Gemini           | AI-assisted threat analysis.                   |
| Authentication      | Firebase Authentication | User authentication.                           |
| Media Storage       | Cloudinary              | Media storage and management.                  |
| Browser Integration | Manifest V3             | Browser extension architecture.                |
| Image Processing    | OCR                     | Text extraction from supported screenshots.    |

---

## 📂 Project Structure

The project contains a web application, a backend API, and a browser extension.

A simplified logical representation is shown below:

```text
Fraudlens-AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   └── ...
│
├── extension/
│   ├── manifest.json
│   ├── popup/
│   └── ...
│
├── README.md
└── LICENSE
```

**Note:** This is an illustrative structure, not a verified listing of the repository's actual directories. Adjust the paths and names to match the codebase before publishing this section.

---

## 🚀 Getting Started

Follow these steps to run FraudLens AI locally.

### Prerequisites

Install the following tools before beginning:

* Node.js and npm.
* Git.
* MongoDB or an appropriately configured MongoDB connection.
* Firebase project credentials.
* Gemini API credentials.
* Cloudinary credentials if required by the selected workflows.

### 1. Clone the Repository

```bash
git clone https://github.com/0xPrakhar/Fraudlens-AI.git
```

Navigate into the cloned project:

```bash
cd Fraudlens-AI
```

### 2. Install Dependencies

Install the dependencies separately for the frontend and backend, using their respective package directories.

For example, if both directories contain their own `package.json` files:

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

*If your repository uses different directory names or a workspace-based setup, follow the actual project structure.*

### 3. Configure Environment Variables

Create the necessary local environment configuration files using the variables expected by your application.

Configure the database, AI service, authentication, media storage, and API settings required by the relevant components.

See [Environment Configuration](#-environment-configuration) below.

### 4. Start the Backend

From the backend directory, run the development command defined in its `package.json`.

A common example is:

```bash
npm run dev
```

### 5. Start the Frontend

From the frontend directory, run:

```bash
npm run dev
```

Open the local development URL displayed by Vite in your terminal.

### 6. Configure the Browser Extension

1. Open your browser's extension management page.
2. Enable developer mode.
3. Select the option to load an unpacked extension.
4. Choose the actual extension directory containing `manifest.json`.
5. Configure the extension to communicate with your local backend, as required by its implementation.

Ensure the backend URL, extension permissions, and authentication configuration are appropriate for your environment.

---

## 🔑 Environment Configuration

FraudLens AI depends on external services for some of its functionality.

Typical configuration categories include:

| Configuration               | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| Backend port                | Determines the local server port.              |
| MongoDB connection string   | Connects the backend to the database.          |
| Gemini API key              | Enables supported AI analysis workflows.       |
| Firebase configuration      | Connects the authentication workflow.          |
| Cloudinary credentials      | Enables supported media operations.            |
| Frontend API base URL       | Identifies the backend API.                    |
| Extension API configuration | Connects the browser extension to the backend. |

The actual variable names must match those referenced in the application code.

**Never commit real API keys, database credentials, access tokens, service-account files, or production secrets to GitHub.**

Use local environment files, exclude sensitive files through `.gitignore`, and configure production secrets through your deployment provider.

---

## 🔐 Security Considerations

FraudLens AI is a cybersecurity-oriented project, so the security of the platform itself matters as much as the analysis it provides.

Important considerations include:

* **Secret management:** Keep AI API keys and database credentials on the server whenever possible.
* **Authentication:** Validate authentication credentials on protected backend endpoints.
* **Authorization:** Enforce user-level access controls for private scan records.
* **Input validation:** Validate and constrain URLs, text, files, and other submitted content.
* **File handling:** Restrict file types and sizes and handle uploaded content safely.
* **Browser permissions:** Request only the extension permissions needed for implemented functionality.
* **Privacy:** Avoid retaining unnecessary sensitive information from messages, screenshots, or URLs.
* **Error handling:** Avoid exposing secrets, stack traces, or internal configuration in API responses.
* **External requests:** If server-side URL fetching is implemented, protect against server-side request forgery (SSRF), including requests to internal networks and cloud metadata services.
* **AI output validation:** Treat model-generated results as untrusted output and validate structured responses before using them.

These are important security practices and review areas; their inclusion in this README does not, by itself, establish that every control is already implemented.

---

## ⚠️ Limitations

FraudLens AI is designed to assist with threat investigation, not replace comprehensive security controls or professional incident response.

Users should be aware that:

* AI-generated results can contain errors or false positives.
* A low risk score does not guarantee that a URL, message, or website is safe.
* Previously unseen threats may not be identified.
* OCR quality can affect screenshot analysis.
* Browser analysis depends on the extension's implemented permissions and monitoring behavior.
* Authentication and scan history depend on correct configuration and access controls.
* The platform's conclusions depend on the quality of the submitted content and the analysis methods available.

**Always verify critical security decisions through independent evidence. Never enter passwords, financial details, or sensitive information into a suspicious website merely because a scanner reports a low risk.**

---

## 🗺️ Future Roadmap

Potential improvements for future versions include:

* [ ] Integrate reputable URL reputation and threat-intelligence sources.
* [ ] Add more comprehensive domain and certificate analysis.
* [ ] Improve detection using carefully evaluated security indicators.
* [ ] Introduce configurable warning levels and user preferences.
* [ ] Expand browser-extension usability and protection workflows.
* [ ] Improve scan-history filtering and investigation management.
* [ ] Add automated testing for scanner endpoints and authentication flows.
* [ ] Introduce evaluation datasets for measuring false-positive and false-negative rates.
* [ ] Improve privacy controls and data-retention policies.
* [ ] Add security monitoring and operational observability.

These are proposed enhancements rather than claims about currently available functionality.

---

## 👥 Meet the Team

FraudLens AI is developed by **Team Jugadu Geeks**, with a shared focus on cybersecurity, artificial intelligence, and practical software engineering.

<table>
  <tr>
    <td align="center">
      <strong>Prakhar Gupta</strong>
    </td>
    <td align="center">
      <strong>Aman Yadav</strong>
    </td>
    <td align="center">
      <strong>Aditya Singh</strong>
    </td>
    <td align="center">
      <strong>Adarsh Gupta</strong>
    </td>
  </tr>
</table>

We believe cybersecurity tools should help people understand digital threats, not simply overwhelm them with technical warnings.

**Team:** Jugadu Geeks

**Repository:** [FraudLens AI on GitHub](https://github.com/0xPrakhar/Fraudlens-AI)

---

## 🤝 Contributing

Contributions, constructive feedback, bug reports, and feature suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and test your improvements.
4. Submit a pull request describing the changes.

For security vulnerabilities, avoid publishing sensitive exploit details or credentials in public issues. Use an appropriate private reporting channel when one is available.

---

## 📄 License

FraudLens AI is distributed under the **MIT License**.

See the [LICENSE file](LICENSE) for the applicable terms.

---

<p align="center">
  <strong>FraudLens AI</strong><br>
  Investigate Suspicious Content. Understand Potential Threats. Browse More Safely.
</p>
