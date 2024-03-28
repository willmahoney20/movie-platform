'use client'

import Link from "next/link"

export default () => {
    return (
        <header className="h-16">
            <div className="container flex justify-between items-center mx-auto px-4 h-full">
                <div>
                    <Link href='/'>
                        <h1 className="text-white font-bold m-0">Home</h1>
                    </Link>
                </div>
                <div>
                </div>
            </div>
        </header>
    )
}