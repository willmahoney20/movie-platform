import { NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async (req: any, { params }: any) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/' + params.movie_id + '/suggestions'
        
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

        return NextResponse.json(response.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}