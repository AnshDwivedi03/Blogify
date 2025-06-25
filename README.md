# 📝 Blogify

**Blogify** is a full-stack blogging platform that allows users to create, read, and manage blog posts.  
It features secure authentication using HMAC for hashed passwords, role-based access, and is deployed on AWS EC2.

---

## ✨ Features
- 🔐 **User authentication** with hashed passwords using HMAC
- 🧑‍💻 Role-based authorization (authors vs. readers)
- 📝 Create, edit, and delete blog posts
- 🖼️ Responsive and user-friendly UI
- ☁️ Deployed on Render 

---

## 🧰 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS, CSS, JS
- **Auth**: HMAC hashing for password security, `jsonwebtoken` for sessions
- **Deployment**: Render

---

## 🚀 Getting Started

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) installed
- MongoDB running locally or MongoDB Atlas account
- AWS account for deployment (optional)

---

### ⚙️ Installation
```bash
# Clone the repo
git clone https://github.com/AnshDwivedi03/Blogify.git

# Navigate to the project directory
cd Blogify

# Install dependencies
npm install
