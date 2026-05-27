import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="relative h-screen flex flex-col bg-canvas overflow-hidden">

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

      {/* Navbar */}
      <header className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-3 border-b border-primary/10 bg-canvas">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display font-black text-secondary text-lg leading-none">
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
        <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1 flex-shrink-0">
          Under Maintenance
        </span>
      </header>

      {/* Two-column body — min-h-0 lets it shrink to fit the viewport */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col lg:flex-row">

        {/* Left — maintenance content */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center px-8 py-8 border-b lg:border-b-0 lg:border-r border-primary/10">

          <div className="w-14 h-14 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-4">
            <Settings size={24} strokeWidth={1.5} className="text-primary" />
          </div>

          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-2">
            Site Maintenance
          </p>
          <div className="w-8 h-[3px] bg-secondary mb-4" />

          <h1 className="font-display font-black text-primary leading-[1.05] tracking-tight text-[clamp(26px,3.5vw,48px)] mb-4">
            We&rsquo;re Coming<br />Back Soon.
          </h1>

          <p className="text-sm font-light text-stone leading-relaxed max-w-sm">
            Our website is currently undergoing scheduled maintenance.
            We&rsquo;re building something{' '}
            <strong className="font-semibold text-primary">better for you</strong>{' '}
            — please check back shortly.
          </p>
        </div>

        {/* Right — contact form, scrolls internally if viewport is very short */}
        <div className="lg:w-[46%] xl:w-[44%] bg-primary flex flex-col px-8 sm:px-12 py-8 overflow-y-auto">

          <div className="mb-5">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-2">
              Have Questions?
            </p>
            <div className="w-8 h-[3px] bg-secondary mb-4" />
            <h2 className="font-display font-black text-white text-[clamp(20px,2.5vw,28px)] leading-tight mb-2">
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
      <footer className="relative z-10 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1 px-6 sm:px-10 py-3 border-t border-primary/10 bg-canvas">
        <p className="text-2xs text-stone tracking-wide">
          © 2026 Zongea Institute of Technology. All rights reserved.
        </p>
        <p className="text-2xs font-semibold uppercase tracking-widest text-secondary">
          100% Tuition-Free
        </p>
      </footer>

    </div>
  )
}
