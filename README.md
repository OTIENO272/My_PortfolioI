
# My Portfolio

A personal developer portfolio built with React and Vite, showcasing projects, an about section, and a working contact form powered by EmailJS.

## Features

- **Responsive navigation** with a desktop nav bar and a mobile hamburger drawer
- **Dark / light theme toggle** using Tailwind's `dark` class strategy
- **Hero section** introducing the developer
- **Projects section** highlighting featured work with live links:
  - [Velonith Labs](https://velo-dash-alpha.vercel.app/)
  - [DMA Connect](https://dma-labs-irxq-three.vercel.app/)
  - [Ksa](https://ksu-authentication.vercel.app/)
- **About section** with a short bio and image
- **Contact form** with client-side validation (`react-hook-form`) that sends messages directly to an email inbox via [EmailJS](https://www.emailjs.com/) — no backend required

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [@emailjs/browser](https://www.emailjs.com/docs/sdk/installation/)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Environment / EmailJS Setup

This project sends contact form submissions using EmailJS. You'll need your own EmailJS account with:

1. A **Service ID** (connected email provider, e.g. Gmail)
2. A **Template ID** (with `user_name`, `user_email`, and `user_message` variables)
3. A **Public Key**

Update these values in `src/App.jsx` inside the `emailJs.send(...)` call:

```js
await emailJs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  templateParams,
  "YOUR_PUBLIC_KEY"
)
```

> For better security, consider moving these into environment variables (e.g. `import.meta.env.VITE_EMAILJS_SERVICE_ID`) rather than hardcoding them, especially before pushing to a public repository.

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder, ready to deploy (e.g. to Vercel or Netlify).

## Project Structure

```
src/
├── assets/           # Images and logos used throughout the site
├── App.jsx           # Main application component (nav, hero, projects, about, contact)
└── main.jsx          # App entry point
```

## Checking Contact Form Submissions

Messages submitted through the contact form are delivered to the inbox configured in your EmailJS template. You can also view a log of send attempts (success/failure) in the EmailJS dashboard under **Email History**.

## License

This project is open for personal and educational use. Feel free to fork and adapt it for your own portfolio.
