'use client'
import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Support', href: '#mission' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#impact' },
  { label: 'Courses', href: '#courses' },
  { label: 'Get Involved', href: '#get-involved' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-9 h-9 bg-primary flex items-center justify-content-center">
            <span className="font-display font-black text-secondary text-xl leading-none flex items-center justify-center w-full h-full">
              Z
            </span>
          </div>
          <div className="leading-tight">
            <p className={`font-display font-bold text-xs uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>Zongea</p>
            <p className={`text-2xs uppercase tracking-wider transition-colors duration-300 ${scrolled ? 'text-stone' : 'text-white/60'}`}>Institute of Technology</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-2xs font-semibold uppercase tracking-widest transition-colors duration-200 ${scrolled ? 'text-stone hover:text-primary' : 'text-white/70 hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#get-involved"
          className="hidden lg:flex items-center gap-2 bg-secondary text-white text-2xs font-semibold uppercase tracking-widest px-5 py-3 hover:bg-primary transition-colors duration-200"
        >
          Support Us
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden ml-auto transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        } bg-canvas`}
      >
        <nav className="flex flex-col px-4 py-4 sm:px-6 sm:py-6 gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-widest text-primary pb-4"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#get-involved"
            className="inline-flex items-center gap-2 bg-secondary text-white text-2xs font-semibold uppercase tracking-widest px-5 py-3 w-fit mt-2"
          >
            Support Us <ArrowUpRight size={13} />
          </a>
        </nav>
      </div>
    </header>
  )
}
