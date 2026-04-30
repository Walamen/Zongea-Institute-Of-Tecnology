'use client'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

const nav = {
  Programs: [
    { label: 'Mentoring Program', href: '#programs' },
    { label: 'Tutoring Program', href: '#programs' },
    { label: 'Affiliation Program', href: '#programs' },
  ],
  Courses: [
    { label: 'Software Development', href: '#courses' },
    { label: 'UI / UX Design', href: '#courses' },
    { label: 'Graphic Design', href: '#courses' },
    { label: 'Cybersecurity', href: '#courses' },
  ],
  'Get Involved': [
    { label: 'Apply as Student', href: '#get-involved' },
    { label: 'Become a Mentor', href: '#get-involved' },
    { label: 'Join as Tutor', href: '#get-involved' },
    { label: 'Affiliate / Partner', href: '#get-involved' },
    { label: 'Donate', href: '#get-involved' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary text-canvas">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top row */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-16 py-12 lg:py-20">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-xl text-white leading-none">Z</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm uppercase tracking-widest">Zongea</p>
                <p className="text-2xs uppercase tracking-wider text-white/40">Institute of Technology</p>
              </div>
            </div>

            <p className="text-sm font-light text-white/55 leading-relaxed max-w-xs">
              A 100% tuition-free tech institute in Monrovia, Liberia — building Africa's next generation of tech leaders through mentoring, tutoring, and affiliation.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@zongeatech.com"
                className="flex items-center gap-2 text-sm text-white/55 hover:text-secondary transition-colors font-light"
              >
                <Mail size={14} strokeWidth={1.5} />
                info@zongeatech.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/55 font-light">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>Monrovia, Liberia · United States</span>
              </div>
            </div>

            <a
              href="https://zongeatech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-widest text-secondary hover:text-white transition-colors w-fit"
            >
              zongeatech.com
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {Object.entries(nav).map(([section, items]) => (
              <div key={section}>
                <h4 className="text-2xs font-bold uppercase tracking-widest text-secondary mb-5">{section}</h4>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm font-light text-white/50 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-7">
          <p className="text-xs text-white/30 font-light">
            &copy; {new Date().getFullYear()} Zongea Institute of Technology. All rights reserved.
          </p>
          <p className="text-xs text-white/25 italic font-light">
            Empowering Liberia's digital future, one student at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
