import React, { useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { login } from "../src/services/userService"; // Asegúrate de tener esta función en userService.js
export default function Login() {
    // 1. Estado para los datos del formulario
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    // 2. Función para manejar los cambios en los inputs
     const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await login(loginData.username, loginData.password);
        
        // Lo que el profe añadió para guardar la sesión
        localStorage.setItem("access_token", response.access_token);
        alert("Inicio de sesión exitoso");
        
        // Redirigir a la página principal
        navigate("/"); 
    } catch (error) {
        // Lo que el profe añadió para el error
        console.error("Error en login:", error);
        alert("Error al iniciar sesión, por favor verifica tus credenciales.");
        return;
    }
};

    return (
        <Container maxWidth="xs"> 
            <Box 
                sx={{ 
                    marginTop: 8, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Inicio de Sesión
                </Typography>
                
                <Box 
                    component="form" 
                    onSubmit={handleSubmit}
                 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: 2, 
                        width: "100%", 
                        mt: 1 
                    }}
                >
                    <TextField 
                        label="Usuario" 
                        name="username" 
                        variant="outlined"
                        required 
                        fullWidth
                        value={loginData.username} // Conectado al estado
                        onChange={handleChange}    // Conectado al handler
                    />

                    <TextField 
                        label="Contraseña" 
                        name="password"
                        type="password" 
                        variant="outlined" 
                        required
                        fullWidth
                        value={loginData.password} // Conectado al estado
                        onChange={handleChange}    // Conectado al handler
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}