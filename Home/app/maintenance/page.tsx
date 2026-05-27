import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import ContactForm from './ContactForm'

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
        className="w-full flex-shrink-0 relative z-10"
        style={{ height: '4px', background: 'linear-gradient(90deg, #000054 0%, #D4900A 100%)' }}
      />

      {/* Full-width navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-primary/10 bg-canvas">
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

      {/* Two-column body */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row">

        {/* Left — maintenance content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-14 lg:py-20 border-b lg:border-b-0 lg:border-r border-primary/10">

          <div className="w-16 h-16 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-6">
            <Settings size={28} strokeWidth={1.5} className="text-primary" />
          </div>

          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-3">
            Site Maintenance
          </p>
          <div className="w-10 h-[3px] bg-secondary mb-6" />

          <h1 className="font-display font-black text-primary leading-[1.05] tracking-tight text-[clamp(28px,4vw,52px)] mb-5">
            We&rsquo;re Coming<br />Back Soon.
          </h1>

          <p className="text-sm font-light text-stone leading-relaxed max-w-sm">
            Our website is currently undergoing scheduled maintenance.
            We&rsquo;re building something{' '}
            <strong className="font-semibold text-primary">better for you</strong>{' '}
            — please check back shortly.
          </p>
        </div>

        {/* Right — contact form */}
        <div className="lg:w-[46%] xl:w-[44%] bg-primary flex flex-col px-8 sm:px-12 py-14 lg:py-20">

          <div className="mb-8">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-3">
              Have Questions?
            </p>
            <div className="w-10 h-[3px] bg-secondary mb-5" />
            <h2 className="font-display font-black text-white text-[clamp(22px,2.5vw,32px)] leading-tight mb-3">
              Reach Out to Us
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Our team will respond as soon as we&rsquo;re back up and running.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 px-6 sm:px-10 py-4 border-t border-primary/10 bg-canvas">
        <p className="text-2xs text-stone tracking-wide">
          © 2026 Zongea Institute of Technology. All rights reserved.
        </p>
        <p className="text-2xs font-semibold uppercase tracking-widest text-secondary">
          100% Tuition-Free · Liberia
        </p>
      </footer>

    </div>
  )
}
