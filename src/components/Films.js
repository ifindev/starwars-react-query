import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetch } from '../services'

const Films = (props) => {
  const { data, status, error } = useQuery('films', () =>
    fetch('https://swapi.dev/api/films/')
  )

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error :(</p>
  }

  return (
    <div>
      <Typography variant="h3">Films</Typography>
      <hr />
      {data.results.map((film) => {
        const filmUrlParts = film.url.split('/').filter(Boolean)
        const filmId = filmUrlParts[filmUrlParts.length - 1]
        return (
          <article key={film.id}>
            <Link component={RouterLink} to={`/films/${filmId}`}>
              <Typography variant="h6">
                {film.episode_id}. {film.title}{' '}
                <em>
                  ({new Date(Date.parse(film.release_date)).getFullYear()})
                </em>
              </Typography>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export default Films
