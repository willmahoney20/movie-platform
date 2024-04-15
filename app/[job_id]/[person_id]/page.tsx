'use client'

import { useEffect, useRef, useState } from "react"
import { useParams } from 'next/navigation'
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FaChevronDown } from "react-icons/fa"
import jobs from "@/app/jobs"

export default () => {
	const params = useParams()
    const [showBio, setShowBio] = useState(false)
    const [job, setJob] = useState('actor')
    const [data, setData] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsDropdown, setCreditsDropdown] = useState(false)

    const getActor = async () => {
        const res = await axios.get('/api/person/' + params.person_id)
        
        let job = 'actor'
        if(typeof params.job_id === 'string') job = params.job_id
        setJob(job)

        setCredits(res.data.credits)
        setData({
            ...res.data,
            credits: res.data.credits
        })
    }

    useEffect(() => {
        getActor()
    }, [])

    const updateJob = (str: string) => {
        if(str !== job){
            setJob(str)
            setCreditsDropdown(false)
        }
    }

    if(!data) return null

    return (
        <div className="container mx-auto flex flex-row items-start py-8">
            <div className="flex flex-col" style={{width: 'calc(100% - 294px)'}}>
                <div className="flex flex-col pb-4">
                    <h5 className="text-white text font-normal opacity-85">FILMS {jobs[job] ? jobs[job].addon : 'BY'}</h5>
                    <h3 className="text-white text-2xl font-bold">{data.name}</h3>
                </div>

                <div className="flex flex-row justify-between items-center border-zinc-700 border-b border-t my-2 mb-4 py-2">
                    <div>
                        <div className="relative">
                            <span className="flex flex-row items-center cursor-pointer" onClick={() => setCreditsDropdown(prev => !prev)}>
                                <p className="text-white text-xs font-light opacity-70 mr-1">{job.toUpperCase()}</p>
                                <FaChevronDown size='0.6em' color='#aaa' />
                            </span>
                            {creditsDropdown &&
                            <ul className="absolute top-6 p-2 rounded bg-zinc-700" style={{left: '-8px'}}>
                                {Object.keys(credits).map(str => (
                                <li className="text-white text-xs font-light opacity-70 whitespace-nowrap py-1 cursor-pointer" onClick={() => updateJob(str)}>{str.toUpperCase()} - <span className="font-semibold">{credits[str].length}</span></li>
                                ))}
                            </ul>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {credits[job].sort((a, b) => {
                        if(a.popularity < b.popularity){
                            return 1
                        } else if(a.popularity > b.popularity){
                            return -1
                        }
                    }).map(movie => (
                        <Link href={`/movies/${movie.id}`} key={movie.id}>
                            {movie.poster_path ? 
                            <img
                                src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
                                alt={movie.title + " Poster"}
                                style={{borderRadius: '3px', minHeight: '100%', maxHeight: '100%'}}
                            />
                            :
                            <div className="flex items-center justify-center min-h-full min-w-full bg-zinc-800 p-2 shadow-inner shadow-zinc-600" style={{borderRadius: '3px'}}>
                                <h3 className="text-white text-sm font-medium opacity-85 text-center">{movie.title}</h3>
                            </div>}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col ml-16" style={{width: '230px'}}>
                {data.profile_path &&
                <Image
                    src={"https://image.tmdb.org/t/p/w500" + data.profile_path}
                    alt={data.name}
                    width={230}
                    height={345}
                    style={{borderRadius: '3px', width: '230px', height: '345px'}}
                />}
                {data.biography &&
                <div className="mt-2 overflow-hidden">
                    <p className="text-white text-sm font-light opacity-70 mb-0 overflow-hidden" style={{height: showBio ? 'unset' : '100px'}}>{data.biography}</p>
                    {!showBio &&
                        <p className="text-white text-sm font-semibold opacity-70 overflow-hidden">
                            ... <span className="actor-bio-more cursor-pointer" onClick={() => setShowBio(true)}>more</span>
                    </p>}
                </div>}
            </div>
        </div>
    )
}