import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";

import { fetchPokemonById, deletePokemon } from "../src/services/PokemonService";
import { isAuthenticated } from "../src/services/userService";

export default function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const auth = isAuthenticated();

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const data = await fetchPokemonById(id);
                setPokemon(data);
            } catch (error) {
                console.error("Error cargando el Pokémon", error);
            }
        };
        loadPokemon();
    }, [id]);

    /* 🗑️ ELIMINAR */
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este Pokémon?"
        );

        if (!confirmDelete) return;

        try {
            await deletePokemon(pokemon.id);
            alert("Pokémon eliminado correctamente");
            navigate("/");
        } catch (error) {
            console.error("Error al eliminar el Pokémon", error);
            alert("No se pudo eliminar el Pokémon");
        }
    };

    if (!pokemon) {
        return <CircularProgress />;
    }

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
            <CardMedia
                component="img"
                height="300"
                image={pokemon.picture}
                alt={pokemon.name}
            />

            <CardContent>
                <Typography variant="h4">{pokemon.name}</Typography>
                <Typography>Tipo: {pokemon.type}</Typography>
                <Typography>Peso: {pokemon.weight}</Typography>
                <Typography>Altura: {pokemon.height}</Typography>
            </CardContent>

            <CardContent sx={{ display: "flex", gap: 2 }}>
                <Button onClick={() => navigate("/")}>
                    Volver
                </Button>

                {auth && (
                    <>
                        <Button
                            color="warning"
                            onClick={() => navigate(`/edit/${pokemon.id}`)}
                        >
                            Editar
                        </Button>

                        <Button
                            color="error"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
