// src/components/PokemonList.jsx

import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PokemonCard from '../src/components/PokemonCard';
import {
    fetchPokemons,
    deletePokemon
} from '../src/services/PokemonService';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        try {
            const data = await fetchPokemons();
            if (Array.isArray(data)) {
                setPokemons(data);
            } else {
                console.error("Respuesta inesperada:", data);
                setPokemons([]);
            }
        } catch (error) {
            console.error("Error obteniendo los pokemons:", error);
            alert("Error obteniendo los pokemons");
        }
    };

    // 🔥 FUNCIÓN CLAVE PARA ELIMINAR
    const handleDelete = async (id) => {
        try {
            await deletePokemon(id);

            // ✅ Eliminación inmediata en el frontend
            setPokemons(prev =>
                prev.filter(pokemon => pokemon.id !== id)
            );
        } catch (error) {
            console.error("Error eliminando el Pokémon:", error);
            alert("No se pudo eliminar el Pokémon");
        }
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
                <Grid
                    item
                    key={pokemon.id}
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <PokemonCard
                        pokemon={pokemon}
                        onDelete={handleDelete}   // ✅ AQUÍ ESTABA EL ERROR
                    />
                </Grid>
            ))}
        </Grid>
    );
}
