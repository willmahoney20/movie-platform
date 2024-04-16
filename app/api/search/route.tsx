import { NextResponse } from 'next/server'
import axios from 'axios'
import { NextApiRequest } from 'next'

export const GET = async (req: NextApiRequest) => {
    try {
        let filters = {}
        req.url?.split('?')[1].split('&').forEach(item => {
            const split = item.split('=')
            filters[split[0]] = split[1]
        })

        const movies = await axios.get('https://api.themoviedb.org/3/search/movie?query=' + filters.search, {
            params: {
                language: 'en-US',
                page: filters.page
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
            }
        })

        return NextResponse.json({
            movies: movies.data.results,
            count: movies.data.total_results
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}