import React, { useEffect, useState } from "react";
import {
<<<<<<< HEAD
    Typography,
    Grid,
    Box,
    Alert,
    Button,
    Card,
    CardContent,
=======
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Box,
    Alert,
    Button,
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
    CardActions,
    Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchTrainers, deleteTrainer } from "../src/services/TrainerService";
import { isAuthenticated } from "../src/services/userService";

<<<<<<< HEAD
// Importamos tu componente personalizado en lugar del CircularProgress de MUI
import Spinner from "../src/components/Spinner";

=======
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

<<<<<<< HEAD
    // Verificamos si hay sesión activa para mostrar botones de acción
    const isAuth = isAuthenticated();

=======
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
<<<<<<< HEAD
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
=======
            const data = await fetchTrainers();
            setTrainers(data);
            setError(null);
        } catch (err) {
            setError("Error al conectar con la API de Entrenadores.");
        } finally {
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
<<<<<<< HEAD
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
=======
        if (window.confirm("¿Estás seguro de eliminar este entrenador?")) {
            try {
                await deleteTrainer(id);
                loadData();
            } catch (err) {
                alert("Error al eliminar el entrenador");
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
            }
        }
    };

<<<<<<< HEAD
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
=======
    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{ p: 3 }}>

>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
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
<<<<<<< HEAD
                                transition: '0.3s',
                                '&:hover': { 
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    transform: 'translateY(-4px)' 
                                }
                            }}
                        >
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
=======
                                transition: '0.2s',
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
                            }}
                        >
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
                                <img 
                                    src={trainer.picture ? trainer.picture : "https://via.placeholder.com/200?text=No+Image"} 
                                    alt={trainer.first_name}
                                    style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
                                />
                            </Box>

<<<<<<< HEAD
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
=======
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
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
                                        </Button>

                                        <Button 
                                            size="small" 
<<<<<<< HEAD
                                            color="error" 
                                            onClick={() => handleDelete(trainer.id)}
                                            sx={{ minWidth: 'auto' }}
                                        >
                                            Borrar
=======
                                            variant="text" 
                                            color="error" 
                                            onClick={() => handleDelete(trainer.id)}
                                            sx={{ fontWeight: 'normal', minWidth: 'auto' }}
                                        >
                                            ELIMINAR
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
                                        </Button>
                                    </Box>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {trainers.length === 0 && !loading && (
<<<<<<< HEAD
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron entrenadores.
                    </Typography>
                </Box>
=======
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    No hay entrenadores registrados.
                </Typography>
>>>>>>> f2fa6f3543a4b05dd167f640ecdb5ce47c5ae06c
            )}
        </Box>
    );
}