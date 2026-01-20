import React from "react";
import { AppBar, Container, Toolbar, Button } from "@mui/material"; 
import pokedexLogo from "../assets/pokedex_logo.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/userService";

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <Container>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">

                        {/* LOGO */}
                        <Toolbar sx={{ justifyContent: "center" }}>
                            <img
                                src={pokedexLogo}
                                alt="Pokedex Logo"
                                height={100}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/")}
                            />
                        </Toolbar>

                        {/* NAVEGACIÓN */}
                        <Toolbar>
                            <Container sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                
                                {/* BOTONES SIEMPRE VISIBLES (PÚBLICOS) */}
                                <Button color="inherit" onClick={() => navigate("/")}>
                                    Inicio
                                </Button>

                                <Button
                                    color="inherit"
                                    onClick={() => navigate("/trainers")}
                                >
                                    Entrenadores
                                </Button>


                                {/* BOTONES PRIVADOS (SOLO SI ESTÁ LOGUEADO) */}
                                {isLoggedIn && (
                                    <>
                                        <Button
                                            color="inherit"
                                            onClick={() => navigate("/add-pokemon")}
                                        >
                                            Agregar Pokémon
                                        </Button>

                                        <Button
                                            color="inherit"
                                            onClick={() => navigate("/add-trainer")}
                                        >
                                            Agregar Entrenador
                                        </Button>
                                    </>
                                )}

                                {/* BOTÓN DE SESIÓN */}
                                {isLoggedIn ? (
                                    <Button color="inherit" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </Button>
                                ) : (
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/login")}
                                    >
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