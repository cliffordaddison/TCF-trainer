import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'French TCF Trainer - A1→C1 Mastery System',
  description: 'Master French from beginner to advanced with TCF exam preparation, pronunciation training, and intelligent spaced repetition.',
  keywords: 'French, TCF, CEFR, pronunciation, learning, exam preparation',
  authors: [{ name: 'French TCF Trainer' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-french-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
