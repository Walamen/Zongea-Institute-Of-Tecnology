'use client'
import React from 'react'
import { Globe2, Zap, GraduationCap, ArrowRight } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const pillars = [
  {
    num: '01',
    icon: Globe2,
    title: 'You Contribute Online',
    subtitle: 'From the US & Worldwide',
    desc: 'Mentors, tutors, and partners across the globe give their expertise entirely online. No travel, no long commitments — a few hours a month is all it takes to change a life.',
    bg: 'bg-slate-700',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Zongea Stays Free',
    subtitle: 'Powered by Global Support',
    desc: 'Every mentoring session, partnership agreement, and donation directly funds equipment, internet, curriculum, and operations — keeping every single seat 100% tuition-free.',
    bg: 'bg-secondary',
  },
  {
    num: '03',
    icon: GraduationCap,
    title: 'Liberia Learns',
    subtitle: 'Zero Cost, World-Class Skills',
    desc: 'Young people in Monrovia access the same quality tech training as anywhere in the world — at zero personal cost — and graduate ready to work, teach, and give back.',
    bg: 'bg-slate-700',
  },
]

export default function FundingCycle() {
  return (
    <section id="mission" className="bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Section header */}
        <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-6 lg:gap-12 items-start mb-8 lg:mb-16">
          <MotionWrapper type="fade">
            <div className="pt-2">
              <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">
                The Engine
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper type="up">
            <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0] text-primary">
              Your support keeps<br />education free.
            </h2>
          </MotionWrapper>
          <MotionWrapper type="up" delay={0.1}>
            <p className="text-base font-light text-stone leading-relaxed self-end">
              Zongea charges no fees and runs no ads. Every free seat in the bootcamp
              flows directly from the generosity of mentors, tutors, and partners in our
              global community.
            </p>
          </MotionWrapper>
        </div>

        {/* Flow pillars */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <React.Fragment key={p.num}>
                <MotionWrapper type="up" delay={i * 0.12} className="flex-1">
                  <div className={`${p.bg} text-white rounded-lg p-5 sm:p-8 flex flex-col gap-5 min-h-0 sm:min-h-[260px] h-full`}>
                    <div className="flex items-start justify-between">
                      <Icon size={34} strokeWidth={1.5} className="opacity-90" />
                      <span className="font-display font-black text-xs tracking-widest opacity-30">
                        {p.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl tracking-tight leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-2xs font-semibold uppercase tracking-widest opacity-60 mt-1.5">
                        {p.subtitle}
                      </p>
                    </div>
                    <p className="text-sm font-light leading-relaxed opacity-80 flex-1">{p.desc}</p>
                  </div>
                </MotionWrapper>

                {i < pillars.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-3 flex-shrink-0">
                    <ArrowRight size={22} className="text-secondary" strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* CTA banner */}
        <MotionWrapper type="up" delay={0.3}>
          <div className="mt-10 border border-slate-300 rounded-lg p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <p className="font-display font-bold text-[clamp(16px,2vw,22px)] text-primary max-w-2xl leading-snug">
              "Every mentor hour, every partnership, every donation keeps a seat free in Liberia."
            </p>
            <a
              href="#get-involved"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-secondary text-white font-semibold text-sm uppercase tracking-widest px-7 py-4 hover:bg-secondary-dark transition-colors duration-200 rounded"
            >
              Join the Community
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </MotionWrapper>

      </div>
    </section>
  )
}
