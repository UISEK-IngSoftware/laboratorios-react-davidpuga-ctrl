import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Container, Typography, Card, CardContent, 
    Button, CircularProgress, Box, Divider, Paper, Grid 
} from "@mui/material";
import { fetchTrainerById } from "../src/services/TrainerService";
import { isAuthenticated } from "../src/services/userService";

export default function TrainerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrainerById(id)
            .then(data => {
                setTrainer(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (!trainer) return <Typography sx={{ mt: 10, textAlign: 'center' }}>Entrenador no encontrado.</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
            {/* Botón Volver Minimalista */}
            <Button 
                onClick={() => navigate("/trainers")} 
                sx={{ mb: 3, color: '#666', textTransform: 'none' }}
            >
                ← Volver a Entrenadores
            </Button>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Lado Izquierdo: Imagen limpia sin fondo gris */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            p: 1,
                            border: '1px solid #eee',
                            borderRadius: 4,
                            bgcolor: '#fff'
                        }}>
                            <img 
                                src={trainer.picture || "https://via.placeholder.com/300?text=Sin+Foto"} 
                                alt={trainer.first_name}
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '12px', 
                                    objectFit: 'contain' 
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Lado Derecho: Información */}
                    <Grid item xs={12} md={7}>
                        <Typography variant="overline" sx={{ color: '#4479cc', fontWeight: 'bold', fontSize: '1rem' }}>
                            Perfil del Entrenador
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: '800', mb: 1, color: '#333' }}>
                            {trainer.first_name} {trainer.last_name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#666', mb: 3 }}>
                            Nivel de Experiencia: <strong>{trainer.level}</strong>
                        </Typography>
                        
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">EDAD</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{trainer.age} Años</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">FECHA DE NACIMIENTO</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{trainer.date_of_birth}</Typography>
                            </Grid>
                        </Grid>

                        {/* Botón de acción solo si está logueado */}
                        {isAuthenticated() && (
                            <Box sx={{ mt: 5 }}>
                                <Button 
                                    variant="contained" 
                                    sx={{ 
                                        backgroundColor: '#4479cc', 
                                        px: 4, 
                                        py: 1.5, 
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem'
                                    }}
                                    onClick={() => navigate(`/edit-trainer/${id}`)}
                                >
                                    Editar Información
                                </Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}