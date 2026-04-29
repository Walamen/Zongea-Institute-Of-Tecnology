'use client'
import { Code2, Figma, Pen, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const courses = [
  {
    title: 'Software Development',
    icon: Code2,
    tags: ['HTML / CSS', 'JavaScript', 'React', 'Node.js', 'Python'],
    desc: 'Build applications that work — from responsive interfaces to server-side logic. This track covers the complete web stack with real project deliverables throughout.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=90&fit=crop',
  },
  {
    title: 'UI / UX Design',
    icon: Figma,
    tags: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    desc: 'Design digital products that are intuitive and purposeful. Learn to move from raw research through wireframes to high-fidelity prototypes that solve  problems.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&q=90&fit=crop',
  },
  {
    title: 'Graphic Design',
    icon: Pen,
    tags: ['Adobe Suite', 'Branding', 'Typography', 'Print & Digital'],
    desc: 'Master the craft of visual communication — from brand identities to marketing assets. Build a professional portfolio that reflects real  businesses and communities.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=90&fit=crop',
  },
  {
    title: 'Cybersecurity',
    icon: ShieldCheck,
    tags: ['Network Security', 'Ethical Hacking', 'Risk Analysis'],
    desc: 'Protect systems and data in a continent rapidly moving online. Learn to identify vulnerabilities, think like an attacker, and defend infrastructure that matters.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=90&fit=crop',
  },
]

export default function Courses() {
  return (
    <section id="courses" className="bg-parchment">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-[auto_1fr_auto] gap-12 items-center">
        <MotionWrapper type="fade"><div className="pt-2">
          <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">What You Fund</p>
        </div></MotionWrapper>
        <MotionWrapper type="up">
          <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0]">
            What your support<br />makes possible.
          </h2>
          <p className="text-base font-light text-stone leading-relaxed mt-4 max-w-xl">
            Every mentor session and partnership dollar pays for world-class instruction
            across four in-demand tech disciplines — at no cost to the student.
          </p>
        </MotionWrapper>
        <MotionWrapper type="fade" delay={0.1}><div className="bg-secondary px-6 py-4 text-center self-center rounded-lg">
          <p className="text-2xs font-bold uppercase tracking-widest text-canvas">100% Free</p>
          <p className="text-xs text-canvas/60 mt-1 font-light">Funded by our global community</p>
        </div></MotionWrapper>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {courses.map((c, i) => {
            const Icon = c.icon
            return (
              <MotionWrapper key={c.title} type="up" delay={i * 0.08}>
                <div className="border border-gray-300 rounded-lg bg-white flex flex-col group hover:-translate-y-1 transition-transform duration-300 shadow-sm overflow-hidden h-[420px]">

                  {/* Image — fixed height */}
                  <div className="h-[200px] flex-shrink-0 overflow-hidden relative">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ filter: 'contrast(1.1) saturate(0.8)' }}
                    />
                    <div className="absolute bottom-3 left-3 bg-white p-1.5 rounded">
                      <Icon size={16} className="text-secondary" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content section — fixed remaining height, slide area */}
                  <div className="relative flex-1 overflow-hidden">

                    {/* Default panel — slides down on hover */}
                    <div className="absolute inset-0 p-6 flex flex-col gap-4 bg-white group-hover:translate-y-full transition-transform duration-300 ease-out">
                      <h3 className="font-display font-bold text-lg tracking-tight">{c.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags.map((t) => (
                          <span key={t} className="text-2xs font-semibold uppercase tracking-wider bg-gray-100 px-2 py-1 text-stone rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover panel — slides up from below */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <div>
                        <h3 className="font-display font-bold text-lg tracking-tight text-white mb-2">{c.title}</h3>
                        <p className="text-sm font-light text-white/80 leading-relaxed">{c.desc}</p>
                      </div>
                      <a
                        href="#get-involved"
                        className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-widest text-secondary hover:text-secondary-light transition-colors my-2"
                      >
                        Apply for this track
                        <ArrowUpRight size={12} strokeWidth={2.5} />
                      </a>
                    </div>

                  </div>

                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
