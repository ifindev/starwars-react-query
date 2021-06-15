import React from 'react'
import { Link, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route, Link as RouterLink } from 'react-router-dom'

import { Dummy, Home, Films, Film } from './components'

export default function Layout(props) {
  const classes = useStyles()

  return (
    <div className="App">
      <nav className={classes.menu}>
        <Link component={RouterLink} to="/">
          <Button color="primary">Home</Button>
        </Link>
        <Link component={RouterLink} to="/films">
          <Button color="primary">Films</Button>
        </Link>
        <Link component={RouterLink} to="/characters">
          <Button color="primary">characters</Button>
        </Link>
      </nav>
      <main className={classes.main}>
        <Switch>
          <Route exact path="/films">
            <Films />
          </Route>
          <Route exact path="/films/:filmId">
            <Film />
          </Route>
          <Route exact path="/characters">
            <Dummy text={'Characters'} />
          </Route>
          <Route exact path="/characters/:characterId">
            <Dummy text={'Single Character'} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '0 auto',
    padding: '16px',
  },

  menu: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#CCC',
    '& button': {
      margin: theme.spacing(1),
    },
  },
}))
