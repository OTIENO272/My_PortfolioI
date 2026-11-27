import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import emailJs from "@emailjs/browser"

import logo from "./assets/velonith_logo_v2.svg"
import heroImg from "./assets/WhatsApp Image 2026-09-03 at 23.41.13.jpeg"
import veloImg from "./assets/velo.png"
import dmaImg from "./assets/dma.png"
import ksuImg from "./assets/ksu.png"
import aboutImg from "./assets/about.jpeg"

const GITHUB_USERNAME = "OTIENO272"
const BRAND_NAME = "VICDEVS"

const ROLES = [
  "Full-Stack Software Engineer",
  
]

const FEATURED_PROJECTS = [
  {
    title: "Velonith Labs",
    category: "Full-Stack",
    stack: ["React", "Tailwind CSS", "Vercel"],
    description:
      "A modern developer learning and collaboration platform built for interactive coding workflows.",
    
    liveUrl: "https://velo-dash-alpha.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: "DMA Connect",
    category: "Full-Stack",
    stack: ["JavaScript", "React", "Networking"],
    description:
      "A platform connecting developers to technical opportunities and customers to reliable networking services.",
    
    liveUrl: "https://dma-labs-irxq-three.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/DMA-company-`,
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
    title: "Movie Web App",
    category: "Fullstack",
    stack: ["JavaScript", "REST API", "Vercel"],
    description:
      "An interactive movie discovery application with search, ratings, and dynamic media browsing.",
    liveUrl: "https://project-zblrs.vercel.app/",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/movie-web--app`,
  },
  
  {
    title: "tibaHub",
    category: "Fullstack ",
    stack: ["Tailwindcss", "Responsive UI", "pythonFastAPI","react-Typescript],
    description:
      "A modern hospital management system that brings the medication process into a single platform",
    liveUrl: "tibahub",
    repoUrl: `https://github.com/${GITHUB_USERNAME}/tibaHub`,
  },
]

const SKILL_GROUPS = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3"],
  },
  {
    label: "Backend & APIs",
    items: ["Python", "FastAPI", "Django", "Node.js", "Express",],
  },
 
  {
    label: "Databases & Cloud",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Docker", "AWS", "Git"],
  },
]

const CATEGORIES = ["All", "Full-Stack", "Backend & Auth", "Tools & UI"]

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  )
}

const App = () => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [activeCategory, setActiveCategory] = useState("All")
  const [statusMsg, setStatusMsg] = useState(null)
  const [ghStats, setGhStats] = useState({ public_repos: 60, followers: 5 })
  const [recentRepos, setRecentRepos] = useState([])
  const [roleIndex, setRoleIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-mono transition-colors duration-300 selection:bg-emerald-500/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt={BRAND_NAME}
              className="w-9 h-9 rounded transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
            />
            <span className="font-display text-2xl font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              {BRAND_NAME}
            </span>
          </a>

          <nav className="hidden sm:flex items-center gap-7 text-xs uppercase tracking-widest font-medium">
            <a href="#home" className="hover:text-emerald-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-emerald-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all active:scale-95"
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
          <div className="sm:hidden flex flex-col gap-3 px-6 py-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs uppercase tracking-widest">
            <a href="#home" onClick={() => setOpen(false)} className="py-1.5 hover:text-emerald-500">Home</a>
            <a href="#about" onClick={() => setOpen(false)} className="py-1.5 hover:text-emerald-500">About</a>
            <a href="#skills" onClick={() => setOpen(false)} className="py-1.5 hover:text-emerald-500">Skills</a>
            <a href="#projects" onClick={() => setOpen(false)} className="py-1.5 hover:text-emerald-500">Projects</a>
            <a href="#contact" onClick={() => setOpen(false)} className="py-1.5 hover:text-emerald-500">Contact</a>
            <button
              onClick={toggleTheme}
              className="text-left py-1.5 cursor-pointer hover:text-emerald-500"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-tech-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <div
                className="animate-fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25"
                style={{ animationDelay: "40ms" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>AVAILABLE FOR WORK · NAIROBI, KENYA</span>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  @{BRAND_NAME} // github.com/{GITHUB_USERNAME}
                </p>
                <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.92]">
                  Victor <span className="text-emerald-600 dark:text-emerald-400">Odhiambo</span>
                </h1>
                <div className="mt-3 h-8 flex items-center">
                  <p
                    key={roleIndex}
                    className="animate-fade-up text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200"
                  >
                    &gt;_ {ROLES[roleIndex]}
                  </p>
                </div>
              </div>

              <p
                className="animate-fade-up text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
                style={{ animationDelay: "200ms" }}
              >
                A passionate computer engineer, problem solver, and tech creative. Designing
                scalable full-stack software systems AI-powered systems.
              </p>

              <div
                className="animate-fade-up flex flex-wrap gap-3 pt-1"
                style={{ animationDelay: "280ms" }}
              >
                <a
                  href="#projects"
                  className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  Explore Projects ↓
                </a>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-emerald-500 font-semibold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
                >
                  GitHub ({GITHUB_USERNAME}) ↗
                </a>
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
                >
                  Contact Me
                </a>
              </div>

              <div
                className="animate-fade-up grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-md"
                style={{ animationDelay: "360ms" }}
              >
                <div>
                  <div className="font-display text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {ghStats.public_repos}+
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Public Repos
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    7+
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Languages
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    24/7
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Builder Mode
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="relative animate-float group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/35 via-teal-400/20 to-cyan-500/35 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <img
                  src={heroImg}
                  alt="Victor Odhiambo — vicdevskenya"
                  className="relative w-72 sm:w-80 h-80 sm:h-96 object-cover rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="group relative">
                <img
                  src={aboutImg}
                  alt="About vicdevskenya"
                  className="w-64 h-80 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                01 // Profile
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide">
                About Me
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Victor Odhiambo</span>,
                the software engineer behind{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{BRAND_NAME}</span>.
                I build resilient software across the stack—from React &amp; Tailwind interfaces to
                FastAPI, Django, and Node.js backends, plus native Kotlin Android apps.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Currently advancing my work in Artificial Intelligence, Machine Learning, Cloud
                Architecture (AWS, Docker, Kubernetes), and Cybersecurity.
              </p>
              <div className="pt-2 inline-block px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-emerald-600 dark:text-emerald-400">
                motto: &quot;Build • Break • Learn • Improve&quot;
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              02 // Capabilities
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide mt-1">
              Tech Stack
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-xs sm:text-sm">
              Languages, frameworks, and infrastructure tools I ship with.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group, idx) => (
            <Reveal key={group.label} delay={idx * 80}>
              <div className="h-full p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5">
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-500/15 hover:text-emerald-500 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  03 // Selected Work
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide mt-1">
                  Featured Projects
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1 text-xs sm:text-sm">
                  Curated systems and apps from{" "}
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium cursor-pointer transition-all ${
                      activeCategory === cat
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, idx) => (
              <Reveal key={project.title} delay={(idx % 3) * 80}>
                <article className="group h-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10">
                  <div>
                    <div className="overflow-hidden border-b border-slate-200 dark:border-slate-800">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-44 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950/60 flex items-center justify-center px-4 text-center transition-transform duration-500 group-hover:scale-105">
                          <span className="font-display text-2xl uppercase tracking-wider text-emerald-400">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl font-bold uppercase tracking-wide mt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        Live Demo
                        <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className="text-slate-400">Repository</span>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                    >
                      Source Code →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {recentRepos.length > 0 && (
            <Reveal className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-2xl uppercase tracking-wide font-bold mb-4">
                Latest GitHub Activity (@{GITHUB_USERNAME})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs truncate">{repo.name}</span>
                      {repo.language && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
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
            </Reveal>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              04 // Connect
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide">
              Get in Touch
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Have a project, role, or collaboration in mind? Send a message or connect directly
              through any of the channels below.
            </p>
            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Email: </span>
                <a href="mailto:otieno272@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  otieno272@gmail.com
                </a>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">GitHub: </span>
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
                <span className="text-slate-500 dark:text-slate-400">LinkedIn: </span>
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
                <span className="text-slate-500 dark:text-slate-400">X / Twitter: </span>
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
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">Name</label>
                <input
                  {...register("name", { required: "Name is required!" })}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">Email</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">Message</label>
                <textarea
                  {...register("message", { required: "Please write a message!" })}
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm transition-colors"
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              {statusMsg && (
                <div
                  className={`p-3 rounded-lg text-xs sm:text-sm animate-fade-up ${
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {BRAND_NAME} — Victor Odhiambo.
      </footer>
    </div>
  )
}

export default App
