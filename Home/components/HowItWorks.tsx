'use client'
import { Globe2, GraduationCap, UserCheck, Repeat } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const steps = [
  {
    num: '01',
    title: 'A Global Community Forms',
    desc: 'Mentors, tutors, and partners from the US and worldwide join Zongea\'s network online — contributing their time, expertise, and resources to keep the program alive.',
    icon: Globe2,
  },
  {
    num: '02',
    title: 'Students Train for Free',
    desc: 'In Liberia, accepted students enter one of four in-demand tech tracks — fully funded by our global supporters. No tuition, no fees, no financial barriers. Just commitment.',
    icon: GraduationCap,
  },
  {
    num: '03',
    title: 'Mentors Guide Each Student',
    desc: 'Every student is paired online with a working professional for career coaching, roadmapping, and real-world insight — building a bridge between Liberia and the global tech industry.',
    icon: UserCheck,
  },
  {
    num: '04',
    title: 'Graduates Sustain the Cycle',
    desc: 'After graduating, students step back in as tutors and mentors — paying forward the support that shaped them and reducing the cost burden for the next cohort.',
    icon: Repeat,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-canvas">
      {/* Header */}
      
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 lg:pt-24 lg:pb-16 grid lg:grid-cols-[auto_1fr_1fr] gap-6 lg:gap-12 items-start">
       
        <MotionWrapper type="up">
           <MotionWrapper type="fade">
          <div className="pb-4 md:pb-8">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">
              The Ecosystem
            </p>
          </div>
        </MotionWrapper>
          <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0]">
            One community.<br />Two continents.
          </h2>
        </MotionWrapper>
        <MotionWrapper type="up" delay={0.1}>
          <p className="text-base font-light text-stone leading-relaxed self-end">
            Global supporters and Liberian students operate as one self-sustaining ecosystem —
            each role feeding the next, so the program never has to charge a cent.
          </p>
        </MotionWrapper>
      </div>

      {/* Steps grid */}
      <div className="max-w-7xl mx-auto px-6 pb-10 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <MotionWrapper key={s.num} type="up" delay={i * 0.1}>
                <div className="border border-gray-300 rounded-lg p-5 sm:p-8 flex flex-col gap-6 bg-white shadow-sm h-full">
                  <div className="flex justify-between items-start">
                    <span className="font-display font-black text-xs tracking-widest bg-secondary text-white px-2.5 py-1 rounded">
                      {s.num}
                    </span>
                    <Icon size={24} className="text-stone" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug tracking-tight">{s.title}</h3>
                  <p className="text-sm font-light text-stone leading-relaxed flex-1">{s.desc}</p>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>

      {/* Banner image */}
      <MotionWrapper type="scale">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="relative overflow-hidden h-48 sm:h-72 lg:h-96 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=90&fit=crop"
              alt="Global community supporting students in Liberia"
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.15) saturate(0.65) brightness(0.45)' }}
            />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
              <p className="font-display font-black text-canvas text-[clamp(20px,3vw,36px)] max-w-2xl leading-tight tracking-tight">
                "We do not just teach technology. We build a global community that teaches together."
              </p>
              <p className="mt-3 sm:mt-5 text-2xs font-semibold uppercase tracking-widest text-gold">
                — Zongea Institute of Technology
              </p>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </section>
  )
}
