import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { db } from "../firebase";
import { CheckStatusModal } from "./CheckStatusModal";
import "./CheckStatus.scss";

export const CheckStatus = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      orderNumber: "",
    },
    onSubmit: async ({ orderNumber }) => {
      if (orderNumber) {
        const docRef = doc(db, "orders", orderNumber);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder(docSnap.data());
          setOpen(true);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    },
  });

  return (
    <div className="check-status">
      <CheckStatusModal
        open={open}
        handleClose={handleClose}
        formik={formik}
        order={order}
      />
      <main style={{ width: "100%" }}>
        <h1 className="check-status__text">Śledź przesyłkę</h1>
        <form className="check-status__form" onSubmit={formik.handleSubmit}>
          <div className="check-status__form-input">
            <TextField
              id="orderNumber"
              name="orderNumber"
              className="check-status__input"
              color="primary"
              label="Wpisz numer paczki"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.orderNumber}
              onBlur={formik.handleBlur}
            />
            {error && (
              <p className="check-status__error">Nie ma takiego zamówienia!</p>
            )}
          </div>
          <Button
            className="check-status__button"
            variant="contained"
            type="submit"
          >
            Śledź
          </Button>
        </form>
      </main>
    </div>
  );
};
