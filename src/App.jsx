import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import PokemonList from "../pages/PokemonList";
import PokemonForm from "../pages/PokemonForm";
import PokemonDetail from "../pages/PokemonDetail";
import Login from "../pages/Login";
import TrainerList from "../pages/TrainerList";
import TrainerDetail from "../pages/TrainerDetail";
import TrainerForm from "../pages/TrainerForm"; 
import { isAuthenticated } from "./services/userService";
import "./App.css";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Login />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container sx={{ mt: 3 }}>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trainers" element={<TrainerList />} />
          <Route path="/trainer/:id" element={<TrainerDetail />} />

          {/* RUTAS PRIVADAS */}
          <Route path="/add-pokemon" element={<PrivateRoute><PokemonForm /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><PokemonForm /></PrivateRoute>} />
          <Route path="/add-trainer" element={<PrivateRoute><TrainerForm /></PrivateRoute>} />
          <Route path="/edit-trainer/:id" element={<PrivateRoute><TrainerForm /></PrivateRoute>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;