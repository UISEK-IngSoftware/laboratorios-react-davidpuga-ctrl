import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { login } from "../src/services/userService"; 

import Spinner from "../src/components/Spinner";

export default function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); 

        try {
            const response = await login(loginData.username, loginData.password);
            
            localStorage.setItem("access_token", response.access_token);
            navigate("/"); 
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error al iniciar sesión, por favor verifica tus credenciales.");
        }
        finally {
            setIsLoading(false); // Desactiva el Spinner cuando termina (éxito o error)
        }
    };

    // 2. LÓGICA DE VISUALIZACIÓN:
    // Si está cargando, retornamos EL SPINNER en lugar del formulario
    if (isLoading) {
        return <Spinner />;
    }

    // Si NO está cargando, mostramos el formulario normal
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
                        value={loginData.username} 
                        onChange={handleChange}    
                    />

                    <TextField 
                        label="Contraseña" 
                        name="password"
                        type="password" 
                        variant="outlined" 
                        required
                        fullWidth
                        value={loginData.password} 
                        onChange={handleChange}    
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