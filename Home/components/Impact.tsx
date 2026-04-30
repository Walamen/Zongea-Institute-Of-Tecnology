'use client'
import { useEffect, useRef } from 'react'
import { Quote } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const stats = [
  { value: 300, suffix: '+', label: 'Students Trained' },
  { value: 100, suffix: '%', label: 'Tuition Free' },
  { value: 4, suffix: '', label: 'Tech Disciplines' },
  { value: 2, suffix: '', label: 'Countries Active' },
  { value: 1, suffix: 'yr', label: 'Program Age' },
  { value: 0, suffix: '∞', label: 'Growth Potential', skipCount: true },
]

const testimonials = [
  {
    name: 'Jonathan HK Williams',
    role: 'UI/UX & Graphic Design Graduate',
    quote:
      'Teaching graphic design to beginners became one of the most clarifying experiences I have had. The tutoring program forced me to truly understand what I thought I already knew.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=90&fit=crop&crop=face',
  },
  {
    name: 'Zongea Graduate',
    role: 'Software Development Track',
    quote:
      'Six months after writing my first line of code, I was standing in front of a class of twenty students teaching HTML structure. The tutoring cycle changed the trajectory of my career.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=90&fit=crop&crop=face',
  },
  {
    name: 'Affiliate Partner',
    role: 'International Collaborator',
    quote:
      'The affiliation program gave us direct access to Liberia\'s rising tech talent. The reporting is clear, the impact is real, and the partnership model is structured for organisations that need accountability.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=90&fit=crop&crop=face',
  },
]

function StatCounter({ value, suffix, label, skipCount }: { value: number; suffix: string; label: string; skipCount?: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    let ctx: any
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          if (skipCount) return
          const { gsap } = await import('gsap')
          
          // Animate the number
          ctx = gsap.to({ val: 0 }, {
            val: value,
            duration: 1.2,
            ease: 'power3.out',
            onUpdate: function () {
              if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].val).toString()
            },
          })
          
          // Add a subtle scale animation
          if (numRef.current?.parentElement) {
            gsap.from(numRef.current.parentElement, {
              scale: 0.8,
              opacity: 0,
              duration: 0.5,
              ease: 'back.out(1.2)',
            })
          }
        }
      },
      { threshold: 0.3 }
    )
    if (numRef.current) observer.observe(numRef.current)
    return () => { observer.disconnect(); ctx?.kill() }
  }, [value, skipCount])

  return (
    <div className="flex flex-col items-center gap-2 py-6 px-3 sm:py-10 sm:px-6 text-center">
      <span className="font-display font-black text-2xl sm:text-4xl text-secondary tracking-tight">
        <span ref={numRef}>{skipCount ? '' : '0'}</span>
        {suffix}
      </span>
      <span className="text-2xs font-medium uppercase tracking-widest text-white/50">{label}</span>
    </div>
  )
}

export default function Impact() {
  return (
    <section id="impact" className="bg-canvas">
      {/* Stats bar */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-14 pb-10 lg:pt-24 lg:pb-16 grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-baseline">
          <MotionWrapper type="fade"><div className="pt-2">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">Student Voices</p>
          </div></MotionWrapper>
          <MotionWrapper type="up"><h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0]">
            Impact in their own words.
          </h2></MotionWrapper>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 pb-20">
          {testimonials.map((t, i) => (
            <MotionWrapper key={t.name} type="up" delay={i * 0.1}>
              <div className="border border-gray-300 rounded-lg p-5 sm:p-10 flex flex-col gap-6 bg-white hover:shadow-md transition-all duration-200">
              <Quote size={28} className="text-secondary" strokeWidth={1.5} />
              <p className="text-base font-light text-stone leading-relaxed italic flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-4 pt-5">
                <div className="w-11 h-11 overflow-hidden flex-shrink-0 rounded-full">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'saturate(0.7) contrast(1.1)' }}
                  />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-primary">{t.name}</p>
                  <p className="text-xs text-stone font-light mt-0.5">{t.role}</p>
                </div>
              </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
