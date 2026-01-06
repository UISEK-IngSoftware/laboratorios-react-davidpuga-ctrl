import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Header from './components/Header'
import PokemonList from '../pages/PokemonList'
import PokemonForm from '../pages/PokemonForm'
import Login from '../pages/Login'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/add-pokemon" element={<PokemonForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App