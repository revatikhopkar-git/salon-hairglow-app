# Salon HairGlow App

> ⚠️ **Prototype Notice**  
> This project is an early-stage **MVP prototype**. It is not production-ready and serves as a functional demo to validate core features such as real-time hairstyle try-on, facial landmark alignment, and responsive UI logic.


An AI-powered, real-time **virtual hairstyle try-on app** for salons. Built with **React**, **MediaPipe**, and **TailwindCSS**, this prototype demonstrates the ability to overlay dynamic, photorealistic hairstyles aligned to the user's face using real-time facial landmark detection.

---

## 🚀 Live Demo

> *Coming soon* — or host locally using the setup instructions below.

---

## ✨ Features

* 🎥 Real-time webcam feed
* 🧠 MediaPipe FaceMesh for precise facial landmark detection
* 🎨 Dynamic hairstyle overlay aligned to user face
* 🌟 Soft blending effects, shadows, contrast enhancement
* 🔁 Smooth animations and transitions
* 📱 Fully responsive layout for mobile and desktop

---

## 🛠 Tech Stack

| Layer           | Tech Used                                       |
| --------------- | ----------------------------------------------- |
| Frontend        | React.js, Tailwind CSS                          |
| Camera Feed     | react-webcam                                    |
| Face Tracking   | @mediapipe/face\_mesh, @mediapipe/camera\_utils |
| UI Enhancements | CSS blend modes, transitions, animations        |

---

## 📦 Installation

```bash
# 1. Clone the repo
https://github.com/your-username/salon-hairglow

# 2. Navigate into the folder
cd salon-hairglow

# 3. Install dependencies
npm install

# 4. Start the dev server
npm start
```

---

## 📂 Project Structure

```
salon-hairglow/
├── public/
├── src/
│   ├── assets/               # Hairstyle PNGs
│   ├── App.js                # Main component with logic
│   └── index.js              # Entry point
├── tailwind.config.js
└── package.json
```

---

## ✅ Future Plans

* [ ] SvelteKit-based production version
* [ ] Hair color try-on with GAN support
* [ ] Photo capture + client consultation mode
* [ ] Style recommendations based on face shape & hair type

---

## 📌 Credits

* **MediaPipe** for FaceMesh
* **React Webcam** for live feed
* Hairstyle PNGs created manually or sourced via free-use hair overlays

---

## 💼 Ideal Use Case

This project is ideal for:

* Salons looking to optimize client consultation by reducing the consultation time by ~20 minutes; hence increasing productivity by having more hands-on appointment time available
* Hair stylists showcasing new styles visually
* AR/AI developers building beauty-tech demos

---

## 📬 Contact

Want to collaborate or learn more?
Reach out via [LinkedIn](https://linkedin.com) or [email](mailto:you@example.com)

---

## 📘 License

MIT License — feel free to use, modify, and expand this project.
