import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import "./SignIn.scss";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Zła forma adresu email !")
        .required("Prosze podać login !"),
      password: Yup.string().required("Prosze podać hasło !"),
    }),
    onSubmit: ({ email, password }) =>
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => navigate("/"))
        .catch(() => setError(true)),
  });

  return (
    <div className="sign-in">
      <form className="sign-in__form" onSubmit={formik.handleSubmit}>
        <div className="sign-in__form-inputs">
          <TextField
            error={formik.errors.email && formik.touched.email}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
            id="email"
            name="email"
            className="sign-in__form-input"
            color="primary"
            label="Email"
            variant="outlined"
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
        </div>
        <Button
          disabled={
            formik.errors.email ||
            formik.errors.password ||
            !formik.values.email ||
            !formik.values.password
          }
          type="submit"
          className={
            formik.errors.email ||
            formik.errors.password ||
            !formik.values.email ||
            !formik.values.password
              ? null
              : "sign-in__button"
          }
          variant="contained"
        >
          Zaloguj się
        </Button>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            Błędny Email lub hasło !
          </p>
        )}
        <p className="sign-in__text">
          Nie masz konta?
          <Link className="sign-in__link" to="/signup">
            Zarejestruj się!
          </Link>
        </p>
      </form>
    </div>
  );
};
