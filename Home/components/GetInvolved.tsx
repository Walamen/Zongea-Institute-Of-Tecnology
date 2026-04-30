'use client'
import { Compass, Network, BookOpen, GraduationCap, Heart, ArrowRight, Globe2 } from 'lucide-react'
import { MotionWrapper } from './MotionWrapper'

const options = [
  {
    title: 'Become a Mentor',
    desc: 'Share your professional expertise with Liberia\'s next generation — entirely online. Two to four hours per month from the US or anywhere in the world makes a lasting difference.',
    icon: Compass,
    cta: 'Mentor Online',
    cls: 'bg-secondary text-white',
    ctaCls: 'border-white text-white hover:bg-white hover:text-secondary',
    badge: 'Most Needed',
  },
  {
    title: 'Affiliate or Partner',
    desc: 'Companies, NGOs, universities, and individuals: sponsor a cohort, fund a student\'s journey, or co-design programs. Full impact reporting and direct access to rising talent.',
    icon: Network,
    cta: 'Start a Partnership',
    cls: 'bg-primary text-white',
    ctaCls: 'border-white text-white hover:bg-white hover:text-primary',
    badge: 'High Impact',
  },
  {
    title: 'Join as a Tutor',
    desc: 'Open to Zongea graduates and global educators alike. Run online sessions, support learners in Liberia remotely, and deepen your own mastery through the act of teaching.',
    icon: BookOpen,
    cta: 'Tutor Online',
    cls: 'bg-canvas text-primary',
    ctaCls: 'border-primary text-primary hover:bg-primary hover:text-white',
    badge: 'Online — Worldwide',
  },
  {
    title: 'Apply as a Student',
    desc: 'Based in Liberia and ready to begin? Apply for the next free intake. No financial requirements — just commitment and a willingness to give back when you graduate.',
    icon: GraduationCap,
    cta: 'Apply — It\'s Free',
    cls: 'bg-secondary-light text-primary',
    ctaCls: 'border-primary text-primary hover:bg-primary hover:text-white',
    badge: 'Liberia Only',
  },
]

export default function GetInvolved() {
  return (
    <section id="get-involved" className="bg-parchment">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 lg:pt-24 lg:pb-16 grid lg:grid-cols-[auto_1fr_1fr] gap-6 lg:gap-12 items-start">
        <MotionWrapper type="fade">
          <div className="pt-2">
            <p className="text-2xs font-bold uppercase tracking-widest text-secondary whitespace-nowrap">
              Get Involved
            </p>
          </div>
        </MotionWrapper>
        <MotionWrapper type="up">
          <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] tracking-tight leading-[1.0]">
            Your role in<br />this mission.
          </h2>
        </MotionWrapper>
        <MotionWrapper type="up" delay={0.1}>
          <p className="text-base font-light text-stone leading-relaxed self-end">
            Whether you mentor, tutor, partner, or donate — every contribution from the
            global community directly keeps tech education free for young people in Liberia.
          </p>
        </MotionWrapper>
      </div>

      {/* Option cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {options.map((o, i) => {
            const Icon = o.icon
            return (
              <MotionWrapper key={o.title} type="up" delay={i * 0.08}>
                <div className={`${o.cls} border border-gray-300 rounded-lg p-5 sm:p-8 flex flex-col gap-5 min-h-0 sm:min-h-[340px] shadow-sm relative overflow-hidden`}>
                  {/* Badge */}
                  <span className="hidden sm:block absolute top-4 right-4 text-2xs font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
                    {o.badge}
                  </span>
                  <Icon size={28} strokeWidth={1.5} className="mt-3 sm:mt-6" />
                  <h3 className="font-display font-bold text-xl tracking-tight leading-snug">{o.title}</h3>
                  <p className="text-sm font-light leading-relaxed opacity-80 flex-1">{o.desc}</p>
                  <a
                    href="mailto:info@zongeatech.com"
                    className={`inline-flex items-center gap-2 font-semibold text-2xs uppercase tracking-widest border px-4 py-2.5 w-fit transition-colors duration-200 rounded ${o.ctaCls}`}
                  >
                    {o.cta}
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </MotionWrapper>
            )
          })}
        </div>

        {/* Donate strip — featured */}
        <MotionWrapper type="up">
          <div className="mt-20 bg-primary rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-8 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col  items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Heart size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-canvas">
                    Support the mission financially
                  </h3>
                  <p className="text-sm font-light text-canvas/60 mt-2 max-w-xl leading-relaxed">
                    Your donation funds equipment, reliable internet, curriculum development, and
                    program expansion — directly keeping every seat free for students in Liberia
                    who could never afford to pay.
                  </p>
                  {/* Impact breakdown */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mt-5">
                    {[
                      { amount: '$25', impact: 'funds a student\'s internet for a month' },
                      { amount: '$100', impact: 'covers curriculum materials for a cohort' },
                      { amount: '$500', impact: 'sponsors a full student seat' },
                    ].map((t) => (
                      <div key={t.amount} className="flex items-center gap-2">
                        <span className="font-display font-black text-secondary text-sm">{t.amount}</span>
                        <span className="text-xs text-canvas/50 font-light">{t.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="mailto:info@zongeatech.com"
                  className="inline-flex items-center gap-2 bg-secondary text-white font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-dark transition-colors duration-200 rounded"
                >
                  Donate to Zongea
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
                <p className="text-2xs text-canvas/40 text-center font-light">
                  Every dollar goes directly to the program
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Global reach note */}
        <MotionWrapper type="fade" delay={0.1}>
          <div className="mt-10 flex items-center gap-3 justify-center py-4">
            <Globe2 size={14} className="text-stone" strokeWidth={1.5} />
            <p className="text-xs text-stone font-light text-center">
              Mentoring and tutoring programs are fully online — open to professionals everywhere.
              The free bootcamp serves students in Liberia.
            </p>
          </div>
        </MotionWrapper>

      </div>
    </section>
  )
}
