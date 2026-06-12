import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zongea Institute of Technology',
  description: '100% tuition-free tech education in Liberia. Mentoring, tutoring, and affiliation programs building Liberia\'s next generation of tech leaders.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
