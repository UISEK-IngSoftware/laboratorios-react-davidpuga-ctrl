import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createPokemon,
  updatePokemon,
  fetchPokemonById,
} from "../src/services/PokemonService";

import { isAuthenticated } from "../src/services/userService";

export default function PokemonForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
    picture: null,
  });

  const [preview, setPreview] = useState(null);

  /* PRECARGA EN EDICIÓN */
  useEffect(() => {
    if (isEdit) {
      fetchPokemonById(id).then((data) => {
        setPokemonData({
          name: data.name,
          type: data.type,
          weight: data.weight,
          height: data.height,
          picture: null,
        });

        if (data.picture) {
          setPreview(data.picture); // 👈 imagen existente
        }
      });
    }
  }, [id, isEdit]);

  /* CAMBIOS EN INPUTS */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const file = files[0];
      setPokemonData({ ...pokemonData, picture: file });

      if (file) {
        setPreview(URL.createObjectURL(file)); // 👈 preview nueva imagen
      }
    } else {
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

  /* GUARDAR */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para continuar.");
      navigate("/login");
      return;
    }

    try {
      if (isEdit) {
        await updatePokemon(id, pokemonData);
        alert("¡Pokémon actualizado con éxito!");
      } else {
        await createPokemon(pokemonData);
        alert("¡Pokémon creado con éxito!");
      }
      navigate("/");
    } catch (error) {
      alert("Hubo un error al guardar el Pokémon.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Editar Pokémon" : "Formulario de Pokémon"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={pokemonData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Tipo"
          name="type"
          value={pokemonData.type}
          onChange={handleChange}
          required
        />

        <TextField
          label="Peso"
          name="weight"
          type="number"
          value={pokemonData.weight}
          onChange={handleChange}
          required
        />

        <TextField
          label="Altura"
          name="height"
          type="number"
          value={pokemonData.height}
          onChange={handleChange}
          required
        />

        <Typography variant="body2">Foto del Pokémon:</Typography>

        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          required={!isEdit}
        />

        {/* 🔥 PREVIEW */}
        {preview && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <img
              src={preview}
              alt="Vista previa"
              style={{
                width: 150,
                height: 150,
                objectFit: "contain",
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#4479cc" }}
        >
          {isEdit ? "Actualizar Pokémon" : "Guardar Pokémon"}
        </Button>
      </Box>
    </Box>
  );
}
