'use client'

import { useEffect, useRef, useState } from "react"
import { useParams } from 'next/navigation'
import axios from "axios"
import Link from "next/link"

const results_per_page = 20

export default () => {
	const params = useParams()
    const [data, setData] = useState(null)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const getMovies = async (page: number = 1) => {
        const res = await axios.get('/api/search?search=' + params.search + '&page=' + page)

        setSearch(decodeURIComponent(params.search))
        setCount(res.data.count)
        setData(res.data.movies)
    }

    useEffect(() => {
        getMovies()
    }, [])
    
    const updatePage = (value: number) => {
        if(value !== page){
            getMovies(value)
            setPage(value)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    if(!data) return null

    const calculatePageNumbers = () => {
        const max_page = Math.ceil(count / results_per_page)
        
        let start = Math.max(1, page - 2)
        let end = Math.min(max_page, start + 4)
    
        if (end === max_page) {
            start = Math.max(1, end - 4)
        }
    
        if (start === 1) {
            end = Math.min(max_page, start + 4)
        }
    
        const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index)
        
        return pageNumbers
    }

    const pageNumbers = calculatePageNumbers()

    return (
        <div className="container mx-auto flex flex-col">
            <div className="border-zinc-700 border-b my-2 py-2">
                <p className="text-white text-sm font-medium opacity-70 mr-1">FOUND {count} MATCHES FOR "{search.toUpperCase()}"</p>
            </div>
            {data.map(movie => (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <div className="flex flex-row py-4 border-b border-zinc-700">
                        <div style={{height: '105px', width: '70px', minHeight: '105px', minWidth: '70px'}}>
                            {movie.poster_path ?
                            <img
                                src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
                                alt={movie.title + " Poster"}
                                style={{borderRadius: '3px', minHeight: '100%', maxHeight: '100%'}}
                            /> :
                            <div className="flex items-center justify-center min-h-full min-w-full bg-zinc-800 p-2 shadow-inner shadow-zinc-600" style={{borderRadius: '3px'}}></div>}
                        </div>
                        <div className="flex flex-col ml-4">
                            <div className="flex flex-row items-end">
                                <h3 className="text-white text-xl font-bold">{movie.title}</h3>
                                {movie.release_date &&
                                <h6 className="text-white text font-light ml-3 opacity-70">{movie.release_date.split('-')[0]}</h6>}
                            </div>
                            <div className="py-2">
                                <p className="text-white text-xs font-medium opacity-70">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            {results_per_page < count &&
            <div className="flex flex-row justify-between items-center py-4">
                <div className="w-32">
                    {page > 1 &&
                    <button className="text-white text-xs font-medium opacity-70 bg-zinc-700 px-4 py-2 rounded" onClick={() => updatePage(page - 1)}>PREVIOUS</button>}
                </div>

                <div className="flex flex-row">
                    {pageNumbers[0] !== 1 &&
                    <>
                    <div className="flex items-center justify-center p-2 cursor-pointer hover:bg-zinc-700" onClick={() => updatePage(1)}>
                        <p className="text-white text-xs font-medium opacity-70">1</p>
                    </div>
                    {pageNumbers[0] !== 2 &&
                    <div className="flex items-center justify-center p-2 px-0">
                        <p className="text-white text-xs font-medium opacity-70">...</p>
                    </div>}
                    </>}

                    {pageNumbers.map(item => (
                    <div className="flex items-center justify-center p-2 cursor-pointer hover:bg-zinc-700" onClick={() => updatePage(item)}>
                        <p className={`text-white text-xs ${page === item ? 'font-semibold opacity-100' : 'font-medium opacity-70'}`}>{item}</p>
                    </div>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < Math.ceil(count / results_per_page) &&
                    <>
                    {pageNumbers[pageNumbers.length - 1] !== Math.ceil(count / results_per_page) - 1 &&
                    <div className="flex items-center justify-center p-2 px-0">
                        <p className="text-white text-xs font-medium opacity-70">...</p>
                    </div>}

                    <div className="flex items-center justify-center p-2 cursor-pointer hover:bg-zinc-700" onClick={() => updatePage(Math.ceil(count / results_per_page))}>
                        <p className={`text-white text-xs ${page === Math.ceil(count / results_per_page) ? 'font-semibold opacity-100' : 'font-medium opacity-70'}`}>{Math.ceil(count / results_per_page)}</p>
                    </div>
                    </>}
                </div>
                <div className="flex justify-end w-32">
                    {Math.ceil(count / results_per_page) > page &&
                    <button className="text-white text-xs font-medium opacity-70 bg-zinc-700 px-4 py-2 rounded" onClick={() => updatePage(page + 1)}>NEXT</button>}
                </div>
            </div>}
        </div>
    )
}