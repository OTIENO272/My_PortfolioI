import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import emailJs from '@emailjs/browser'

// Image imports — Vite bundles these correctly for production
// Adjust the "./assets/..." path if App.jsx is NOT directly inside src/
import logo from "./assets/velonith_logo_v2.svg"
import heroImg from "./assets/WhatsApp Image 2026-09-03 at 23.41.13.jpeg"
import veloImg from "./assets/velo.png"
import dmaImg from "./assets/dma.png"
import ksuImg from "./assets/ksu.png"
import aboutImg from "./assets/anxkt_WhatsApp Image 2026-09-03 at 23.41.13.jpeg"

const App = () => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  const {register,handleSubmit,reset, formState:{errors,isSubmitting}}= useForm()

  const onSubmit =async (data)=>{
   
        const templateParams ={
          user_name:data.name,
          user_email:data.email,
          user_message:data.message
        }

        try {
          await emailJs.send(
            "service_ux691cy",
            "template_3gtod69",
            templateParams,
            "sItTjdgDJDgxkHqjO"
          )
           alert("All data successfully sent to your email!");
           reset()
        } catch (error) {
          console.log("EmailJs Error",error);
          alert("Failed to send email")
          
        }
     
     
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-mono">
      {/* Navbar Container */}
      <div className="flex items-center justify-between bg-slate-900 h-14 text-white p-4 sticky top-0 z-50">
        <div className="font-bold flex items-center">
          <img src={logo} alt="prof" className="w-10 h-10" />
        </div>
        <span className="font-semibold">My Portfolio</span>
        
        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6 items-center">
          <a href="#" className="hover:text-slate-300 transition-colors">Home</a>
          <a href="#about" className="hover:text-slate-300 transition-colors">About</a>
          <a href="#projects" className="hover:text-slate-300 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-slate-300 transition-colors">Contact</a>
          <button onClick={toggleTheme} className="text-white px-2 cursor-pointer text-lg">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
        
        {/* Mobile Hamburger Trigger */}
        <button className="cursor-pointer text-xl p-4 sm:hidden" onClick={() => setOpen(!open)}>
          {open ? "✕" : "≣"}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="flex flex-col items-center gap-4 bg-slate-900 text-white p-4 sm:hidden border-t border-slate-800">
          <a href="#" onClick={() => setOpen(false)} className="hover:text-slate-300 py-1 w-full text-center">Home</a>
          <a href="#about" onClick={() => setOpen(false)} className="hover:text-slate-300 py-1 w-full text-center">About</a>
          <a href="#projects" onClick={() => setOpen(false)} className="hover:text-slate-300 py-1 w-full text-center">Projects</a>
          <a href="#contact" onClick={() => setOpen(false)} className="hover:text-slate-300 py-1 w-full text-center">Contact</a>
          <button onClick={toggleTheme} className="text-white px-2 py-1 cursor-pointer">
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div id="home" className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-slate-400 dark:bg-slate-800">
        <div className="flex justify-center items-center">
          <img src={heroImg} alt="him" className="max-h-96 object-contain rounded-b-full " />
        </div>
        <div className="flex flex-col justify-center p-4">
          <span className="text-2xl font-serif">Welcome.</span>
          <h1 className="text-3xl font-bold my-2">Hello, I'm Dev Victor Odhiambo.</h1>
          <p className="text-lg mb-4">A Full-Stack Developer.</p>
          <a href="#projects" className="bg-slate-700 text-white rounded-sm text-center cursor-pointer p-2 max-w-xs hover:bg-slate-600 transition-colors">
            Sample Projects
          </a>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="py-12">
        <h3 className="p-6 font-semibold text-2xl">My Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:text-xl text-sm">
          {/* Project 1 */}
          <div className="bg-slate-500 dark:bg-slate-700 p-4 rounded hover:scale-105 transition-all duration-500 flex flex-col justify-between">
            <div>
              <img src={veloImg} alt="" className="w-full rounded object-cover h-40" />
              <h1 className="p-4 underline text-xl font-bold">Velonith Labs</h1>
              <p className="p-4 text-base font-mono">A platform built to allow modern learning and interaction of developers.</p>
            </div>
            <a href="https://velo-dash-alpha.vercel.app/" target="_blank" rel="noreferrer" className="p-4 text-xl text-blue-300 hover:text-blue-400 font-bold">Visit ↗</a>
          </div>

          {/* Project 2 */}
          <div className="bg-slate-500 dark:bg-slate-700 p-4 rounded hover:scale-105 transition-all duration-500 flex flex-col justify-between">
            <div>
              <img src={dmaImg} alt="" className="w-full rounded object-cover h-40" />
              <h1 className="p-4 underline text-xl font-bold">DMA Connect</h1>
              <p className="p-4 text-base font-mono">A platform which connects developers to opportunities and also customers to their required services.</p>
            </div>
            <a href="https://dma-labs-irxq-three.vercel.app/" target="_blank" rel="noreferrer" className="p-4 text-xl text-blue-300 hover:text-blue-400 font-bold">Visit ↗</a>
          </div>

          {/* Project 3 */}
          <div className="bg-slate-500 dark:bg-slate-700 p-4 rounded hover:scale-105 transition-all duration-500 flex flex-col justify-between">
            <div>
              <img src={ksuImg} alt="" className="w-full rounded object-cover h-40" />
              <h1 className="p-4 underline text-xl font-bold">Ksa</h1>
              <p className="p-4 text-base font-mono">An authentication system that uses jwt and other backend tech.. </p>
            </div>
            <a href="https://ksu-authentication.vercel.app/" target="_blank" rel="noreferrer" className="p-4 text-xl text-blue-300 hover:text-blue-400 font-bold">Visit ↗</a>
          </div>
        </div>
      </div>

      {/* About Section Placeholder */}
      <div id="about" className="p-6 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold text-2xl mb-4">About Me</h3>
        <img src={aboutImg} className="w-70 h-100 rounded-b-full" alt="" />
        <p className="font-mono">Hi! I'm a passionate web developer with experience in building responsive and user-friendly websites. I love turning ideas into reality using code. My skills are majored in the vast area of Full-stack development </p>
      </div>

      {/* Contact Section Placeholder */}
      <div id="contact" className="p-6 bg-slate-200 dark:bg-slate-950 border-t border-slate-300 dark:border-slate-800">
        <h3 className="font-semibold text-2xl mb-4">Contact</h3>
        <p className="font-mono">Reach Out</p>
        <form onSubmit={handleSubmit(onSubmit)} >
          <label className="p-4 text-2xl ">Name</label> <br />
          <input  {...register('name',{
            required:'Name is required!',
            
          })} type="text"  className="p-4 bg-amber-50 text-slate-700 text-2xl rounded m-3"/>
          {errors.name && <span className="pd-2   text-lg text-red-600 bg-amber-50">{errors.name.message}</span> }
          <br />
         
           <label  className="p-4 text-2xl ">Email</label><br />
          <input {...register('email',{
            required:'Email is required'
          })} type="email" className="p-4 bg-amber-50 text-slate-700 text-2xl rounded m-3" />
          {errors.email && <span className="pd-2 text-lg text-red-600 bg-amber-50">{errors.email.message}</span> }
          
          <br />
          

          <label className="p-4 text-2xl ">Message</label> <br />
          <textarea  {...register('message',{
            required:"No message to be sent!"
          })}  name="" id="" className="p-4 bg-amber-50 text-slate-700 text-2xl rounded m-3"></textarea> <br />
          <button disabled={isSubmitting} className="bg-green-800 p-4 rounded items-center cursor-pointer ml-4 text-2xl ">{isSubmitting ? "Sending..." : "Send Message"}</button>

        </form>
      </div>
    </div>
  )
}

export default App