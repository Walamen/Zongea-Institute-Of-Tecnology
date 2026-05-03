'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=90&fit=crop',
    label: 'Online Mentoring',
    headline: 'Share your\nexpertise.',
  },
  {
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1400&q=90&fit=crop',
    label: 'Free for Students',
    headline: 'Zero tuition.\nWorld-class skills.',
  },
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=90&fit=crop',
    label: 'Global Community',
    headline: 'One mission.\nTwo continents.',
  },
]

const stats = [
  { value: '300+', label: 'Lives Changed' },
  { value: '100%', label: 'Tuition Free' },
  { value: '4', label: 'Tech Disciplines' },
  { value: 'Global', label: 'Online Programs' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">

      {/* Background slideshow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.05) saturate(0.55) brightness(0.8)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/55 to-primary/90" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 pt-20 pb-4 sm:pt-28 sm:pb-8 max-w-7xl mx-auto w-full min-h-0">

        {/* Slide label + headline — animate per slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="w-6 h-px bg-secondary flex-shrink-0" />
              <p className="text-2xs font-bold uppercase tracking-widest text-secondary">
                {slides[current].label}
              </p>
            </div>

            <h1 className="font-display font-black text-canvas leading-[1.0] tracking-tight text-[clamp(28px,5vw,72px)] whitespace-pre-line mb-3 sm:mb-5">
              {slides[current].headline}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Static subtext + CTAs */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-lg font-light text-white/65 leading-relaxed max-w-lg mb-5 sm:mb-8"
        >
          Join professionals worldwide powering{' '}
          <strong className="font-semibold text-white/90">100% free tech education</strong>{' '}
          in Liberia — mentor, tutor, or partner entirely online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#get-involved"
            className="flex items-center justify-center gap-2 bg-secondary text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-light transition-colors duration-200"
          >
            Become a Mentor
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <a
            href="#programs"
            className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:bg-white/10 hover:border-white/60 transition-colors duration-200"
          >
            See How You Can Help
          </a>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-5 sm:mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-secondary'
                  : 'w-2 h-2 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats bar — pinned to bottom */}
      <div className="relative border-t border-white/10 bg-primary/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                className={`flex flex-col gap-1 py-4 sm:py-6 px-4 sm:px-8
                  ${i % 2 !== 0 ? 'border-l border-white/10 sm:border-l-0' : ''}
                  ${i < 3 ? 'sm:border-r sm:border-white/10' : ''}
                  ${i < 2 ? 'border-b border-white/10 sm:border-b-0' : ''}
                `}
              >
                <span className="font-display font-black text-2xl sm:text-3xl text-secondary tracking-tight">
                  {s.value}
                </span>
                <span className="text-2xs uppercase tracking-widest text-white/50 font-medium">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
