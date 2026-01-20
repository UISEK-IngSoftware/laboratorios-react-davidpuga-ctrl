import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/userService";

export default function PokemonCard({ pokemon, onDelete }) {
    const navigate = useNavigate();
    const auth = isAuthenticated();

    const handleDeleteClick = () => {
        if (typeof onDelete !== "function") {
            console.error("onDelete no fue pasado al PokemonCard");
            return;
        }

        const confirmDelete = window.confirm(
            `¿Seguro que deseas eliminar a ${pokemon.name}?`
        );

        if (confirmDelete) {
            onDelete(pokemon.id);
        }
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pokemon.picture}
                alt={pokemon.name}
            />

            <CardContent>
                <Typography variant="h5">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.type}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                {/* 👁 DETALLES */}
                <Button
                    size="small"
                    onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                >
                    Detalles
                </Button>

                {/* ✏️ EDITAR / 🗑 ELIMINAR */}
                {auth && (
                    <>
                        <Button
                            size="small"
                            color="warning"
                            onClick={() => navigate(`/edit/${pokemon.id}`)}
                        >
                            Editar
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            onClick={handleDeleteClick}
                        >
                            Eliminar
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
