import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "@mui/material";
import "./OrderSummary.scss";

export const OrderSummary = ({
  formik,
  cashOnDelivery,
  cost,
  onSubmit,
  orderNumber,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onSubmit();
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="order-summary">
      <Modal open={open} onClose={handleClose}>
        <div className="order-summary__modal">
          <div className="order-summary__modal__content">
            <h1 className="order-summary__modal__title">
              Zamówienie przekazane do realizacji !
            </h1>
            <h2 className="order-summary__modal__title">
              Zamowienie nr. {orderNumber} zostało utworzone i przekazane do
              realizacji :). Nasz kurier odbiorze twoją paczkę już niedługo !
            </h2>
            <Link className="order-summary__modal__link" to="/myprofile">
              <Button
                className="order-summary__modal__button"
                variant="contained"
                type="submit"
              >
                Ok
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
      <h2>Podsumowanie</h2>
      <div className="order-summary__content">
        <div>
          <div className="order-summary__content--bold">Sczegóły zlecenia</div>
          <div>Zlecił: {formik.values.creator}</div>
          <div>Paczka {formik.values.size}</div>
          <div>Wartość: {formik.values.value} PLN</div>
          <div>
            Całkowity koszt:{" "}
            {cashOnDelivery
              ? `${cost + 6.5}`.length < 5
                ? `${cost + 6.5}0`
                : `${cost + 6.5}`
              : `${cost}`.length < 5
              ? `${cost}0`
              : `${cost}`}{" "}
            PLN
          </div>
          <div>
            Płatność: {cashOnDelivery ? "przy odbiorze" : "internetowa"}
          </div>
        </div>
        <div>
          <div className="order-summary__content--bold">
            Dane kontaktowe nadawcy
          </div>
          <div>
            {formik.values.senderName} {formik.values.senderSurname}
          </div>
          <div>
            {formik.values.senderTown}, {formik.values.senderPostCode}
          </div>
          <div>
            {formik.values.senderStreet} {formik.values.senderNumber}/
            {formik.values.senderLocal}
          </div>
          <div>{formik.values.senderEmail}</div>
          <div>{formik.values.senderPhone}</div>
        </div>
        <div>
          <div className="order-summary__content--bold">
            Dane kontaktowe odbiorcy
          </div>
          <div>
            {formik.values.reciverName} {formik.values.reciverSurname}
          </div>
          <div>
            {formik.values.reciverTown}, {formik.values.reciverPostCode}
          </div>
          <div>
            {formik.values.reciverStreet} {formik.values.reciverNumber}/
            {formik.values.reciverLocal}
          </div>
          <div>{formik.values.reciverEmail}</div>
          <div>{formik.values.reciverPhone}</div>
        </div>
      </div>
      {cashOnDelivery ? (
        <Button
          className="order-summary__button"
          variant="contained"
          type="submit"
          onClick={handleOpen}
        >
          Złóż zamówienie
        </Button>
      ) : (
        <div className="order-summary__to-pay">
          <span style={{ fontWeight: "bold", fontSize: "22px" }}>
            Do zapłaty: {cashOnDelivery ? cost + cashOnDelivery : cost} PLN
          </span>
          <Button
            className="order-summary__button"
            variant="contained"
            type="submit"
            onClick={handleOpen}
          >
            Opłać zamówienie
          </Button>
        </div>
      )}
    </div>
  );
};
