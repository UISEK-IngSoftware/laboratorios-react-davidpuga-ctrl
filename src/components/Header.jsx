import { AppBar, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/Pokedex.svg";
import "./Header.css";

export default function Header() {
  return (
    <div className="pokedex-navbar">
      <AppBar position="static">
        <Toolbar>
          <div className="image-container">
            <img src={pokedexLogo} alt="Logo" height={200} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
