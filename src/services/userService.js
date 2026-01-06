import axios from "axios";

// Si VITE_API_BASE_URL es "http://localhost:8000/api"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET); 

    // CALCULAMOS LA URL CORRECTA:
    // Quitamos el "/api" del final para que apunte a "http://localhost:8000/o/token/"
    const LOGIN_URL = API_BASE_URL.replace('/api', '') + '/o/token/';

    try {
        const response = await axios.post(
            LOGIN_URL, 
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return response.data;
    } catch (error) {
        // Esto es lo que imprime el error que me pasaste en la consola
        console.error("Error en el login:", error.response?.data || error.message);
        throw error;
    }
}