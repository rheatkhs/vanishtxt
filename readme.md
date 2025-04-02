### **VanishTXT - Self-Destructing Secret Messages**  

![VanishTXT](https://i.postimg.cc/V16zFd5f/Fire-Shot-Capture-004-Secure-Messaging-vanishtxt-vanishtxt-laravel-cloud.png)  

**🔗 Live Demo:** [VanishTXT](https://vanishtxt.laravel.cloud/)  

---

### **📌 Introduction**

**VanishTXT** is a web app where users can **send secret messages** that **self-destruct** after being read. Think of it like **Snapchat for text**, but more secure!
Once a message is viewed, it **disappears forever**, ensuring privacy and security.

---

### **⚡ Features**

✔️ **End-to-End Encryption** – Messages are securely encrypted before storing.  
✔️ **One-Time Viewing** – Messages get deleted after being read.  
✔️ **Anonymous Messaging** – Sender and receiver fields are optional.  
✔️ **Auto-Generated Secret Links** – Share secure links for messages.  
✔️ **Copy & Share** – Easily copy the message link with one click.  
✔️ **Dark Themed UI** – Smooth, modern design with animations.

---

### **🛠️ Tech Stack**

This project is powered by a modern, high-performance stack for seamless functionality and security:  

🔹 **Full-Stack Framework:** Laravel 12 + Inertia.js  
🔹 **Frontend:** React, TailwindCSS, Framer Motion  
🔹 **Backend:** PostgreSQL, PHP
🔹 **Security:** Laravel Crypt, UUID-based tokens for secure message handling  

---

### **🚀 Installation Guide** 

#### 🔹 1. Clone the Repository  
```sh
git clone https://github.com/rheatkhs/vanishtxt.git
cd vanishtxt
```

#### 🔹 2. Install Dependencies  
Run the following commands to install all required dependencies:  
```sh
composer install
npm install
```

#### 🔹 3. Configure Environment  
Copy the environment configuration and generate the application key:  
```sh
cp .env.example .env
php artisan key:generate
```
> Update `.env` with your **database credentials**, **app URL**, and **other settings**.  

#### 🔹 4. Run Migrations  
```sh
php artisan migrate
```
> This will set up the required database tables.  

#### 🔹 5. Start the Application  
Run both the Laravel backend and the React frontend:  
```sh
php artisan serve
npm run dev
```
Now visit **[localhost:8000](http://localhost:8000/)** 🎉  

---
### **🔑 Usage Guide**

#### **1️⃣ Create a Secret Message**

- Type your message and (optionally) add sender & receiver names.
    
- Click **"Create Message"** to encrypt and generate a **unique link**.
    

#### **2️⃣ Share the Link**

- Copy the generated link and share it securely.
    

#### **3️⃣ View & Auto-Delete**

- The recipient opens the link, decrypts the message, and **the message disappears forever**.
    

---

### **🛡️ Security Measures**

✔️ **Messages are encrypted before storage** 🛑 **No plaintext storage!**  
✔️ **UUID-based access tokens** to prevent brute-force access.  
✔️ **Self-destructing messages** ensure no data is left behind.

---

### **🤝 Contributing**  

I appreciate contributions to this project! If you'd like to help improve **VanishTXT**, follow these steps:  

#### 🔹 1. Fork the Repository  
Click the **Fork** button at the top-right of the repository page.  

#### 🔹 2. Clone Your Fork  
```sh
git clone https://github.com/yourusername/vanishtxt.git
cd vanishtxt
```

#### 🔹 3. Create a New Branch  
```sh
git checkout -b feature/your-feature-name
```

#### 🔹 4. Make Your Changes  
- Follow best practices and coding standards.  
- Ensure that all tests pass before committing.  

#### 🔹 5. Commit and Push  
```sh
git add .
git commit -m "✨ Add [your feature name]"
git push origin feature/your-feature-name
```

#### 🔹 6. Open a Pull Request  
- Go to the original repository on GitHub.  
- Click **New Pull Request** and select your branch.  
- Provide a clear title and description of your changes.  

#### ✅ Contribution Guidelines  
- Follow **PSR-12** coding standards for PHP.  
- Use clear and meaningful commit messages.  
- Test your code before submitting a pull request.  

💡 **Have questions?** Feel free to open an issue! 😃  

---
### **🌟 Acknowledgments**  

Huge thanks to everyone who supports and inspires this project. Your feedback and contributions help make it even better!  

---

🛠️ **Crafted with passion and precision by [Rhea Takahashi](https://github.com/rheatkhs)** 🎯  
