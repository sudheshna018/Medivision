# 🧠 MedVision — AI-Powered Brain Tumor Analysis System

MedVision is an **AI-driven medical imaging system** designed to assist in **brain tumor detection and classification** using MRI scans.  
It combines **U-Net** for image segmentation and a **Vision Transformer (ViT)** for multi-organ tumor classification, wrapped in an intuitive web interface for doctors and patients.

---

## 🚀 Project Overview

Brain tumor diagnosis from MRI scans often requires expert radiologists and is time-consuming.  
**MedVision** automates this process by:
- Segmenting tumor regions from MRI images
- Classifying tumor type using deep learning
- Providing real-time inference through a web interface

The goal is to leverage **AI and Vision Transformers** to make medical diagnostics **faster, more accurate, and accessible**.

---

## 🧩 System Architecture

      ┌─────────────────────┐
      │  Frontend (React)   │
      │  Upload MRI Image   │
      └────────┬────────────┘
               │
               ▼
      ┌─────────────────────┐
      │  Flask Backend API  │
      │   (Python)          │
      │   - Segmentation    │
      │   - Classification  │
      └────────┬────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │    Deep Learning Models    │
    │                            │
    │ U-Net  →  Segmentation     │
    │ ViT    →  Classification   │
    └────────────────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │  Visualization & Reporting │
    │  - Mask overlay            │
    │  - Confidence scores       │
    │  - Doctor notes & reports  │
    └────────────────────────────┘

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + TypeScript + Tailwind CSS |
| **Backend** | Flask (Python) |
| **Models** | TensorFlow (U-Net) & PyTorch (Vision Transformer) |
| **Data** | MRI brain scans (custom/preprocessed dataset) |
| **Hosting (Models)** | Hugging Face Hub |
| **Environment** | Virtualenv / Conda |
| **Version Control** | Git & GitHub |

---

## ✨ Features

✅ **MRI Upload Portal** — Patients can upload MRI scans easily.  
✅ **Real-time Tumor Segmentation** — Using U-Net for precise region extraction.  
✅ **Multi-class Tumor Classification** — ViT model predicts tumor category.  
✅ **Confidence Visualization** — Displays probabilities for each class.  
✅ **Report Generation** — Doctor dashboard for notes and case tracking.  
✅ **Seamless Model Hosting** — Models hosted on Hugging Face, auto-downloaded at runtime.  

---

## 🤗 Model Hosting via Hugging Face

Both trained models are hosted publicly on the **Hugging Face Hub** for easy access.

🔗 **Model Repository:** [https://huggingface.co/Sudheshna18/Medivision_Models](https://huggingface.co/Sudheshna18/Medivision_Models)

When you run the Flask backend, models are automatically fetched:

```python
from huggingface_hub import hf_hub_download

UNET_MODEL_PATH = hf_hub_download(repo_id="Sudheshna18/Medivision_Models", filename="unet_best.keras")
VIT_MODEL_PATH  = hf_hub_download(repo_id="Sudheshna18/Medivision_Models", filename="vit_best.pth")

🖥️ How to Run Locally
1️⃣ Clone the repository
git clone https://github.com/sudheshna018/Medivision.git
cd Medivision

2️⃣ Setup Virtual Environment
cd "medvision backend"
python -m venv venv
venv\Scripts\activate

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Run the Flask Backend
python run_mode.py

This will start the backend server on:
http://127.0.0.1:5003

5️⃣ Run the Frontend
cd "../medvision frontend"
npm install
npm run dev

Your web app will open automatically (typically at http://localhost:5173).