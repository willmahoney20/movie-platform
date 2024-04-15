'use client'

import { useState } from "react"
import Image from "next/image"
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from "next/link"

export default ({ cards, width, cardSize, movies, showInfo }: { cards: number, width: number, cardSize: string, movies: [], showInfo: boolean }) => {
    const [reelPosition, setReelPosition] = useState(0)

    const decreaseReel = () => {
        if(reelPosition > 0) setReelPosition(prev => prev - 1)
    }

    const increaseReel = () => {
        if(reelPosition < movies.length - cards + 1) setReelPosition(prev => prev + 1)
    }

    if(movies.length < 1) return null

    let size = cardSize === 'sm' ? 120 : 200

    return (
        <div className="relative">
            <FaChevronLeft color='#777' size='1.5em' className="absolute cursor-pointer" style={{top: 'calc(50% - 15px)', left: `-${size * 0.32}px`}} onClick={decreaseReel} />
            <FaChevronRight color='#777' size='1.5em' className="absolute cursor-pointer" style={{top: 'calc(50% - 15px)', right: `-${size * 0.32}px`}} onClick={increaseReel} />
            {reelPosition !== movies.length - cards + 1 &&
            <div className="absolute top-0" style={{right: '-8px', width: size * 0.6 + 'px', height: size * 1.5 + 'px', background: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', opacity: 1, filter: 'blur(5px)'}}></div>}
            <div className="overflow-hidden">
                <div
                    className="flex flex-row"
                    style={{
                        transition: 'margin-left 0.5s ease',
                        marginLeft: reelPosition === movies.length - cards + 1 ?
                        `-${reelPosition * (size + 8) - (width - (cards - 1) * (size + 8)) - 8}px` :
                        `-${reelPosition * (size + 8)}px`
                    }}
                >
                    {movies.map(movie => (
                        <Link href={`/movies/${movie.id}`} key={movie.id}>
                            <div className="flex flex-col mr-2" style={{minWidth: size + 'px'}}>
                                <Image
                                    src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
                                    alt={movie.title + " Poster"}
                                    width={size}
                                    height={size * 1.5}
                                />
                                {showInfo &&
                                <div className="flex flex-col mt-2">
                                    <h5 className="text-white text-xs font-bold mb-1">
                                        {movie.title}
                                    </h5>
                                    <div className="flex flex-row">
                                        <FaStar color='#fff' size="0.8em" style={{marginRight: '2px'}} />
                                        <h5 className="text-white text-xs font-bold mb-1 opacity-60">
                                            {parseFloat(movie.vote_average).toFixed(2)}
                                        </h5>
                                    </div>
                                </div>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
