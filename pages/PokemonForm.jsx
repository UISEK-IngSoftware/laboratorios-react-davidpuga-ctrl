<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
=======
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
import {
  createPokemon,
  updatePokemon,
  fetchPokemonById,
} from "../src/services/PokemonService";
<<<<<<< HEAD
import { isAuthenticated } from "../src/services/userService";
import Spinner from "../src/components/Spinner";
=======

import { isAuthenticated } from "../src/services/userService";
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c

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
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // Para el Spinner
=======
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c

  /* PRECARGA EN EDICIÓN */
  useEffect(() => {
    if (isEdit) {
<<<<<<< HEAD
      setLoading(true);
      setTimeout(() => {
        fetchPokemonById(id)
          .then((data) => {
            setPokemonData({
              name: data.name,
              type: data.type,
              weight: data.weight,
              height: data.height,
              picture: null,
            });
            if (data.picture) setPreview(data.picture);
          })
          .finally(() => setLoading(false));
      }, 1000);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      const file = files[0];
      setPokemonData({ ...pokemonData, picture: file });
      if (file) setPreview(URL.createObjectURL(file));
=======
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
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
    } else {
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión.");
=======
  /* GUARDAR */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para continuar.");
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
      navigate("/login");
      return;
    }

<<<<<<< HEAD
    setLoading(true);
    // Retraso artificial para ver el Spinner al guardar
    setTimeout(async () => {
      try {
        if (isEdit) {
          await updatePokemon(id, pokemonData);
          alert("¡Pokémon actualizado!");
        } else {
          await createPokemon(pokemonData);
          alert("¡Pokémon creado!");
        }
        navigate("/");
      } catch (error) {
        alert("Error al guardar.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  if (loading) return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
      <Spinner />
      <Typography sx={{ mt: 2 }}>Procesando Pokédex...</Typography>
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          {isEdit ? "Editar Pokémon" : "Nuevo Pokémon"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nombre" name="name" value={pokemonData.name} onChange={handleChange} required fullWidth />
          <TextField label="Tipo" name="type" value={pokemonData.type} onChange={handleChange} required fullWidth />
          <TextField label="Peso" name="weight" type="number" value={pokemonData.weight} onChange={handleChange} required fullWidth />
          <TextField label="Altura" name="height" type="number" value={pokemonData.height} onChange={handleChange} required fullWidth />
          
          <Typography variant="body2">Foto del Pokémon:</Typography>
          <input type="file" name="picture" accept="image/*" onChange={handleChange} required={!isEdit} />

          {preview && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <img src={preview} alt="Vista previa" style={{ width: 150, height: 150, objectFit: "contain", borderRadius: 8, border: "1px solid #ddd" }} />
            </Box>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#4479cc" }}>
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
=======
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
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
