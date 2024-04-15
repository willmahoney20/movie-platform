'use client'

import Image from "next/image"
import Link from "next/link"

export default () => {
    return (
        <header className="h-16 z-20">
            <div className="container flex justify-between items-center mx-auto h-full">
                <div>
                    <Link href='/'>
                        <h2 className="text-red text-3xl font-bold">MARTINI<span className="text-white">SHOT</span></h2>
                    </Link>
                </div>
                <div>
                </div>
            </div>
        </header>
    )
}