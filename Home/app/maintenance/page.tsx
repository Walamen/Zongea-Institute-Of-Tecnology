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
        <p className="text-stone p-8">sections coming…</p>
      </div>

    </div>
  )
}
