import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import LayoutClient from '@/components/LayoutClient'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'iCellaré Lifespan Center | Premium Stem Cell Therapy in Bangkok',
  description: 'Your exclusive destination for the gold standard in regenerative medicine. State-of-the-art autologous stem cell technology, rejuvenation innovation, and personalized care.',
  keywords: ['stem cell therapy', 'Bangkok medical tourism', 'regenerative medicine', 'aesthetics', 'genetic testing'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
