import { Container, Grid } from "@mui/material";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";

import "./App.css";
import { pokemons } from "./data/pokemons";

function App() {
  return (
    <>
      <Header />

      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {pokemons.map((pokemon) => (
            <Grid item key={pokemon.id} xs={12} sm={6} lg={4}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;