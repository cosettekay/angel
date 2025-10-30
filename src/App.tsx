import { useEffect, useRef, useState, type CSSProperties } from 'react'
import HeroSeasonScene from './components/HeroSeasonScene'

const ABOUT_TECH = [
  "React.js",
  "JavaScript",
  "HTML & CSS",
  "Python",
  "Swift",
  "C++ / C",
] as const;

type ExperienceItem = {
  role: string
  company: string
  period: string
  location: string
  responsibilities: string[]
}

type SkillCategory = {
  name: string
  items: string[]
}

type Project = {
  name: string
  description: string
  tech: string[]
  link?: string
}

const experiences: ExperienceItem[] = [
  {
    role: 'Wireless Bluetooth QA Engineer',
    company: 'Apple',
    period: 'February 2024 — Present',
    location: 'San Diego, CA',
    responsibilities: [
      'Architected next-gen Bluetooth Low Energy stack for ultra-low power wearables shipped to millions of customers.',
      'Led cross-functional debug initiatives that reduced pairing latency by 37% across iOS and watchOS.',
      'Instrumented RF validation pipelines with automated regression and spectral analytics using TypeScript tooling.',
    ],
  },
  {
    role: 'ASIC Hardware Design Intern',
    company: 'NVIDIA',
    period: 'May — August 2022',
    location: 'Remote',
    responsibilities: [
      'Delivered BLE Audio proof-of-concept for AirPods firmware, coordinating firmware, silicon, and design teams.',
      'Owned co-existence strategy between Bluetooth, Wi-Fi, and UWB radios for flagship Apple devices.',
      'Instrumented silicon bring-up for custom controllers including validation firmware and E2E metrics.',
    ],
  },
  {
    role: 'Consultant',
    company: 'Geek Squad',
    period: 'October 2020 - August 2021',
    location: 'Victorville, CA',
    responsibilities: [
      'Published three peer-reviewed papers on localized Bluetooth mesh networks for assistive technologies.',
      'Developed a multi-radio sensing platform leveraging BLE, LoRa, and mmWave for ambient intelligence research.',
    ],
  },
]

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    items: [
      'Python',
      'C/C#/C++',
      'JavaScript/TypeScript',
      'Swift',
      'Verilog',
      'Bash',
      'Java',
      'TCL',
    ],
  },
  {
    name: 'Frameworks',
    items: [
      'Sci-kit',
      'TensorFlow',
      'Keras',
      'Pandas',
      'NumPy',
      'OpenCV',
    ],
  },
  {
    name: 'Tools',
    items: [
      'Docker',
      'GIT',
    ],
  },
  {
    name: 'Platforms',
    items: [
      'Linux',
      'Windows',
      'Xilinix Vivado',
      'Arduino',
      'Raspberry',
      'NVIDIA SDK',
    ],
  },
]

const projects: Project[] = [
  {
    name: 'Stable Diffusion in Containers',
    description:
      'Dockerized setup pairing the Stable Diffusion Web UI with NVIDIA’s official container toolchain to run multiple model instances efficiently.',
    tech: ['Docker', 'Bash', 'Tailscale', 'NLP', 'Containerization'],
    // link: 'https://www.apple.com/airpods/',
  },
  {
    name: 'Linux "Keyed" USB Access',
    description:
      'Bash + kernel-module workflow that exposes a shell only when a specific RP2040 device is detected (connect/disconnect signals + listener).',
    tech: ['BASH', 'Threading', 'Verification'],
  },
  {
    name: 'Simon Says on FPGA',
    description:
      'Verilog implementation on FPGA with hierarchical design, timing analysis, and testbenches; built the full digital logic pipeline from spec to demo.',
    tech: ['Xilinix Vivado', 'Verilog', 'FPGA', 'Digital Logic Design'],
    // link: 'https://www.media.mit.edu/',
  },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
]

const ABOUT_IMAGE_SRC = '/portrait.png'

const TypewriterText = ({ text }: { text: string }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const displayed = text.slice(0, index)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (direction === 'forward') {
      if (index < text.length) {
        timeout = setTimeout(() => {
          setIndex((prev) => Math.min(prev + 1, text.length))
        }, 90)
      } else {
        timeout = setTimeout(() => {
          setDirection('backward')
        }, 1400)
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => {
          setIndex((prev) => Math.max(prev - 1, 0))
        }, 35)
      } else {
        timeout = setTimeout(() => {
          setDirection('forward')
        }, 600)
      }
    }

    return () => clearTimeout(timeout)
  }, [direction, index, text])

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayed}
        <span className="typewriter-caret" />
      </span>
    </span>
  )
}

function App() {
  const [shouldShowAboutImage, setShouldShowAboutImage] = useState(true)
  const glowContainerRef = useRef<HTMLDivElement | null>(null)
  const [glowAnchor, setGlowAnchor] = useState('38%')
  const glowAnchorValueRef = useRef(0.38)
  const glowAnchorTargetRef = useRef(0.38)
  const glowAnimationRef = useRef<number>(0)

  useEffect(() => {
    const container = glowContainerRef.current
    if (!container) return

    const scheduleAnimation = () => {
      if (glowAnimationRef.current) return

      const animate = () => {
        const current = glowAnchorValueRef.current
        const target = glowAnchorTargetRef.current
        const delta = target - current

        if (Math.abs(delta) < 0.0008) {
          glowAnchorValueRef.current = target
          glowAnimationRef.current = 0
          const percent = `${Math.round(target * 1000) / 10}%`
          setGlowAnchor((prev) => (prev === percent ? prev : percent))
          return
        }

        const eased = current + delta * 0.14
        glowAnchorValueRef.current = eased
        const percent = `${Math.round(eased * 1000) / 10}%`
        setGlowAnchor((prev) => (prev === percent ? prev : percent))

        glowAnimationRef.current = window.requestAnimationFrame(animate)
      }

      glowAnimationRef.current = window.requestAnimationFrame(animate)
    }

    const getSections = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>('[data-glow-section="true"]')
      )

    const updateAnchor = () => {
      const sections = getSections()
      if (!sections.length) return

      const viewportCenter = window.innerHeight * 0.5
      let closestSection = sections[0]
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section
        }
      })

      const containerRect = container.getBoundingClientRect()
      const closestRect = closestSection.getBoundingClientRect()
      const sectionCenterWithinContainer =
        closestRect.top + closestRect.height / 2 - containerRect.top
      const relative =
        containerRect.height > 0
          ? sectionCenterWithinContainer / containerRect.height
          : 0.5
      const clamped = Math.min(0.85, Math.max(0.3, relative))
      glowAnchorTargetRef.current = clamped
      scheduleAnimation()
    }

    let frame = 0

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateAnchor()
      })
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    updateAnchor()

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      if (glowAnimationRef.current) {
        window.cancelAnimationFrame(glowAnimationRef.current)
        glowAnimationRef.current = 0
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div className="bg-background text-slate-200 min-h-screen">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-[-200px] bg-grid-radial blur-3xl" />
          <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <header className="sticky top-0 z-20 border-b border-white/5 bg-background/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="font-semibold tracking-wider text-accent">
              <span className="text-sm uppercase text-slate-400">Angel Lopez-Montano</span>{' '}
              {/* <span className="text-lg text-white">Angel</span> */}
            </div>
            <div className="flex items-center gap-6 text-sm uppercase tracking-[0.25em] text-slate-400">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:angel.chen@icloud.com"
              className="hidden rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent shadow-glow transition hover:bg-accent/20 sm:block"
            >
              Connect
            </a>
          </nav>
        </header>

        <main
          ref={glowContainerRef}
          className="glow-section-stack mx-auto flex max-w-6xl flex-col gap-60 px-6 pb-32 pt-24 sm:pt-32"
          style={{ '--glow-anchor': glowAnchor } as CSSProperties}
        >
          <section
            id="home"
            className="relative grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:items-center mt-12 mb-12"
          >
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
                Software Engineering @ Apple
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
                <TypewriterText text="Hi, I'm Angel" />
              </h1>
              <p className="max-w-xl text-base text-slate-400 sm:text-lg">
              I code stuff sometimes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:angel.chen@icloud.com"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-background transition hover:-translate-y-0.5 hover:shadow-glow"
                >
                  Let&apos;s collaborate
                </a>
                <a
                  href="#projects"
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:border-accent/60 hover:text-accent"
                >
                  View projects
                </a>
              </div>
            </div>
            <HeroSeasonScene />
          </section>

          <section
            id="about"
            data-glow-section="true"
            className="font-about"
            >
          {/* // > rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur" */}
            <h2 className="text-3xl ftext-white sm:text-5xl mb-6">01 / about me</h2>

            <div className = "rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur">
                <div className="grid gap-10 sm:grid-cols-[auto,1fr] sm:items-center">
                  <div className="relative mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-glow sm:mx-0 sm:h-48 sm:w-48">
                    {shouldShowAboutImage ? (
                      <img
                        src={ABOUT_IMAGE_SRC}
                        alt="Angel Lopez-Montano portrait"
                        className="h-full w-full object-cover"
                        onError={() => setShouldShowAboutImage(false)}
                      />
                    ) : (
                      <span className="text-5xl" role="img" aria-label="Apple">
                        🍎
                      </span>
                    )}
                
                    <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20" />
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="max-w-3xl text-xl  text-slate-300">
                      I&apos;m currently a software engineer at <strong className="font-semibold text-orange-500">Apple</strong>, focused on turning complex systems into
                      dependable, user-ready experiences through smart automation and clear tooling. I collaborate
                      across hardware and software to improve reliability, performance, and test coverage.

                    </p>
                      <h3 id="about-tech-title" className="about__h3 -mb-2 text-xl">
                          <strong>Technologies I’ve been currently working with:</strong></h3>

                        <ul className="mt-1 text-lg grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                          {ABOUT_TECH.map((tech) => (
                            <li key={tech} className="flex items-center gap-4 text-slate-300">
                              <span aria-hidden className="text-orange-300 translate-y-[1px]">‣</span>
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>

                    <p className="max-w-3xl text-xl text-slate-300">
                      When I&apos;m not testing or debugging,
                      you can find me playing video games, playing sports and watching new movies.
                    </p>
                  </div>
                </div>
              </div>
              </section>
            

          <section id="experience" data-glow-section="true" className=" font-experience space-y-10">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-5xl">
                02 / experience
              </h2>
            </div>
            <div className="space-y-8">
              {experiences.map((item) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className="rounded-3xl border border-white/5 bg-white/[0.04] p-7 transition hover:border-accent/40 hover:bg-white/[0.08]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.role}
                      </h3>
                      <p className="text-xl uppercase tracking-[0.3em] text-accent">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-base text-slate-400 text-right">
                      <p>{item.period}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-slate-300 text-xl">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent shadow-glow" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" data-glow-section="true" className="font-skills space-y-10">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-5xl">
                03/ skills
              </h2>
              {/* <p className="mt-3 max-w-2xl text-slate-400">
                A blend of deep radio expertise, firmware craftsmanship, and
                product-minded software engineering.
              </p> */}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-3xl border border-white/5 bg-white/[0.04] p-7"
                >
                  <p className="text-xl uppercase tracking-[0.4em] text-accent">
                    {category.name}
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-200 text-lg">
                    {category.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent/80 shadow-glow" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" data-glow-section="true" className="font-projects space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-5xl">
                04 / projects
              </h2>
              {/* <p className="mt-3 max-w-2xl text-slate-400">
                Selected work spanning production features and exploratory
                research that pushes wireless experiences forward.
              </p> */}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.05] p-7 transition hover:border-accent/40 hover:bg-white/[0.09]"
                >
                  <div className="space-y-4">
                    <p className="text-xl uppercase tracking-[0.35em] text-accent">
                      {project.name}
                    </p>
                    <p className="text-lg text-slate-300">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-accent transition hover:underline"
                    >
                      View more -&gt;
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 bg-background/90 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} All rights reserved.</span>
            <span>Built and designed by Cosette Tabucol</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
