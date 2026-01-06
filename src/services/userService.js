import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function login(username, password) {
    // Definimos los parámetros para el flujo OAuth2 password grant
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET); 

    try {
        const response = await axios.post(
            `${API_BASE_URL}/o/token/`, // Asegúrate de que el endpoint sea correcto (/o/token/ o /oauth/token)
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Retornamos los datos (access_token, refresh_token, etc.)
        return response.data;
    } catch (error) {
        console.error("Error en el login:", error.response?.data || error.message);
        throw error; // Re-lanzamos el error para manejarlo en el componente UI
    }
}