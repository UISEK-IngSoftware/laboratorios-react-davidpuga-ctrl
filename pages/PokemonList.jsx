// src/components/PokemonList.jsx

import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PokemonCard from '../src/components/PokemonCard';
import { fetchPokemons } from '../src/services/PokemonService'; 

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons()
            .then((data) => {
                // CORRECCIÓN FINAL: Si la respuesta es un ARRAY directo, usa data.
                if (Array.isArray(data)) {
                     setPokemons(data); 
                } 
                // Si tienes alguna vista con paginación que use 'results', puedes descomentar lo siguiente:
                /* else if (data && Array.isArray(data.results)) {
                     setPokemons(data.results); 
                } */ 
                else {
                    console.error('La API no devolvió un array directo. Respuesta:', data);
                    setPokemons([]);
                }
            })
            .catch((error) => {
                console.error('Error obteniendo los pokemons:', error);
                alert("Error obteniendo los pokemons. Verifica el servidor.");
            });
    }, []); 

    return (
        <Grid container spacing={2}>
            {Array.isArray(pokemons) && pokemons.map(
                (pokemon, index) => (
                    <Grid item key={pokemon.id || index} xs={12} sm={6} md={4}> 
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                )
            )}
        </Grid>
    );
}