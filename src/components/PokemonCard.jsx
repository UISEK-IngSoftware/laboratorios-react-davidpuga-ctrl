
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
export default function PokemonCard({ pokemon }) {

    const pokemonImageUrl = pokemon.picture; 
    
    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pokemonImageUrl}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Type: {pokemon.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Detalles</Button>
            </CardActions>
        </Card>
    );
}