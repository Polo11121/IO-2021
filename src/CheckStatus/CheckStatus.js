import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { db } from "../firebase";
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
      <Modal open={open} onClose={handleClose}>
        <div className="check-status__modal">
          <div className="check-status__modal__content">
            <h1 className="check-status__modal__title">
              Zamowienie nr. {formik.values.orderNumber}
            </h1>
            <div className="check-status__modal__info">
              <div>
                <div>Data utworzenia: {order?.createDate}</div>
                <div>Data aktualizacji statusu: {order?.updateDate}</div>
                <div>Status przesyłki: {order?.status}</div>
                <div>
                  Status płatności:{" "}
                  {order?.cashOnDelivery ? "Przy odbiorze" : "Opłacona"}
                </div>
              </div>
              <div>
                <div>Dane nadawcy:</div>
                <div>{order?.sender?.street}</div>{" "}
                <div>{order?.sender?.postCode}</div>
                <div>{order?.sender?.name}</div>
              </div>
              <div>
                <div>Dane dostawcy:</div>
                <div>{order?.reciver?.street}</div>
                <div>{order?.reciver?.postCode}</div>
                <div>{order?.reciver?.name}</div>
              </div>
            </div>
            <Button
              className="check-status__modal__button"
              variant="contained"
              type="submit"
              onClick={handleClose}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      <div style={{ width: "100%" }}>
        <p className="check-status__text">Śledź przesyłkę</p>
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
      </div>
    </div>
  );
};
