import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../src/components/PokemonCard';
import { fetchPokemons, deletePokemon } from '../src/services/PokemonService';
import Spinner from '../src/components/Spinner';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Verificamos si el usuario está logueado
    const isAuth = Boolean(localStorage.getItem('access_token'));

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        setLoading(true);
        // Simulamos un retraso de 1.2 segundos para ver el Spinner
        setTimeout(async () => {
            try {
                const data = await fetchPokemons();
                setPokemons(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error obteniendo los pokemons:", error);
            } finally {
                setLoading(false);
            }
        }, 1200);
    };

    const handleDelete = async (id) => {
        // Combinamos la seguridad de tu amigo: confirmación y verificación de Auth
        if (!isAuth) {
            alert("Debes iniciar sesión para eliminar pokémons.");
            return;
        }

        if (!window.confirm('¿Eliminar este Pokémon permanentemente?')) return;

        try {
            await deletePokemon(id);
            // Tu lógica de actualización inmediata del estado
            setPokemons(prev => prev.filter(p => p.id !== id));
            alert('¡Pokémon eliminado correctamente!');
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert('Error al eliminar el Pokémon.');
        }
    };

    // 1. Si está cargando, mostramos el Spinner centrado
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <Spinner />
            </Box>
        );
    }

    // 2. Si no hay pokemons tras la carga
    if (pokemons.length === 0) {
        return (
            <Typography align="center" sx={{ mt: 4 }}>
                No se encontraron Pokémon en la base de datos.
            </Typography>
        );
    }

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {pokemons.map((pokemon) => (
                <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
                    <PokemonCard
                        pokemon={pokemon}
                        isAuth={isAuth} // Le pasamos si está autenticado para mostrar u ocultar botones
                        onDelete={handleDelete}
                        // Agregamos las funciones de navegación de tu amigo
                        onEdit={() => navigate(`/edit-pokemon/${pokemon.id}`)}
                        onViewDetails={() => navigate(`/pokemon/${pokemon.id}`)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}