import { Box, TextField, Typography, Button } from "@mui/material";

export default function Login() {       
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Inicio de Sesión
            </Typography>
            
            <Box 
                component="form" 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 2, 
                    maxWidth: 400 
                }}
            >
                <TextField 
                    label="Usuario" 
                    name="username" 
                    variant="outlined"
                    required 
                    fullWidth
                />

                <TextField 
                    label="Contraseña" 
                    name="password"
                    type="password" 
                    variant="outlined" 
                    required
                    fullWidth
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    fullWidth
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Box>
    );
}