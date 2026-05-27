import type { Metadata } from 'next'
import { Settings, Linkedin, Instagram, Twitter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,84,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,84,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Navy → gold gradient bar */}
      <div
        className="w-full flex-shrink-0"
        style={{ height: '4px', background: 'linear-gradient(90deg, #000054 0%, #D4900A 100%)' }}
      />

      <div className="relative flex-1 flex flex-col z-10">

        {/* Navbar */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-primary/10">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-secondary text-xl leading-none">
                Z
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-2xs uppercase tracking-widest text-primary">
                Zongea
              </p>
              <p className="text-2xs uppercase tracking-wider text-stone">
                Institute of Technology
              </p>
            </div>
          </a>

          <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1.5 flex-shrink-0">
            Under Maintenance
          </span>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">

          {/* Gear icon in ring */}
          <div className="w-16 h-16 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-8">
            <Settings size={28} strokeWidth={1.5} className="text-primary" />
          </div>

          {/* Label + gold accent line */}
          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-3">
            Site Maintenance
          </p>
          <div className="w-10 h-[3px] bg-secondary mb-6" />

          {/* Headline */}
          <h1 className="font-display font-black text-primary leading-[1.05] tracking-tight text-[clamp(32px,5vw,56px)] mb-5">
            We&rsquo;re Coming<br className="hidden sm:block" /> Back Soon.
          </h1>

          {/* Body copy */}
          <p className="text-sm sm:text-base font-light text-stone leading-relaxed max-w-md mb-10">
            Our website is currently undergoing scheduled maintenance.
            We&rsquo;re building something{' '}
            <strong className="font-semibold text-primary">better for you</strong>{' '}
            — please check back shortly.
          </p>

          {/* Dot divider */}
          <div className="flex items-center gap-3 w-48 mb-8">
            <div className="flex-1 h-px bg-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Social label */}
          <p className="text-2xs font-bold uppercase tracking-widest text-stone mb-4">
            Follow us for updates
          </p>

          {/* Social buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Linkedin size={13} strokeWidth={2} />
              LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Instagram size={13} strokeWidth={2} />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-primary/20 text-primary text-2xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
            >
              <Twitter size={13} strokeWidth={2} />
              Twitter / X
            </a>
          </div>

        </main>

      </div>

    </div>
  )
}
