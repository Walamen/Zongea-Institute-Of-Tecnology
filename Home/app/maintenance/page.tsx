import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Coming Soon — Zongea Institute of Technology',
  description: 'Our website is currently under maintenance. We will be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="h-full flex flex-col bg-canvas  ">

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
      <header className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-3 border-b border-primary/10 bg-primary">
        <a href="/">
          <Image
            src="/logo-light.png"
            alt="Zongea Institute of Technology"
            width={300}
            height={300}
            className="h-14 sm:h-16 w-auto"
            priority
          />
        </a>
        <span className="text-2xs font-bold uppercase tracking-widest text-secondary border border-secondary/40 px-3 py-1 flex-shrink-0">
          Under Maintenance
        </span>
      </header>

      {/* Two-column body —  */}
      <div className=" lg:h-[90vh] grid grid-cols-1 lg:grid-cols-2 ">

        {/* Left — maintenance content */}
        <div className="flex-1   flex flex-col items-center justify-center text-center px-8 py-8 border-b lg:border-b-0 lg:border-r border-primary/10">

          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
  <div className="absolute inset-0 rounded-full border-8 border-primary/20 border-t-primary animate-[spin_6s_linear_infinite]" />

  <div className="absolute inset-3 rounded-full border-8 border-primary/10 border-b-secondary animate-[spin_6s_linear_infinite_reverse]" />

  <div className="w-28 h-28 rounded-full bg-primary/5 flex items-center justify-center">
    <Settings className="text-primary" size={64} />
  </div>
</div>
          <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-2">
            Site Maintenance
          </p>
          <div className="w-8 h-[3px] bg-secondary mb-4" />

          <h1 className="font-display font-black text-primary leading-[1.2] tracking-tight text-[clamp(32px,4.5vw,64px)] mb-4">
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
        <div className="bg-white flex flex-col justify-center  px-8 sm:px-12 py-8">

          <div className="mb-5">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary mb-2">
              Have Questions?
            </p>
            <div className="w-8 h-[3px] bg-secondary mb-4" />
            <h2 className="font-display font-black text-primary text-[clamp(20px,2.5vw,28px)] leading-tight mb-2">
              Reach Out to Uss
            </h2>
            <p className="text-sm text-stone leading-relaxed">
              Our team will respond as soon as we&rsquo;re back up and running.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer className=" flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1 px-6 sm:px-10 py-3 border-t border-primary/10 bg-canvas">
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
