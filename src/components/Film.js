import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useQuery } from 'react-query'
import { fetchData } from '../services'

const Film = (props) => {
  const filmId = props.match.params.filmId
  const { data, status, error } = useQuery(`film-${filmId}`, () =>
    fetchData(`https://swapi.dev/api/films/${filmId}/`)
  )

  if (status === 'loading') {
    return <p>Loading..</p>
  }

  if (status === 'error') {
    return <p>Error :( {error}</p>
  }

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: '10px' }}>
        {data.title}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '10px' }}>
        {data.opening_crawl}
      </Typography>
      <hr />
      <Typography variant="h4">Characters</Typography>
      {data.characters.map((character) => {
        const characterUrlParts = character.split('/').filter(Boolean)
        const characterId = characterUrlParts[characterUrlParts.length - 1]
        return <Character id={characterId} />
      })}
    </div>
  )
}

const Character = ({ id }) => {
  // eslint-disable-next-line
  const { data, status, error } = useQuery(`character-${id}`, () =>
    fetchData(`https://swapi.dev/api/people/${id}/`)
  )

  if (status !== 'success') {
    return null
  }

  return (
    <article key={id}>
      <Link component={RouterLink} to={`/characters/${id}`}>
        <Typography variant="h6">{data.name}</Typography>
      </Link>
    </article>
  )
}

export default withRouter(Film)
