'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaJs, FaHtml5, FaCss3, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiStripe, SiRedux, SiJest, SiMysql, SiMongodb } from 'react-icons/si'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import Image from 'next/image'
import UserPng from '@/assets/user.jpg';
import UniversitySvg from '@/assets/university-svgrepo-com.svg'
import RealEstateImg from '@/assets/image.png'
import mySarathi from '@/assets/mysarathi.png'
import Nextflix from '@/assets/nextflix.png'
import { Engine, IOptions, RecursivePartial } from 'tsparticles-engine'

export default function EnhancedPortfolio() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'tech-stack', 'about', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Real-estate Listing Platform',
      description: 'A full-featured online store with product management, cart functionality, and secure checkout.',
      image: RealEstateImg,
      techStack: ['Next.js', 'React', 'Stripe', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Taxi Booking Application Using Mapbox',
      description: 'A React application mocks booking a taxi using Geolocation and Mapbox API',
      image: mySarathi,
      techStack: ['React', 'MapBox API', 'Firebase', 'Material-UI']
    },
    {
      id: 3,
      title: 'Netflix UI Clone',
      description: 'A fully responsive UI clone of Netflix with original assets ',
      image: Nextflix,
      techStack: ['React', 'Redux', 'Node.js', 'MongoDB']
    },
  ]

  const skills = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3 /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'Stripe', icon: <SiStripe /> },
    { name: 'Jest', icon: <SiJest /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    
  ]

  const experiences = [
    {
      id: 1,
      year: '2019-2022',
      title: 'Graduation',
      description: 'Bachelor of Science - Computer Science (CGPA - 8.73) Banaras Hindu University, Varanasi, UP',
      icon: UniversitySvg,
    },
    {
      id: 2,
      year: '2022-2024',
      title: 'Post Graduation',
      description: 'Master of Computer Applications(MCA) (CGPA - 8.5) Banaras Hindu University, Varanasi, UP',
      icon: UniversitySvg,
    },
    {
      id: 3,
      year: 'Feb-Aug,2024',
      title: 'Frontend Engineer Intern @ DyLit',
      description: 'Collaborated on the reimplementation of the UI of their enterprise application for a US based client',
      icon: UniversitySvg,
    },
    {
      id: 4,
      year: 'Sep,2024-Present',
      title: 'Software Engineer Trainee @ Datafoundry',
      description: 'Continuously improving my skills, staying updated with the latest technologies, and delivering high-quality projects.',
      icon: UniversitySvg,
    },
  ]

  const particlesInit = async (main: Engine) => {
    await loadFull(main)
  }

  const particlesOptions : RecursivePartial<IOptions> = {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: 'out' },
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      <div className="relative">
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Siddharth.</div>
            <div className="flex space-x-4">
              {['Home', 'Tech Stack', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === item.toLowerCase().replace(' ', '-')
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.toLowerCase().replace(' ', '-'))
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-20 relative z-10">
          <section id="home" className="min-h-screen flex items-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <div className="md:w-1/2 mb-8 md:mb-0 ml-16">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl sm:text-6xl font-bold mb-4"
                >
                  Front-End React Developer <span className="inline-block">👋</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl mb-6"
                >
                  Hi, I&apos;m Siddharth Singh. A passionate Front-end React Developer based in Bengaluru, India. 📍
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-center space-x-4"
                >
                  <a href="#" className="text-3xl hover:text-blue-400 transition-colors">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="text-3xl hover:text-blue-400 transition-colors">
                    <FaGithub />
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <FaFileDownload className="mr-2" />
                    Download Resume
                  </a>
                </motion.div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src={UserPng}
                  alt="Computer Science Illustration"
                  width={400}
                  height={400}
                  className="rounded-full shadow-lg"
                />
              </div>
            </div>
          </section>

          <section id="tech-stack" className="py-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl mb-2 text-blue-400">{skill.icon}</div>
                  <span className="text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="about" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-center">About</h2>
            <p className="text-center text-xl mb-12">Learn more about me, my background, and what motivates me.</p>
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-500 transform -translate-x-1/2"></div>
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex mb-12 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <h3 className="text-2xl font-bold mb-2">{experience.year}</h3>
                    <h4 className="text-xl font-semibold mb-2">{experience.title}</h4>
                    <p className="text-gray-300">{experience.description}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-blue-500 border-4 border-gray-900 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <Image src={experience.icon} alt={experience.title} width={40} height={40} className="rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
                >
                  <Image src={project.image} alt={project.title} width={300} height={200} className="w-full h-48 object-cover" />
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-3xl text-center font-bold mb-8">Contact Me</h2>
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Message
              </motion.button>
            </motion.form>
          </section>
        </main>

        <footer className="bg-gray-800 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">&copy; 2024 Siddharth Singh. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}