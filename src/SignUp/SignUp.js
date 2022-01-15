import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import * as Yup from "yup";
import "./SignUp.scss";

export const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/myprofile");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Zła forma adresu email !")
        .required("Prosze podać adres email !"),
      password: Yup.string()
        .min(6, "Hasło musi mieć min. 6 znaków !")
        .oneOf([Yup.ref("repeatPassword")], "Hasła muszą być takie same !")
        .max(15, "Hasło nie może mieć wiecej niż 15 znaków !")
        .required("Prosze podać Hasło !"),
      repeatPassword: Yup.string()
        .min(6, "Hasło musi mieć min. 6 znaków !")
        .oneOf([Yup.ref("password")], "Hasła muszą być takie same !"),
    }),
    onSubmit: ({ email, password }) =>
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
          await setDoc(doc(db, "users", email), {
            email,
            password,
          });
          if (auth) {
            navigate("/");
          }
        })
        .catch((error) => setError(true)),
  });

  return (
    <div className="sign-up" onSubmit={formik.handleSubmit}>
      <form className="sign-up__form">
        <div className="sign-up__form-inputs">
          <TextField
            error={formik.errors.email && formik.touched.email}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
            id="email"
            name="email"
            className="sign-up__form-input"
            color="primary"
            label="Email"
            variant="outlined"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <TextField
            error={formik.errors.password && formik.touched.password}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            id="password"
            name="password"
            className="sign-in__form-input"
            label="Hasło"
            type="password"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <TextField
            error={
              formik.errors.repeatPassword && formik.touched.repeatPassword
            }
            helperText={
              formik.errors.repeatPassword && formik.touched.repeatPassword
                ? formik.errors.repeatPassword
                : null
            }
            id="repeatPassword"
            name="repeatPassword"
            className="sign-in__form-input"
            label="Powtórz hasło"
            type="password"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
          />
        </div>
        <Button
          disabled={Boolean(
            formik.errors.password ||
              formik.errors.repeatPassword ||
              formik.errors.email ||
              !formik.values.password ||
              !formik.values.repeatPassword ||
              !formik.values.email
          )}
          type="submit"
          className={
            formik.errors.password ||
            formik.errors.repeatPassword ||
            formik.errors.email ||
            !formik.values.password ||
            !formik.values.repeatPassword ||
            !formik.values.email
              ? null
              : "sign-in__button"
          }
          variant="contained"
        >
          Zarejestruj się
        </Button>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            Podany adres e-mail jest już zajęty
          </p>
        )}
        <p className="sign-up__text">
          Masz już konto?
          <Link className="sign-up__link" to="/signin">
            Zaloguj się!
          </Link>
        </p>
      </form>
    </div>
  );
};
