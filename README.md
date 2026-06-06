# 🚀 SparkTech Lab Online IoT Course Landing Portal

A premium, highly interactive, and futuristic responsive landing page designed for **SparkTech Lab's 30-Hour Online IoT Course** taught by Mr. Yogesh Mene (Senior IoT Engineer, Metayb Pvt. Ltd.). 

Live site available at: **[theiotguyyogesh.info](http://theiotguyyogesh.info)**

---

## 🌌 Design Aesthetics
* **Futuristic Tech Theme**: Immersive dark mode base using neon cyan (`#00f0ff`) and deep violet (`#8a2be2`) glow accents.
* **Glassmorphism Layouts**: Smooth translucent background panels with subtle border gradients.
* **Micro-Animations**: Hover zoom scale transformations, pulse alerts, and dynamic conic-gradient border animations on key elements.
* **Responsive Layout**: Designed mobile-first using CSS Grid and Flexbox, scaling flawlessly up to 4K displays.

---

## 🛠️ Features & Architecture
1. **Interactive 3-Step Registration Flow**:
   * **Step 1**: Scan GPay / UPI QR code to pay the early bird fee.
   * **Step 2**: Fill out the official Google Form and upload the payment receipt.
   * **Step 3**: Join the official WhatsApp batch community group.
2. **Dynamic Price & Seats Tracker**:
   * Controlled by a single variable `CURRENT_REGISTRATION_COUNT` at the top of `app.js`.
   * Automatically calculates seats progress and fills the status bar.
   * **Automatic Fee Lock**: Once the registration count reaches `5` or more, the UI automatically hides early bird offers, updates status banners, and locks the price to the regular fee of **₹799**.
3. **Optimized for Search Engines (SEO)**:
   * Structured HTML5 outline with meta descriptions, descriptive titles, structural tag hierarchies, and open graph image assets for social sharing previews.

---

## 💻 Technical Stack
* **Bundler & Dev Server**: [Vite](https://vitejs.dev/) (v5)
* **Core Languages**: HTML5, Vanilla CSS3 (Custom properties/Design Tokens), Vanilla ES6 JavaScript (Module-based).

---

## 🚀 Setup & Execution

### 1. Install Dependencies
Initialize package packages and development tooling:
```bash
npm install
```

### 2. Run Local Development Server
Spin up the local developer server:
```bash
npm run dev
```
The server will start at `http://127.0.0.1:5173/` and automatically open your default browser.

### 3. Build for Production
Bundle and optimize all assets into the `/dist` directory for live hosting deployment:
```bash
npm run build
```

---

## ⚙️ Configuration (How to update student count)
Open [app.js](file:///c:/Users/Admin/Desktop/Spaektech/app.js) and update the registration count at the top of the file:

```javascript
// Update this count as you receive payments (0 to 5+).
const CURRENT_REGISTRATION_COUNT = 3;
```
Save the file, stage, and push your changes. Your hosting provider (e.g., Vercel or Netlify) will detect the push, rebuild, and update the live progress bar automatically!
