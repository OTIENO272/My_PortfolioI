import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import emailJs from "@emailjs/browser"

import logo from "./assets/velonith_logo_v2.svg"
import heroImg from "./assets/WhatsApp Image 2026-09-03 at 23.41.13.jpeg"
import veloImg from "./assets/velo.png"
import dmaImg from "./assets/dma.png"
import ksuImg from "./assets/ksu.png"
import aboutImg from "./assets/about.jpeg"

const GITHUB_USERNAME = "OTIENO272"
const BRAND_NAME = "vicdevskenya"

const FEATURED_PROJECTS = [
  {
    title: "Velonith Labs",
    category: "Full-Stack",
    stack: ["React", "Tailwind CSS", "Vercel"],
    description:
      "A modern developer learning and collaboration platform built for interactive coding workflows.",
    image: veloImg,
    liveUrl: "https://velo-dash-alpha.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: "DMA Connect",
    category: "Full-Stack",
    stack: ["JavaScript", "React", "Networking"],
    description:
      "A platform connecting developers to technical opportunities and customers to reliable networking services.",
    image: dmaImg,
    liveUrl: "https://dma-labs-irxq-three.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/DMA-company-`,
  },
  {
    title: "KSU Authentication",
    category: "Backend & Auth",
    stack: ["JWT", "Node.js", "Security"],
    description:
      "A secure authentication system implementing JWT token flows, role-based access, and protected routes.",
    image: ksuImg,
    liveUrl: "https://ksu-authentication.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: "Intasend M-Pesa STK Server",
    category: "Backend & Auth",
    stack: ["JavaScript", "M-Pesa API", "Payments"],
    description:
      "A payment integration server enabling seamless M-Pesa STK Push checkouts for Kenyan web applications.",
    liveUrl: null,
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Intasend`,
  },
  {
    title: "Vic Code Editor",
    category: "Tools & UI",
    stack: ["JavaScript", "HTML5", "CSS3"],
    description:
      "A lightweight web-based code editor with live preview for rapid frontend prototyping in the browser.",
    liveUrl: "https://otieno272.github.io/Vic-code-Editor/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Vic-code-Editor`,
  },
  {
    title: "Note App",
    category: "Full-Stack",
    stack: ["JavaScript", "React", "Vercel"],
    description:
      "A clean, responsive note-taking web application for organizing tasks, ideas, and daily workflows.",
    liveUrl: "https://note-app-jade-delta.vercel.app",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/note-app`,
  },
  {
    title: "Movie Web App",
    category: "Tools & UI",
    stack: ["JavaScript", "REST API", "Vercel"],
    description:
      "An interactive movie discovery application with search, ratings, and dynamic media browsing.",
    liveUrl: "https://project-zblrs.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/movie-web--app`,
  },
  {
    title: "UniSmart Student System",
    category: "Backend & Auth",
    stack: ["Python", "Data", "Automation"],
    description:
      "A Python-based student management system built for academic records and institutional workflows.",
    liveUrl: null,
    repoUrl: `https://github.com/${GITHUB_USERNAME}/UniSmart`,
  },
  {
    title: "Blog UI",
    category: "Tools & UI",
    stack: ["CSS3", "Responsive UI", "Vercel"],
    description:
      "A clean editorial blog interface designed with modern typography, cards, and responsive layouts.",
    liveUrl: "https://blog-ui-alpha.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Blog-UI`,
  },
]

const SKILL_GROUPS = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3"],
  },
  {
    label: "Backend & APIs",
    items: ["Python", "FastAPI", "Django", "Node.js", "Express", "PHP", "Java"],
  },
  {
    label: "Mobile & Systems",
    items: ["Kotlin", "Android Studio", "C", "C++", "Linux"],
  },
  {
    label: "Databases & Cloud",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Docker", "AWS", "Git"],
  },
]

const CATEGORIES = ["All", "Full-Stack", "Backend & Auth", "Tools & UI"]

const App = () => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [activeCategory, setActiveCategory] = useState("All")
  const [statusMsg, setStatusMsg] = useState(null)
  const [ghStats, setGhStats] = useState({ public_repos: 60, followers: 5 })
  const [recentRepos, setRecentRepos] = useState([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    let active = true
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`).then((r) =>
        r.ok ? r.json() : null
      ),
    ])
      .then(([profile, repos]) => {
        if (!active) return
        if (profile && typeof profile.public_repos === "number") {
          setGhStats({
            public_repos: profile.public_repos,
            followers: profile.followers ?? 5,
          })
        }
        if (Array.isArray(repos)) {
          setRecentRepos(repos.filter((r) => !r.fork).slice(0, 6))
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setStatusMsg(null)
    const templateParams = {
      user_name: data.name,
      user_email: data.email,
      user_message: data.message,
    }

    try {
      await emailJs.send(
        "service_ux691cy",
        "template_3gtod69",
        templateParams,
        "sItTjdgDJDgxkHqjO"
      )
      setStatusMsg({ type: "success", text: "Message sent! I'll get back to you soon." })
      reset()
    } catch (error) {
      console.log("EmailJs Error", error)
      setStatusMsg({
        type: "error",
        text: "Could not send via form right now. Please email otieno272@gmail.com directly.",
      })
    }
  }

  const visibleProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 font-bold tracking-tight text-lg">
            <img src={logo} alt={BRAND_NAME} className="w-9 h-9 rounded" />
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{BRAND_NAME}</span>
          </a>

          <nav className="hidden sm:flex items-center gap-7 text-sm font-medium">
            <a href="#home" className="hover:text-emerald-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-emerald-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </nav>

          <button
            className="sm:hidden p-2 text-xl cursor-pointer"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="sm:hidden flex flex-col gap-3 px-6 py-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-sm font-medium">
            <a href="#home" onClick={() => setOpen(false)} className="py-1 hover:text-emerald-500">Home</a>
            <a href="#about" onClick={() => setOpen(false)} className="py-1 hover:text-emerald-500">About</a>
            <a href="#skills" onClick={() => setOpen(false)} className="py-1 hover:text-emerald-500">Skills</a>
            <a href="#projects" onClick={() => setOpen(false)} className="py-1 hover:text-emerald-500">Projects</a>
            <a href="#contact" onClick={() => setOpen(false)} className="py-1 hover:text-emerald-500">Contact</a>
            <button
              onClick={toggleTheme}
              className="text-left py-1 cursor-pointer hover:text-emerald-500"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to Work • Kenya
            </div>

            <div>
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-2">
                @{BRAND_NAME} · GitHub/{GITHUB_USERNAME}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Victor Odhiambo
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                Full-Stack, AI &amp; Android Software Engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              A passionate computer engineer, problem solver, and tech creative. I design and build
              scalable full-stack web systems, Kotlin Android apps, M-Pesa payment integrations, and
              AI-powered applications.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors"
              >
                Explore Projects
              </a>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-emerald-500 font-medium text-sm transition-colors"
              >
                GitHub ({GITHUB_USERNAME}) ↗
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium text-sm transition-colors"
              >
                Contact Me
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-md">
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {ghStats.public_repos}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Public Repos</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  7+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  Full-Stack
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Web &amp; Mobile</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 blur-lg" />
              <img
                src={heroImg}
                alt="Victor Odhiambo — vicdevskenya"
                className="relative w-72 sm:w-80 h-80 sm:h-96 object-cover rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center">
            <img
              src={aboutImg}
              alt="About vicdevskenya"
              className="w-64 h-80 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md"
            />
          </div>
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm <span className="font-semibold text-slate-900 dark:text-white">Victor Odhiambo</span>,
              the engineer behind <span className="font-mono text-emerald-600 dark:text-emerald-400">{BRAND_NAME}</span>.
              I focus on building clean, reliable software across the stack—from React &amp; Tailwind
              interfaces to FastAPI, Django, and Node.js backends, plus native Kotlin Android apps.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Currently deepening my work in Artificial Intelligence, Machine Learning, Cloud
              Engineering (AWS, Docker, Kubernetes), and Cybersecurity.
            </p>
            <div className="pt-2 font-mono text-sm text-emerald-600 dark:text-emerald-400">
              Motto: &ldquo;Build • Break • Learn • Improve&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Tech Stack</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            Technologies and tools I build with across web, mobile, and backend systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3 text-sm font-mono uppercase tracking-wider">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Projects</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                Selected applications and systems from{" "}
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
                >
                  github.com/{GITHUB_USERNAME}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/60 transition-all"
              >
                <div>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-44 object-cover border-b border-slate-200 dark:border-slate-800"
                    />
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-slate-800 px-4 text-center">
                      <span className="font-mono text-sm text-emerald-400">{project.title}</span>
                    </div>
                  )}

                  <div className="p-5">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold mt-1">{project.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-medium">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Live Demo ↗
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">Repository</span>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-mono text-xs"
                  >
                    Source Code →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {recentRepos.length > 0 && (
            <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-4">Latest GitHub Activity (@{GITHUB_USERNAME})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-semibold text-sm truncate">{repo.name}</span>
                      {repo.language && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {repo.description || "Explore repository on GitHub."}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Get in Touch</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Have a project, role, or collaboration in mind? Send a message or connect directly
              through any of the channels below.
            </p>
            <div className="space-y-2.5 pt-2 text-sm">
              <div>
                <span className="font-mono text-slate-500 dark:text-slate-400">Email: </span>
                <a href="mailto:otieno272@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  otieno272@gmail.com
                </a>
              </div>
              <div>
                <span className="font-mono text-slate-500 dark:text-slate-400">GitHub: </span>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  github.com/{GITHUB_USERNAME}
                </a>
              </div>
              <div>
                <span className="font-mono text-slate-500 dark:text-slate-400">LinkedIn: </span>
                <a
                  href="https://linkedin.com/in/victor-odhiambo-58163a3b8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Victor Odhiambo
                </a>
              </div>
              <div>
                <span className="font-mono text-slate-500 dark:text-slate-400">X / Twitter: </span>
                <a
                  href="https://twitter.com/OtienoVictor"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  @OtienoVictor
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register("name", { required: "Name is required!" })}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  {...register("message", { required: "Please write a message!" })}
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              {statusMsg && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    statusMsg.type === "success"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}

              <button
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium text-sm cursor-pointer transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs font-mono text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {BRAND_NAME} — Victor Odhiambo. Built with React &amp; Tailwind CSS.
      </footer>
    </div>
  )
}

export default App
