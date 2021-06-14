import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import Layout from './components/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout />
          <ReactQueryDevtools initialIsOpen />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  )
}

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: 'Roboto Mono, monospace',
    },
    h2: {
      fontFamily: 'Roboto Mono, monospace',
    },
    h3: {
      fontFamily: 'Roboto Mono, monospace',
    },
    h4: {
      fontFamily: 'Roboto Mono, monospace',
    },
    h5: {
      fontFamily: 'Roboto Mono, monospace',
    },
    h6: {
      fontFamily: 'Roboto Mono, monospace',
    },
  },
})

export default App
