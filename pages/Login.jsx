<<<<<<< HEAD
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { login } from "../src/services/userService"; 

import Spinner from "../src/components/Spinner";

export default function Login() {
=======
import React, { useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { login } from "../src/services/userService"; // Asegúrate de tener esta función en userService.js
export default function Login() {
    // 1. Estado para los datos del formulario
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

<<<<<<< HEAD
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
=======
    const navigate = useNavigate();

    // 2. Función para manejar los cambios en los inputs
     const handleChange = (e) => {
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
<<<<<<< HEAD
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
=======
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

>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
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
<<<<<<< HEAD
=======
                 
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
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
<<<<<<< HEAD
                        value={loginData.username} 
                        onChange={handleChange}    
=======
                        value={loginData.username} // Conectado al estado
                        onChange={handleChange}    // Conectado al handler
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
                    />

                    <TextField 
                        label="Contraseña" 
                        name="password"
                        type="password" 
                        variant="outlined" 
                        required
                        fullWidth
<<<<<<< HEAD
                        value={loginData.password} 
                        onChange={handleChange}    
=======
                        value={loginData.password} // Conectado al estado
                        onChange={handleChange}    // Conectado al handler
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
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