'use client'

import { useEffect, useRef, useState } from "react"
import { useParams } from 'next/navigation'
import axios from "axios"
import Image from "next/image"
import { FaCircle, FaStar } from "react-icons/fa"
import Reel from "@/components/Reel"
import Link from "next/link"

export default () => {
	const params = useParams()
    const [visibleCards, setVisibleCards] = useState(0)
    const [data, setData] = useState(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)

    const getMovie = async () => {
        const res = await axios.get('/api/movies/' + params.movie_id)

        setData(res.data)
    }

    useEffect(() => {
        getMovie()
    }, [])

    useEffect(() => {
        if(containerRef.current){
            const width = containerRef.current.offsetWidth
            setContainerWidth(width)
            setVisibleCards(Math.ceil(width / 120))
        }
    }, [data])

    if(!data) return null

    const getDate = (timestamp: string) => {
        const date = new Date(timestamp)

        const day = date.getDate()
        const monthIndex = date.getMonth()
        const year = date.getFullYear()
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        return `${day}th ${monthNames[monthIndex]} ${year}`
    }

    return (
        <div className="mx-auto flex flex-col items-center">
            {data.backdrop_path &&
            <div className="relative" style={{width: '1200px', height: '575px'}}>
                <div className="absolute" style={{top: '-64px'}}>
                    <Image
                        src={"https://image.tmdb.org/t/p/w1280" + data.backdrop_path}
                        alt={data.title + " Background Poster"}
                        width={1200}
                        height={675}
                    />
                    <div
                        className="absolute top-0 left-0 bg-transparent"
                        style={{
                            width: '1200px',
                            height: '775px',
                            boxShadow: '0px -45px 30px 60px black inset'
                        }}
                    ></div>
                </div>
            </div>}
            <div className="relative container mx-auto py-8">
                <div className="flex flex-row">
                    <div className="cursor-default" style={{height: '300px', width: '200px'}}>
                        {data.poster_path ?
                        <img
                            src={"https://image.tmdb.org/t/p/w200" + data.poster_path}
                            alt={data.title + " Poster"}
                            style={{borderRadius: '3px', minHeight: '100%', maxHeight: '100%'}}
                        /> :
                        <div className="flex items-center justify-center min-h-full min-w-full bg-zinc-800 p-2 shadow-inner shadow-zinc-600" style={{borderRadius: '3px'}}>
                            <h3 className="text-white text-sm font-medium opacity-85 text-center">{data.title}</h3>
                        </div>}
                    </div>

                    <div className="flex flex-col ml-16" style={{width: 'calc(100% - 264px)'}}>
                        <div className="flex flex-row items-end h-8 mb-4">
                            <h3 className="text-white text-3xl font-bold">{data.title}</h3>
                            {data.release_date &&
                            <h6 className="text-white text-xl font-light ml-6 opacity-70">{data.release_date.split('-')[0]}</h6>}
                            {data.vote_average &&
                            <span className="flex flex-row items-center ml-6">
                                <FaStar size='1.1em' color='#fff' style={{marginBottom: '2px'}} />
                                <h6 className="text-white text-xl font-light ml-1 opacity-70">{parseFloat(data.vote_average).toFixed(2)}</h6>
                            </span>}
                        </div>

                        <div className="flex flex-col mb-8">
                            <p className="text-white font-normal opacity-85 mb-1">{data.tagline.toUpperCase()}</p>
                            <p className="text-white font-light opacity-70">{data.overview}</p>
                        </div>

                        {(data.recommendations && data.recommendations.length > 0) &&
                        <div ref={containerRef} className="flex flex-col mb-8">
                            <h4 className="text-white font-medium mb-2">Recommened based on {data.title}</h4>
                            <Reel
                                cards={visibleCards}
                                width={containerWidth}
                                cardSize="sm"
                                movies={data.recommendations}
                                showInfo={false}
                            />
                        </div>}

                        {(data.cast && data.cast.length > 0) &&
                        <div className="flex flex-col mb-8">
                            <h4 className="text-white font-medium mb-2">Cast</h4>
                            <div className="flex flex-row flex-wrap">
                                {data.cast.map(actor => (
                                <Link href={'/actor/' + actor.id} className="mr-2 mb-2">
                                    <div className="bg-zinc-800 rounded p-1 credits-box">
                                        <p className="text-zinc-300 text-xs font-medium m-0">{actor.name}</p>
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>}

                        {(Object.keys(data.crew).length > 0) &&
                        <div className="flex flex-col mb-8">
                            <h4 className="text-white font-medium mb-2">Crew</h4>
                            {Object.keys(data.crew).map(job => (
                            <div className="flex flex-row mb-2">
                                <div className="w-64 min-w-64 overflow-hidden mr-4">
                                    <h6 className="text-white text-xs font-medium opacity-70 py-1 whitespace-nowrap">{job.toUpperCase()} ....................................................................................</h6>
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    {data.crew[job].map(member => (
                                    <Link href={'/crew/' + member.id} className="mr-2 mb-2">
                                        <div className="bg-zinc-800 rounded p-1 credits-box">
                                            <p className="text-zinc-300 text-xs font-medium m-0">{member.name}</p>
                                        </div>
                                    </Link>
                                    ))}
                                </div>
                            </div>
                            ))}
                        </div>}

                        {(data.reviews && data.reviews.length > 0) &&
                        <div className="flex flex-col">
                            <h4 className="text-white font-medium mb-2">Reviews</h4>
                            {data.reviews.map(review => (
                            <div className="flex flex-row items-start py-2">
                                {review.author_details.avatar_path ?
                                <Image
                                    src={"https://image.tmdb.org/t/p/w200" + review.author_details.avatar_path}
                                    alt={review.title + " Poster"}
                                    width={40}
                                    height={40}
                                    style={{borderRadius: '50%', width: '40px', height: '40px'}}
                                /> :
                                <div className="w-10 h-10 rounded-full bg-red"></div>}

                                <div className="flex flex-col ml-4" style={{width: 'calc(100% - 56px)'}}>
                                    <div className="flex flex-row items-center mb-2">
                                        <h6 className="text-white text-sm font-bold leading-4"><span className="font-normal opacity-70">Review by</span> {review.author}</h6>
                                        <FaCircle color="#fff" size="0.3em" className="mx-2" />
                                        <h6 className="text-white text-sm font-normal opacity-70 leading-4">{getDate(review.created_at)}</h6>
                                    </div>
                                    <p className="text-white text-sm font-light opacity-70">{review.content}</p>
                                </div>
                            </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}