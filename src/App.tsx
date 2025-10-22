type ExperienceItem = {
  role: string
  company: string
  period: string
  location: string
  achievements: string[]
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
    role: 'Senior Bluetooth Systems Engineer',
    company: 'Apple',
    period: '2021 — Present',
    location: 'Cupertino, CA',
    achievements: [
      'Architected next-gen Bluetooth Low Energy stack for ultra-low power wearables shipped to millions of customers.',
      'Led cross-functional debug initiatives that reduced pairing latency by 37% across iOS and watchOS.',
      'Instrumented RF validation pipelines with automated regression and spectral analytics using TypeScript tooling.',
    ],
  },
  {
    role: 'Wireless Connectivity Engineer',
    company: 'Apple',
    period: '2018 — 2021',
    location: 'Cupertino, CA',
    achievements: [
      'Delivered BLE Audio proof-of-concept for AirPods firmware, coordinating firmware, silicon, and design teams.',
      'Owned co-existence strategy between Bluetooth, Wi-Fi, and UWB radios for flagship Apple devices.',
      'Instrumented silicon bring-up for custom controllers including validation firmware and E2E metrics.',
    ],
  },
  {
    role: 'Wireless Systems Researcher',
    company: 'MIT Media Lab',
    period: '2015 — 2018',
    location: 'Cambridge, MA',
    achievements: [
      'Published three peer-reviewed papers on localized Bluetooth mesh networks for assistive technologies.',
      'Developed a multi-radio sensing platform leveraging BLE, LoRa, and mmWave for ambient intelligence research.',
    ],
  },
]

const skillCategories: SkillCategory[] = [
  {
    name: 'Bluetooth & RF',
    items: [
      'Bluetooth LE Audio',
      'BT Classic + BR/EDR',
      'UWB Coexistence',
      'RF Validation & OTA',
      'MATLAB RF Toolkits',
    ],
  },
  {
    name: 'Embedded & Firmware',
    items: [
      'ARM Cortex-M',
      'Real-time OS (FreeRTOS, Zephyr)',
      'Custom ASIC bring-up',
      'Protocol analyzers',
      'Logic Analyzers & JTAG',
    ],
  },
  {
    name: 'Software & Tooling',
    items: [
      'Swift & Objective-C',
      'TypeScript + React',
      'Rust (embedded)',
      'Python automation',
      'CI with GitHub Actions',
    ],
  },
  {
    name: 'Product Leadership',
    items: [
      'Cross-functional collaboration',
      'Technical storytelling',
      'Roadmapping & OKRs',
      'Mentorship & team building',
      'Patent strategy',
    ],
  },
]

const projects: Project[] = [
  {
    name: 'Aurora Pairing Engine',
    description:
      'Adaptive pairing workflow powering seamless multi-device experiences for Apple wearables with predictive heuristics and secure key rotation.',
    tech: ['Swift', 'CoreBluetooth', 'Secure Enclave', 'GraphQL'],
    link: 'https://www.apple.com/airpods/',
  },
  {
    name: 'Spectrum Studio',
    description:
      'Internal RF analytics dashboard streaming real-time lab measurements to interactive React visualizations with automated anomaly detection.',
    tech: ['TypeScript', 'React', 'Tailwind', 'D3.js', 'AWS'],
  },
  {
    name: 'Hypermesh Research Platform',
    description:
      'Experimental Bluetooth mesh firmware enabling centimeter-level indoor positioning for accessibility-focused devices.',
    tech: ['C++', 'Nordic nRF52', 'BLE AoA/AoD', 'MATLAB'],
    link: 'https://www.media.mit.edu/',
  },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
]

function App() {
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
              <span className="text-sm uppercase text-slate-400">portfolio</span>{' '}
              <span className="text-lg text-white">Angel Chen</span>
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

        <main className="mx-auto flex max-w-6xl flex-col gap-32 px-6 pb-32 pt-24 sm:pt-32">
          <section
            id="home"
            className="grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:items-center"
          >
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
                Bluetooth Engineering @ Apple
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
                Building the invisible layer that keeps Apple&apos;s devices
                in sync.
              </h1>
              <p className="max-w-xl text-base text-slate-400 sm:text-lg">
                I design and ship reliable Bluetooth experiences that feel
                effortless. From silicon bring-up to user delight, I thrive at
                the intersection of radio systems, firmware, and product design.
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
            <div className="relative hidden sm:block">
              <div className="absolute inset-0 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-transparent to-transparent blur-lg" />
              <div className="relative flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/5 p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Focus
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Audio, wearables & world-class connectivity.
                  </p>
                </div>
                <div className="grid gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      Current Mission
                    </p>
                    <p className="font-medium text-slate-200">
                      Bluetooth LE Audio & experience design for AirPods and
                      beyond.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      Core Strength
                    </p>
                    <p className="font-medium text-slate-200">
                      Translating RF complexity into intuitive product moments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                About Me
              </h2>
              <p className="max-w-3xl text-lg text-slate-300">
                I&apos;m Angel Chen, a Bluetooth engineer at Apple with nearly a
                decade of experience crafting resilient wireless systems. My
                passion lies in closing the gap between advanced radio science
                and human-centered experiences so the invisible fabric that
                connects our devices simply works.
              </p>
              <p className="max-w-3xl text-lg text-slate-300">
                When I&apos;m not optimizing link budgets or tuning firmware,
                you can find me soldering prototypes, mentoring emerging
                engineers, or exploring sound design. I care deeply about
                accessibility, sustainability, and building teams that thrive on
                curiosity.
              </p>
            </div>
          </section>

          <section id="experience" className="space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Experience
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Strategic engineering leadership across hardware, firmware, and
                experience design with a focus on Bluetooth ecosystems.
              </p>
            </div>
            <div className="space-y-8">
              {experiences.map((item) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className="rounded-3xl border border-white/5 bg-white/[0.04] p-7 transition hover:border-accent/40 hover:bg-white/[0.08]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-sm text-slate-400">
                      <p>{item.period}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-slate-300">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent shadow-glow" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Skills
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                A blend of deep radio expertise, firmware craftsmanship, and
                product-minded software engineering.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-3xl border border-white/5 bg-white/[0.04] p-7"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-accent">
                    {category.name}
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-200">
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

          <section id="projects" className="space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Projects
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Selected work spanning production features and exploratory
                research that pushes wireless experiences forward.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.05] p-7 transition hover:border-accent/40 hover:bg-white/[0.09]"
                >
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-accent">
                      {project.name}
                    </p>
                    <p className="text-sm text-slate-300">
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
            <span>© {new Date().getFullYear()} Angel Chen. All rights reserved.</span>
            <span>Crafted with React, Vite & Tailwind CSS.</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
