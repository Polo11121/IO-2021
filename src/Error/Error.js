import React from "react";
import { Link } from "react-router-dom";
import emoji from "./emoji.png";
import "./Error.scss";

export const Error = () => (
  <div className="error">
    <div className="error__content">
      <img className="error__photo" src={emoji} alt="" />
      <p>Dostępne tylko dla zalogowanych użytkowników!</p>
      <p className="error__text">
        Masz już konto ?{" "}
        <Link className="error__link" to="/signin">
          Zaloguj się
        </Link>
      </p>
      <p className="error__text">
        Nie masz konta ?{" "}
        <Link className="error__link" to="/signup">
          Zarejestruj się
        </Link>
      </p>
    </div>
  </div>
);
