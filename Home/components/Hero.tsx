'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Users, BookOpen, Globe2 } from 'lucide-react'

const stats = [
  { value: '300+', label: 'Lives Changed', icon: Users },
  { value: '100%', label: 'Free for Students', icon: BookOpen },
  { value: 'Global', label: 'Online Programs', icon: Globe2 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-10 ">
          

            <motion.h1 variants={itemVariants} className="font-display font-black leading-[0.95] tracking-tight lg:mt-8">
              <span className="block text-[clamp(55px,7vw,84px)] text-primary">Mentor.</span>
              <span className="block my-2 text-[clamp(55px,6vw,84px)] text-secondary">Tutor.</span>
              <span className="block text-[clamp(55px,5.3vw,75px)] text-primary">Partner.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg font-light text-stone leading-relaxed max-w-lg">
              Join professionals from the US and around the world powering{' '}
              <strong className="font-semibold text-primary">100% free tech education</strong> in
              Liberia. Mentor or tutor entirely online, partner as an organisation — your support
              keeps every seat tuition-free.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#get-involved"
                className="inline-flex items-center gap-2 bg-secondary text-white font-semibold text-sm uppercase tracking-widest px-7 py-4 hover:bg-primary transition-colors duration-200"
              >
                Become a Mentor
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold text-sm uppercase tracking-widest px-7 py-4 hover:bg-primary hover:text-canvas transition-colors duration-200"
              >
                See How You Can Help
              </a>
            </motion.div>

            {/* Stat bar */}
            <motion.div variants={itemVariants} className="flex  w-fit mt-8 gap-y-4">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="hero-stat flex flex-col gap-1 px-7 py-5">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className="text-secondary" strokeWidth={2} />
                      <span className="font-display font-black text-2xl text-secondary tracking-tight">
                        {s.value}
                      </span>
                    </div>
                    <span className="text-2xs uppercase tracking-widest text-stone font-medium">
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right — image block */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=90&fit=crop"
                alt="Global professionals mentoring tech students online"
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.1) saturate(0.85)' }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
            </motion.div>

            {/* Floating card A — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 right-0 bg-parchment p-4 min-w-[180px] border border-gray-300 shadow-sm"
            >
             <div className="inline-flex items-center gap-3 bg-parchment px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              <span className="text-2xs font-semibold uppercase tracking-widest text-stone">
                Online Programs — US &amp; Worldwide
              </span>
            </div>
            </motion.div>

            {/* Floating card B — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bottom-0 left-0 bg-secondary-light p-4 min-w-[190px] shadow-sm"
            >
              <p className="font-display font-bold text-sm text-primary">Your support →</p>
              <p className="text-xs text-stone mt-1 font-light">Free education in Liberia</p>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  )
}
