import { Box, TextField, Typography, Button, Container } from '@mui/material'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createPokemon } from '../src/services/PokemonService';

export default function PokemonForm() {
  // 1. Estado para capturar los datos (Igual al de tu amigo)
  const [pokemonData, setPokemonData] = useState({
    name: '',
    type: '',
    weight: '',
    height: '',
    picture: null,
  });

  const navigate = useNavigate();

  // 2. Manejador de cambios (Corregido para que funcione con los nombres de los inputs)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setPokemonData({
        ...pokemonData,
        picture: files[0] // Captura el archivo de imagen
      });
    } else {
      setPokemonData({
        ...pokemonData,
        [name]: value
      });
    }
  };

  // 3. Función de envío (Ahora fuera de handleChange, como debe ser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPokemon(pokemonData);
      alert("¡Pokemon creado con éxito!");
      navigate('/'); 
    } catch (error) {
      console.error("Error al crear el Pokémon:", error);
      alert("Hubo un error al crear el Pokémon."); 
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Formulario de Pokemon
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      >
        <TextField 
          label="Nombre" 
          name="name" // IMPORTANTE: El 'name' debe coincidir con el estado
          variant="outlined" 
          value={pokemonData.name}
          onChange={handleChange} 
          required
        />
        <TextField 
          label="Tipo" 
          name="type" 
          variant="outlined" 
          value={pokemonData.type}
          onChange={handleChange} 
          required
        />
        <TextField 
          label="Peso" 
          name="weight" 
          variant="outlined" 
          type="number" 
          value={pokemonData.weight}
          onChange={handleChange} 
          required
        />
        <TextField 
          label="Altura" 
          name="height" 
          variant="outlined" 
          type="number" 
          value={pokemonData.height}
          onChange={handleChange} 
          required
        />
        
        <Typography variant="body2" sx={{ mt: 1 }}>Foto del Pokemon:</Typography>
        <input 
          type="file" 
          name="picture" 
          accept="image/*" 
          onChange={handleChange} 
          required
        /> 

        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2, backgroundColor: "#4479cc" }}
        >
          Guardar Pokemon
        </Button>
      </Box>
    </Box>
  );
}