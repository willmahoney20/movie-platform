import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
    title: "Movie App",
    description: "The ultimate movie app..."
}

export default async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={poppins.className}>
                  <div className="flex flex-col justify-between min-h-screen bg-black">
                      <Navbar />
                      <div style={{minHeight: 'calc(100vh - 96px)'}}>
                          {children}
                      </div>
                      <Footer />
                  </div>
            </body>
        </html>
    )
}