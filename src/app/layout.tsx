import { NextAuthProvider } from '@/providers/auth'
import './globals.css'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'], weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]
})
export const metadata = {
  title: 'Trips',
  description: 'Book your trip',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>

      </body>
    </html>
  )
}
