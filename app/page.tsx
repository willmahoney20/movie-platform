'use client'

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Reel from "@/components/Reel"
import axios from 'axios'

export default () => {
    const [visibleCards, setVisibleCards] = useState(0)
    const [movies, setMovies] = useState([])
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)

    const getMovies = async () => {
        const res = await axios.get('/api/movies')

        if(res.status === 200){
            setMovies(res.data)
        }
    }

    useEffect(() => {
        if(containerRef.current){
            const width = containerRef.current.offsetWidth
            setContainerWidth(width)
            setVisibleCards(Math.ceil(width / 208))
        }

        getMovies()
    }, [])

    return (
        <div>
            <div className="relative container flex justify-between items-center mx-auto z-0" style={{height: '50vh'}}>
                <div className="flex flex-col z-10" style={{width: '600px'}}>
                    <div className="flex flex-col">
                        <h1 className="text-white text-7xl font-bold mb-4" style={{lineHeight: '85px'}}>The <span className="inline-block border-red" style={{borderBottomWidth: '14px', maxHeight: '80px'}}>Ultimate</span> <span className="inline-block border-red" style={{borderBottomWidth: '16px', maxHeight: '82px'}}>Movie</span> Website</h1>
                        <h5 className="text-white text font-semibold opacity-70">Everyday we add new movies, so you're never going to run out</h5>
                    </div>
                </div>
                <div className="absolute right-0 z-0 overflow-hidden" style={{top: '-64px'}}>
                    <div className="absolute w-64 bg-black rounded-full" style={{top: '-128px', left: '-40px', border: '20px solid #000', borderRadius: '50%', borderRightColor: 'transparent', borderBottomColor: 'transparent', height: 'calc(1400px / (256/160))', filter: 'blur(30px)'}}></div>
                    <Image
                        src="https://wallpapercave.com/wp/wp5555076.jpg"
                        alt='Movie Background'
                        width={1280}
                        height={1280 / (256/160)}
                    />
                </div>
            </div>

            <div ref={containerRef} className="container flex flex-col mx-auto z-20">
                <h4 className="text-white font-bold mb-2 z-30">Now Playing</h4>
                <Reel
                    cards={visibleCards}
                    width={containerWidth}
                    movies={movies}
                    showInfo={true}
                />
            </div>
        </div>
    )
}
