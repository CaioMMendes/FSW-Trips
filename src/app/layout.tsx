import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
