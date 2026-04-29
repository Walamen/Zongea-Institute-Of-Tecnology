'use client'
import { CheckCircle, ArrowRight, Compass, BookMarked, HandshakeIcon } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const programs = [
  {
    index: '01',
    title: 'Online Mentoring',
    badge: 'US & Worldwide — Fully Online',
    tagline: 'Guide from wherever you are.',
    icon: Compass,
    description:
      'Zongea connects students in Liberia with seasoned professionals across the US and the world — entirely online. No travel, no long commitments. Just two to four hours per month of your expertise that maps directly to a young person\'s career trajectory. Your mentoring is also what keeps the program free: the more professionals who join, the further we can grow.',
    features: [
      'Fully online — mentor from the US, UK, or anywhere',
      '2–4 hours per month, flexible scheduling',
      'Career mapping, skill coaching, and real-world guidance',
      'Your involvement directly funds free education in Liberia',
    ],
    cta: 'Become a Mentor',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=90&fit=crop',
    alt: 'Professional conducting an online mentoring session',
    theme: { bg: 'bg-canvas', accent: 'text-secondary', btn: 'bg-secondary text-white hover:bg-primary' },
    flip: false,
  },
  {
    index: '02',
    title: 'Online Tutoring',
    badge: 'Global Educators Welcome',
    tagline: 'Share what you know. Fund what matters.',
    icon: BookMarked,
    description:
      'Whether you\'re a Zongea graduate giving back or a global educator who wants to make a difference — our online tutoring program connects skilled people with learners in Liberia. Run structured sessions remotely, answer questions, and reinforce concepts for students who otherwise couldn\'t afford access. Every tutoring hour translates directly into a free seat kept open.',
    features: [
      'Open to Zongea graduates and global educators alike',
      'Structured curriculum support provided',
      'Fully remote — sessions run online via video call',
      'Directly sustains the free bootcamp model',
    ],
    cta: 'Join as a Tutor',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=90&fit=crop',
    alt: 'Online tutoring session in progress',
    theme: { bg: 'bg-parchment', accent: 'text-secondary', btn: 'bg-secondary text-white hover:bg-primary hover:text-white' },
    flip: true,
  },
  {
    index: '03',
    title: 'Partnership & Sponsorship',
    badge: 'Companies, NGOs & Individuals',
    tagline: 'Partner with purpose. Fund a generation.',
    icon: HandshakeIcon,
    description:
      'Zongea\'s reach is powered by organisations and individuals who believe in what we\'re building. Whether you\'re a company looking to sponsor a cohort, an NGO seeking a co-design partner, or an individual who wants to fund a student\'s entire journey — there is a partnership model built for your context. Your investment comes with full impact reporting and a direct line to Liberia\'s rising tech talent.',
    features: [
      'Cohort sponsorships and student scholarship packages',
      'Corporate social impact partnerships with branded reporting',
      'Skills-based volunteering and guest lecture opportunities',
      'Direct access to a pipeline of trained Liberian tech graduates',
    ],
    cta: 'Start a Partnership',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=90&fit=crop',
    alt: 'Partnership and collaboration between professionals',
    theme: { bg: 'bg-primary', accent: 'text-secondary', btn: 'bg-secondary text-white hover:bg-canvas hover:text-primary' },
    flip: false,
  },
]

export default function Programs() {
  return (
    <section id="programs">
      {/* Section header */}
      <div className="bg-canvas">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-[auto_1fr_1fr] gap-12 items-start">
          <MotionWrapper type="fade">
            <div className="pt-2">
              <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">
                How to Support
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper type="up">
            <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0] text-primary">
              Three ways to give back.<br />One outcome: free education.
            </h2>
          </MotionWrapper>
          <MotionWrapper type="up" delay={0.1}>
            <p className="text-base font-light text-stone leading-relaxed self-end">
              Whether you are a professional in the US, an educator anywhere in the world, or an
              organisation with purpose — there is a seat for you in the Zongea network. Every
              role directly funds free tech training in Liberia.
            </p>
          </MotionWrapper>
        </div>
      </div>

      {/* Program blocks */}
      {programs.map((p) => {
        const Icon = p.icon
        return (
          <div key={p.index} className={`${p.theme.bg}`}>
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${p.flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>

                {/* Image */}
                <MotionWrapper type={p.flip ? 'right' : 'left'}>
                  <div className="relative">
                    <div className="overflow-hidden aspect-[4/3] rounded-lg">
                      <img
                        src={p.image}
                        alt={p.alt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        style={{ filter: 'contrast(1.08) saturate(0.88)' }}
                      />
                    </div>
                    {/* Index stamp */}
                    <div className={`absolute top-0 ${p.flip ? 'left-0' : 'right-0'} bg-secondary px-3 py-2 rounded`}>
                      <span className="font-display font-black text-xs text-white tracking-widest">{p.index}</span>
                    </div>
                  </div>
                </MotionWrapper>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <MotionWrapper type="fade">
                    <div className="flex flex-col gap-2 pt-4">
                      <div className="flex items-center gap-3 w-fit">
                        <Icon size={16} className={p.theme.accent} strokeWidth={2} />
                        <span className={`text-2xs font-bold uppercase tracking-widest ${p.theme.accent}`}>
                          {p.title}
                        </span>
                      </div>
                      {/* Online badge */}
                      <span
                        className={`text-2xs font-semibold uppercase tracking-wider px-3 py-1 w-fit rounded ${
                          p.theme.bg === 'bg-primary'
                            ? 'bg-canvas/10 text-canvas/60'
                            : 'bg-secondary/10 text-secondary-dark'
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>
                  </MotionWrapper>

                  <MotionWrapper type="up">
                    <h3
                      className={`font-display font-black text-[clamp(26px,3vw,40px)] tracking-tight leading-[1.1] ${
                        p.theme.bg === 'bg-primary' ? 'text-canvas' : 'text-primary'
                      }`}
                    >
                      {p.tagline}
                    </h3>
                  </MotionWrapper>

                  <MotionWrapper type="up" delay={0.08}>
                    <p
                      className={`text-base font-light leading-relaxed ${
                        p.theme.bg === 'bg-primary' ? 'text-canvas/65' : 'text-stone'
                      }`}
                    >
                      {p.description}
                    </p>
                  </MotionWrapper>

                  <MotionWrapper type="up" delay={0.14}>
                    <ul className="flex flex-col gap-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <CheckCircle
                            size={15}
                            className={`flex-shrink-0 mt-0.5 ${p.theme.accent}`}
                            strokeWidth={2}
                          />
                          <span className={p.theme.bg === 'bg-primary' ? 'text-canvas/80' : 'text-stone'}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </MotionWrapper>

                  <MotionWrapper type="fade" delay={0.2}>
                    <div className="mt-6">
                      <a
                        href="#get-involved"
                        className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded transition-colors duration-200 ${p.theme.btn}`}
                      >
                        {p.cta}
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </MotionWrapper>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
