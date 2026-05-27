import type { Metadata } from 'next'

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

      </div>

    </div>
  )
}
