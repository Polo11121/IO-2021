import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import photo from "./kurier.png";
import box from "./box.svg";
import "./Home.scss";

export const Home = () => {
  const user = useContext(AuthContext);

  return (
    <main className="home">
      {user?.displayName ? (
        <h1 style={{ textAlign: "center" }} className="home__title">
          Miłej pracy {user?.displayName} !
        </h1>
      ) : (
        <nav role="menu" className="home__buttons">
          <Link role="button" className="home__link" to="/createorder">
            <Button tabIndex={-1} className="home__button" variant="contained">
              Utwórz nowe zamówienie
            </Button>
          </Link>
          <Link role="button" className="home__link" to="/checkstatus">
            <Button tabIndex={-1} className="home__button" variant="contained">
              Sprawdź status zamówienia
            </Button>
          </Link>
        </nav>
      )}
      <section className="home__info">
        <img role="img" className="home__photo" src={photo} alt="kurier" />
        <p className="home__text">
          Firm kurierska KKJS zajmuje się zatrudnianiem kurierów oraz
          transportem przesyłek na terenie kraju. Firma świadczy usługi dla
          klientów prywatnych oraz instytucjonalnych. Firma współpracuje z
          sortowniami obsługiwanymi przez firmę zewnętrzną, zajmującymi się
          obsługa paczek w obrębie danego regionu. Setki zadowolonych klientów,
          świadczą o naszym profesjonalym podejściu do klienta. Bez względu na
          to, czy jesteś klientem indywidualnym czy biznesowym - KKJS ma dla
          ciebie odpowiednie rozwiązanie.
        </p>
        <img
          role="img"
          className="home__box"
          height="250px"
          src={box}
          alt="przesyłka"
        />
      </section>
    </main>
  );
};
