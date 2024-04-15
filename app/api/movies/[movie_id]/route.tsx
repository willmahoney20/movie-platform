import { NextResponse } from 'next/server'
import axios from 'axios'

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
        let crew_included: string[] = []

        return NextResponse.json({
            ...movie.data,
            reviews: reviews.data.results,
            recommendations: recommendations.data.results,
            cast: credits.data.cast.filter(x => {
                if(!cast_included.includes(x.name)){
                    cast_included.push(x.name)
                    return true
                }

                return false
            }),
            crew: credits.data.crew.filter(x => {
                if(!crew_included.includes(x.name)){
                    crew_included.push(x.name)
                    return true
                }

                return false
            })
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}