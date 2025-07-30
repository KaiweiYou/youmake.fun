import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MainWrapper from './components/layout/MainWrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouMake.Fun',
  description: 'Kaiwei YOU - Interactive artist, Musician, Coder',
  icons: {
    icon: '/icon4.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-white dark:bg-gray-800">
        <Navbar />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Footer />
      </body>
    </html>
  )
}
