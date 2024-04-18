import { NextResponse } from 'next/server'
import axios from 'axios'
import jobs from '@/app/jobs'

export const GET = async (req: any, { params }: any) => {
    try {        
        const movie = await axios.get('https://api.themoviedb.org/3/movie/' + params.movie_id, {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })
        
        const reviews = await axios.get('https://api.themoviedb.org/3/movie/' + params.movie_id + '/reviews', {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })
        
        const recommendations = await axios.get('https://api.themoviedb.org/3/movie/' + params.movie_id + '/recommendations', {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })
        
        const credits = await axios.get('https://api.themoviedb.org/3/movie/' + params.movie_id + '/credits', {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })

        let cast_included: string[] = []

        let crew: any = {}
        const job_keys = Object.keys(jobs)
        credits.data.crew.forEach((person: any) => {
            job_keys.forEach((job: string) => {
                if(jobs[job].departments.includes(person.job)){
                    const keys = Object.keys(crew)
                    if(keys.includes(job)){
                        crew[job].push(person)
                    } else {
                        crew[job] = [person]
                    }
                }
            })
        })

        return NextResponse.json({
            ...movie.data,
            reviews: reviews.data.results,
            recommendations: recommendations.data.results,
            cast: credits.data.cast.filter(person => {
                if(!cast_included.includes(person.name)){
                    cast_included.push(person.name)
                    return true
                }

                return false
            }),
            crew
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}