import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material";
import axios from "axios";
import { isAuthenticated } from "../src/services/userService";
import Spinner from "../src/components/Spinner";
=======
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { isAuthenticated } from "../src/services/userService";
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c

export default function TrainerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [trainer, setTrainer] = useState({
    first_name: "", last_name: "", age: "", level: "", date_of_birth: "", picture: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      setTimeout(() => {
        axios.get(`http://127.0.0.1:8000/api/entrenadores/${id}/`)
          .then(res => {
            setTrainer({
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              age: res.data.age,
              level: res.data.level,
              date_of_birth: res.data.date_of_birth,
              picture: null
            });
            if (res.data.picture) setPreview(res.data.picture);
          })
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
      }, 1000);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      const file = files[0];
      setTrainer({ ...trainer, picture: file });
      if (file) setPreview(URL.createObjectURL(file));
=======
  const [loading, setLoading] = useState(isEdit);
  const [trainer, setTrainer] = useState({
    first_name: "",
    last_name: "",
    age: "",
    level: "",
    date_of_birth: "",
    picture: null
  });

  const [preview, setPreview] = useState(null);

  /* PRECARGA EN EDICIÓN */
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://127.0.0.1:8000/api/entrenadores/${id}/`)
        .then(res => {
          setTrainer({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            age: res.data.age,
            level: res.data.level,
            date_of_birth: res.data.date_of_birth,
            picture: null
          });
          
          if (res.data.picture) {
            setPreview(res.data.picture);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  /* CAMBIOS EN INPUTS Y PREVIEW */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const file = files[0];
      setTrainer({ ...trainer, picture: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
    } else {
      setTrainer({ ...trainer, [name]: value });
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert("Inicia sesión primero.");
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
    const formData = new FormData();
    Object.keys(trainer).forEach(key => {
      if (trainer[key] !== null) formData.append(key, trainer[key]);
    });

    setTimeout(async () => {
      try {
        if (isEdit) {
          await axios.put(`http://127.0.0.1:8000/api/entrenadores/${id}/`, formData);
          alert("¡Entrenador actualizado!");
        } else {
          await axios.post(`http://127.0.0.1:8000/api/entrenadores/`, formData);
          alert("¡Entrenador creado!");
        }
        navigate("/trainers");
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
      <Typography sx={{ mt: 2 }}>Actualizando Liga Pokémon...</Typography>
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          {isEdit ? "Editar Entrenador" : "Nuevo Entrenador"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nombre" name="first_name" value={trainer.first_name} onChange={handleChange} required fullWidth />
          <TextField label="Apellido" name="last_name" value={trainer.last_name} onChange={handleChange} required fullWidth />
          <TextField label="Edad" name="age" type="number" value={trainer.age} onChange={handleChange} required fullWidth />
          <TextField label="Nivel" name="level" type="number" value={trainer.level} onChange={handleChange} required fullWidth />
          <TextField label="Fecha de Nacimiento" name="date_of_birth" type="date" value={trainer.date_of_birth} onChange={handleChange} InputLabelProps={{ shrink: true }} required fullWidth />

          <Typography variant="body2">Foto:</Typography>
          <input type="file" name="picture" accept="image/*" onChange={handleChange} required={!isEdit} />

          {preview && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <img src={preview} alt="Vista previa" style={{ width: 150, height: 150, objectFit: "contain", borderRadius: 8, border: "1px solid #ddd" }} />
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#4479cc" }}>Guardar</Button>
            <Button variant="outlined" fullWidth onClick={() => navigate("/trainers")}>Cancelar</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
=======
    const formData = new FormData();
    formData.append("first_name", trainer.first_name);
    formData.append("last_name", trainer.last_name);
    formData.append("age", trainer.age);
    formData.append("level", trainer.level);
    formData.append("date_of_birth", trainer.date_of_birth);

    if (trainer.picture) {
      formData.append("picture", trainer.picture);
    }

    try {
      if (isEdit) {
        await axios.put(`http://127.0.0.1:8000/api/entrenadores/${id}/`, formData);
        alert("¡Entrenador actualizado!");
      } else {
        await axios.post(`http://127.0.0.1:8000/api/entrenadores/`, formData);
        alert("¡Entrenador creado!");
      }
      navigate("/trainers");
    } catch (error) {
      alert("Error al guardar los datos.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        {isEdit ? "Editar Entrenador" : "Formulario de Entrenador"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      >
        <TextField
          label="Nombre"
          name="first_name"
          value={trainer.first_name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Apellido"
          name="last_name"
          value={trainer.last_name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Edad"
          name="age"
          type="number"
          value={trainer.age}
          onChange={handleChange}
          required
        />

        <TextField
          label="Nivel"
          name="level"
          type="number"
          value={trainer.level}
          onChange={handleChange}
          required
        />

        <TextField
          label="Fecha de Nacimiento"
          name="date_of_birth"
          type="date"
          value={trainer.date_of_birth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <Typography variant="body2">Foto del Entrenador:</Typography>

        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          required={!isEdit}
        />

        {/* 🔥 PREVIEW IGUAL A POKEMON */}
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

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#4479cc" }}
          >
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/trainers")}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
  );
}