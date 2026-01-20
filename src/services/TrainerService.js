import axios from "axios";

// Asegúrate de que esta URL termina en /api/entrenadores/
const API_URL = "http://127.0.0.1:8000/api/entrenadores/";

export async function fetchTrainers() {
  try {
    const response = await axios.get(API_URL);
    // Verificamos si la respuesta tiene datos
    if (response.data) {
      return Array.isArray(response.data) ? response.data : (response.data.results || []);
    }
    return [];
  } catch (error) {
    console.error("Error conectando a la API:", error);
    throw error; // Esto permite que TrainerList muestre el mensaje de error
  }
}

export async function fetchTrainerById(id) {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalle:", error);
    return null;
  }
}

export async function deleteTrainer(id) {
  // Nota: Para borrar, Django pedirá el Token que guardaste en el login
  return await axios.delete(`${API_URL}${id}/`);
}