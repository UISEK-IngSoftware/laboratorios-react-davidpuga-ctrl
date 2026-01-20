import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// Limpia /api para OAuth
const getOAuthURL = (endpoint) => {
    return API_BASE_URL.replace('/api', '') + endpoint;
};

// =====================
// LOGIN
// =====================
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

        // 🔐 Guardamos tokens
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        return response.data;
    } catch (error) {
        console.error("Error en el login:", error.response?.data || error.message);
        throw error;
    }
}

// =====================
// LOGOUT
// =====================
export async function logout() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        await axios.post(getOAuthURL('/o/revoke-token/'), params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
    } catch (error) {
        console.error("Error al revocar token:", error);
    } finally {
        // 🔐 Limpiamos sesión local
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}

// =====================
// 🔐 SESIÓN ACTIVA (CLAVE)
// =====================
export function isAuthenticated() {
    return !!localStorage.getItem("access_token");
}

// =====================
// 🧾 HEADER AUTH PARA AXIOS
// =====================
export function getAuthHeader() {
    const token = localStorage.getItem("access_token");
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}
