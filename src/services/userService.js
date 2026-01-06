import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// Función para limpiar la URL (quitar el /api para los endpoints de OAuth)
const getOAuthURL = (endpoint) => {
    return API_BASE_URL.replace('/api', '') + endpoint;
};

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET); 

    try {
        const response = await axios.post(
            getOAuthURL('/o/token/'), 
            params,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error en el login:", error.response?.data || error.message);
        throw error;
    }
}

export async function logout() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        // CORRECCIÓN: Usar backticks `` para el template literal y la URL correcta de OAuth
        await axios.post(getOAuthURL('/o/revoke-token/'), params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
    } catch (error) {
        console.error("Error al revocar token en el servidor:", error);
        // Aunque falle el servidor, seguimos para borrar el token localmente
    } finally {
        // Siempre borramos el token del navegador para que la UI se actualice
        localStorage.removeItem('access_token');
    }
}