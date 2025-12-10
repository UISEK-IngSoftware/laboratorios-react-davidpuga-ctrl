import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Typography 
} from "@mui/material";

export default function PokemonCard({ pokemon }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={pokemon.image}
        alt={pokemon.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {pokemon.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Ver detalle </Button>
      </CardActions>
    </Card>
  );
}