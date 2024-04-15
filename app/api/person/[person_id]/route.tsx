import { NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async (req: any, { params }: any) => {
    try {
        const actor = await axios.get('https://api.themoviedb.org/3/person/' + params.person_id, {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })

        const credits = await axios.get('https://api.themoviedb.org/3/person/' + params.person_id + '/movie_credits', {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })

        let work = { 'actor': credits.data.cast }

        credits.data.crew.forEach(movie => {
            if(Object.keys(work).includes(movie.job.toLowerCase())){
                work[movie.job.toLowerCase()].push(movie)
            } else {
                work[movie.job.toLowerCase()] = [movie]
            }
        })

        return NextResponse.json({
            ...actor.data,
            credits: work
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}