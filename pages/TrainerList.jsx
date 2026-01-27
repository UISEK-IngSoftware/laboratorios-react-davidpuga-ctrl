import React, { useEffect, useState } from "react";
import {
    Typography,
    Grid,
    Box,
    Alert,
    Button,
    Card,
    CardContent,
    CardActions,
    Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchTrainers, deleteTrainer } from "../src/services/TrainerService";
import { isAuthenticated } from "../src/services/userService";

// Importamos tu componente personalizado en lugar del CircularProgress de MUI
import Spinner from "../src/components/Spinner";

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verificamos si hay sesión activa para mostrar botones de acción
    const isAuth = isAuthenticated();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            // Aplicamos el setTimeout para que la microinteracción sea visible (1.2 segundos)
            setTimeout(async () => {
                try {
                    const data = await fetchTrainers();
                    setTrainers(data);
                    setError(null);
                } catch (err) {
                    setError("Error al conectar con la API de Entrenadores.");
                } finally {
                    setLoading(false);
                }
            }, 1200);
        } catch (err) {
            setError("Error crítico en la carga.");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!isAuth) return; // Protección extra

        if (window.confirm("¿Estás seguro de eliminar este entrenador permanentemente?")) {
            try {
                await deleteTrainer(id);
                // Actualización inmediata del estado para mejorar la experiencia
                setTrainers(prev => prev.filter(t => t.id !== id));
                alert("Entrenador eliminado con éxito.");
            } catch (err) {
                console.error(err);
                alert("Error al eliminar el entrenador.");
            }
        }
    };

    // 1. Lógica de visualización: Mientras carga, mostramos TU Spinner
    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '60vh',
                gap: 2 
            }}>
                <Spinner />
                <Typography variant="body2" color="text.secondary">
                    Cargando equipo de entrenadores...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={3}>
                {trainers.map((trainer) => (
                    <Grid item xs={12} sm={6} md={3} key={trainer.id}>
                        <Card 
                            elevation={0} 
                            sx={{ 
                                borderRadius: 2, 
                                border: '1px solid #e0e0e0',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                '&:hover': { 
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    transform: 'translateY(-4px)' 
                                }
                            }}
                        >
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
                                <img 
                                    src={trainer.picture ? trainer.picture : "https://via.placeholder.com/200?text=No+Image"} 
                                    alt={trainer.first_name}
                                    style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
                                />
                            </Box>

                            <Divider />

                            <CardContent sx={{ textAlign: 'left', flexGrow: 1, pt: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}>
                                    {trainer.first_name} {trainer.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nivel de Entrenador: <strong>{trainer.level}</strong>
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                <Button 
                                    size="small" 
                                    variant="outlined" 
                                    component={Link} 
                                    to={`/trainer/${trainer.id}`}
                                    sx={{ borderRadius: 20 }}
                                >
                                    Detalles
                                </Button>
                                
                                {isAuth && (
                                    <Box>
                                        <Button 
                                            size="small" 
                                            color="warning" 
                                            component={Link} 
                                            to={`/edit-trainer/${trainer.id}`}
                                            sx={{ minWidth: 'auto', mr: 1 }}
                                        >
                                            Editar
                                        </Button>

                                        <Button 
                                            size="small" 
                                            color="error" 
                                            onClick={() => handleDelete(trainer.id)}
                                            sx={{ minWidth: 'auto' }}
                                        >
                                            Borrar
                                        </Button>
                                    </Box>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {trainers.length === 0 && !loading && (
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron entrenadores.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}