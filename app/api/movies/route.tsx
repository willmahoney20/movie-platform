import { NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async () => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/now_playing'
        
        const response = await axios.get(url, {
            params: {
                language: 'en-US',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })

        return NextResponse.json(response.data.results)
    } catch (error) {
        return NextResponse.json(error)
    }
}