import React from 'react'
import {
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useQuery } from 'react-query'
import { fetchData } from '../services'

const Character = (props) => {
  const characterId = props.match.params.characterId
  // eslint-disable-next-line
  const { status, error, data } = useQuery(`character-${characterId}`, () =>
    fetchData(`https://swapi.dev/api/people/${characterId}/`)
  )

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>Error :(</p>

  // console.info({ data, status, error })

  const homeworldUrlParts = data.homeworld.split('/').filter(Boolean)
  const homeworldId = homeworldUrlParts[homeworldUrlParts.length - 1]

  if (status !== 'success') {
    return null
  }

  return (
    <div>
      <Typography variant="h3">{data.name}</Typography>
      <TableContainer
        component={Paper}
        style={{ maxWidth: '400px', marginTop: '20px' }}
      >
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Born</TableCell>
              <TableCell>{data.birth_year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eyes</TableCell>
              <TableCell>{data.eye_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair</TableCell>
              <TableCell>{data.hair_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{data.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{data.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Homeworld</TableCell>
              <TableCell>
                <Homeworld id={homeworldId} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Films
      </Typography>
      {data.films.map((film) => {
        const filmUrlParts = film.split('/').filter(Boolean)
        const filmId = filmUrlParts[filmUrlParts.length - 1]
        return <Film id={filmId} key={`Film-${filmId}`} />
      })}
    </div>
  )
}

const Homeworld = ({ id }) => {
  const { data, status } = useQuery(`homeworld-${id}`, () =>
    fetchData(`https://swapi.dev/api/planets/${id}/`)
  )

  if (status !== 'success') {
    return null
  }

  return data.name
}

const Film = ({ id }) => {
  // eslint-disable-next-line
  const { data, status, error } = useQuery(`film-${id}`, () =>
    fetchData(`https://swapi.dev/api/films/${id}/`)
  )

  if (status !== 'success') {
    return null
  }

  return (
    <article key={id}>
      <Link component={RouterLink} to={`/films/${id}`}>
        <Typography variant="h6">
          {data.episode_id}. {data.title}
        </Typography>
      </Link>
    </article>
  )
}

export default withRouter(Character)
