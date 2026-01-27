import axios from "axios";

<<<<<<< HEAD
// Si la variable de entorno no existe, usamos la URL local de Django por defecto
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/pokedex";
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c

/* ===========================
   INTERCEPTOR (TOKEN OAUTH)
=========================== */
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===========================
   OBTENER TODOS
=========================== */
export async function fetchPokemons() {
<<<<<<< HEAD
  // Ahora usamos la URL completa corregida
=======
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
  const response = await axios.get(`${API_BASE_URL}/pokemons/`);
  return response.data;
}

/* ===========================
   OBTENER DETALLE
=========================== */
export async function fetchPokemonById(id) {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}

/* ===========================
   CREAR
=========================== */
export async function createPokemon(pokemonData) {
  if (!localStorage.getItem("access_token")) {
    throw new Error("No autenticado");
  }

  const formData = new FormData();
  formData.append("name", pokemonData.name);
  formData.append("type", pokemonData.type);
  formData.append("weight", pokemonData.weight);
  formData.append("height", pokemonData.height);

  if (pokemonData.picture) {
    formData.append("picture", pokemonData.picture);
  }

  const response = await axios.post(
    `${API_BASE_URL}/pokemons/`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
}

/* ===========================
   EDITAR
=========================== */
export async function updatePokemon(id, pokemonData) {
  if (!localStorage.getItem("access_token")) {
    throw new Error("No autenticado");
  }

  const formData = new FormData();
  formData.append("name", pokemonData.name);
  formData.append("type", pokemonData.type);
  formData.append("weight", pokemonData.weight);
  formData.append("height", pokemonData.height);

  if (pokemonData.picture) {
    formData.append("picture", pokemonData.picture);
  }

  const response = await axios.put(
    `${API_BASE_URL}/pokemons/${id}/`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
}

/* ===========================
   ELIMINAR
=========================== */
export async function deletePokemon(id) {
  if (!localStorage.getItem("access_token")) {
    throw new Error("No autenticado");
  }

  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
  return response;
<<<<<<< HEAD
}
=======
}
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
