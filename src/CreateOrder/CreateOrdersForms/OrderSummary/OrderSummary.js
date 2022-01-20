import React, { useState } from "react";
import { Button } from "@mui/material";
import OrderSummaryModal from "./OrderSummaryModal";
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
    <main className="order-summary">
      <OrderSummaryModal
        handleClose={handleClose}
        open={open}
        orderNumber={orderNumber}
      />
      <h2>Podsumowanie</h2>
      <article className="order-summary__content">
        <section>
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
        </section>
        <section>
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
        </section>
        <section>
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
        </section>
      </article>
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
    </main>
  );
};
