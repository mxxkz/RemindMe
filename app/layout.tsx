import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "@/components/Provider";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RemindMe',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={
      cn(inter.className,
          "antialiased min-h-screen pt-16"
      )}>
    <Providers>
      <Navbar/>
      <main className="px-4 pt-6">
      {children}
        <Toaster/>
      </main>
    </Providers>
    </body>
    </html>
  )
}
