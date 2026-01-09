# Invitu 💌

> **Where Events Begin, and Invites Get Made.**

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3-green)

**Invitu** is a modern, full-stack event management and invitation platform designed to streamline the way organizers host events. From automated personalized invitations to real-time analytics, Invitu eliminates the hassle of event logistics so you can focus on the experience.

---

## ✨ Key Features

Invitu offers a "No-Code, No-Tech, No-Designer" approach to creating jaw-dropping events.

* **🎨 Personalized Digital Invitations**
    * Generate unique, personalized digital invitation cards for every guest.
    * Automated QR code generation for seamless check-ins.
    * Ready-to-print formats available.

* **📊 Live Management & Insights**
    * **Real-time Dashboard:** Track ticket sales, revenue, and guest check-ins instantly.
    * **Analytics:** Visual graphs and metrics to monitor your event's pulse.

* **🚀 Automated Workflows**
    * **Guest List Management:** Easily add, update, and delete attendees.
    * **Instant Dispatch:** Send bulk invites with a single click.

* **🛡️ Secure & Scalable**
    * Built with robust authentication and a scalable MongoDB database.

---

## 🛠️ Tech Stack

Invitu is built with cutting-edge web technologies to ensure performance, SEO, and a smooth user experience.

### **Frontend**
* **[Next.js 15](https://nextjs.org/)** (App Router) - The React Framework for the Web.
* **[React 19](https://react.dev/)** - For building user interfaces.
* **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid styling.
* **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library.
* **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons.
* **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - 3D elements for immersive web experiences.

### **Backend & Database**
* **Next.js API Routes** - Serverless backend functions.
* **[MongoDB](https://www.mongodb.com/)** - NoSQL database for flexible data storage.
* **Bcrypt** - For secure password hashing.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **MongoDB Atlas** account (or a local MongoDB instance)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/adithyanspillaiofficial/invitu.git](https://github.com/adithyanspillaiofficial/invitu.git)
    cd invitu
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following credentials (based on `src/app/api/db.js`):

    ```env
    # Database Configuration
    DB_UNAME=your_mongodb_username
    DB_PASSWORD=your_mongodb_password
    
    # Optional: Full Connection String if overriding default logic
    # MONGODB_URI=mongodb+srv://...
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Open the App**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```bash
invitu/
├── public/              # Static assets (images, svgs)
├── src/
│   ├── app/             # Next.js App Router pages & API
│   │   ├── api/         # Backend routes (auth, db connection, event logic)
│   │   ├── dashboard/   # Protected dashboard views
│   │   └── page.js      # Landing page
│   ├── components/      # Reusable UI components
│   │   ├── HomeComponents/ # Sections for the landing page (Hero, Features)
│   │   ├── ui/          # Generic UI elements (Buttons, Cards)
│   │   └── ...
│   ├── contexts/        # React Context providers (Loading, etc.)
│   └── lib/             # Utility functions
├── .gitignore
├── package.json         # Project dependencies
└── README.md