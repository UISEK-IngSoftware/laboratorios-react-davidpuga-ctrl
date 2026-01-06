import { AppBar, Container, Toolbar, Button } from "@mui/material"; 
import pokedexLogo from "../assets/pokedex_logo.svg"; // Asegúrate de que la extensión sea correcta (.png o .svg)
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";

export default function Header() {
    const navigate = useNavigate();

    // 1. Verificamos si hay un token para saber si el usuario está logueado
    const isLoggedIn = localStorage.getItem('access_token') !== null;

    // 2. Función para cerrar sesión
    const handleLogout = async () => {
        await logout(); // Llama a la función de revocación en userService.js
        navigate('/login'); // Te redirige al login después de borrar el token
    };

    return (
        <Container>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={pokedexLogo} alt="Pokedex Logo" height={100} />
                            </div>
                        </Toolbar>
                        
                        <Toolbar>
                            <Container>
                                <Button color="inherit" href="/">
                                    Inicio
                                </Button>

                                {isLoggedIn ? (
                                    // SI ESTÁ LOGUEADO: Muestra Agregar y Cerrar Sesión
                                    <>
                                        <Button color="inherit" href="/add-pokemon">
                                            Agregar Pokemon
                                        </Button>
                                        <Button color="inherit" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </Button>
                                    </>
                                ) : (
                                    // SI NO ESTÁ LOGUEADO: Muestra solo Iniciar Sesión
                                    <Button color="inherit" href="/login">
                                        Iniciar Sesión
                                    </Button>
                                )}
                            </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </Container>
    );
}