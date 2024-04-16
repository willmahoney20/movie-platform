'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default () => {
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSearch = e => {
        e.preventDefault()

        return router.push(`/search/${search}`);
    }

    return (
        <header className="h-16 z-20">
            <div className="container flex justify-between items-center mx-auto h-full">
                <div>
                    <Link href='/'>
                        <h2 className="text-red text-3xl font-bold">MARTINI<span className="text-white">SHOT</span></h2>
                    </Link>
                </div>
                <div>
                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder='Search...'
                            className='bg-zinc-700 text-sm text-white font-medium p-2 px-3 rounded-xl w-48'
                        />
                        <button type='submit' className='none'></button>
                    </form>
                </div>
            </div>
        </header>
    )
}