import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Box,
    Alert,
    Button,
    CardActions,
    Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchTrainers, deleteTrainer } from "../src/services/TrainerService";
import { isAuthenticated } from "../src/services/userService";

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchTrainers();
            setTrainers(data);
            setError(null);
        } catch (err) {
            setError("Error al conectar con la API de Entrenadores.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este entrenador?")) {
            try {
                await deleteTrainer(id);
                loadData();
            } catch (err) {
                alert("Error al eliminar el entrenador");
            }
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
        </Box>
    );

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
                                transition: '0.2s',
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
                            }}
                        >
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                                <img 
                                    src={trainer.picture ? trainer.picture : "https://via.placeholder.com/200?text=No+Image"} 
                                    alt={trainer.first_name}
                                    style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
                                />
                            </Box>

                            <Divider sx={{ mx: 2 }} />

                            <CardContent sx={{ textAlign: 'left', flexGrow: 1, pt: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize', lineHeight: 1.2, mb: 1 }}>
                                    {trainer.first_name} {trainer.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nivel: <strong>{trainer.level}</strong>
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', px: 1, pb: 1 }}>
                                <Button 
                                    size="small" 
                                    variant="text" 
                                    component={Link} 
                                    to={`/trainer/${trainer.id}`}
                                    sx={{ fontWeight: 'bold', color: '#1976d2' }}
                                >
                                    DETALLES
                                </Button>
                                
                                {isAuthenticated() && (
                                    <Box>
                                        <Button 
                                            size="small" 
                                            variant="text" 
                                            color="warning" 
                                            component={Link} 
                                            to={`/edit-trainer/${trainer.id}`}
                                            sx={{ fontWeight: 'normal', minWidth: 'auto', mr: 0.5 }}
                                        >
                                            EDITAR
                                        </Button>

                                        <Button 
                                            size="small" 
                                            variant="text" 
                                            color="error" 
                                            onClick={() => handleDelete(trainer.id)}
                                            sx={{ fontWeight: 'normal', minWidth: 'auto' }}
                                        >
                                            ELIMINAR
                                        </Button>
                                    </Box>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {trainers.length === 0 && !loading && (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    No hay entrenadores registrados.
                </Typography>
            )}
        </Box>
    );
}