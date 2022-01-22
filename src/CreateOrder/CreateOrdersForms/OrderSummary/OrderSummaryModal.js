import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "@mui/material";

export const OrderSummaryModal = ({ open, handleClose, orderNumber }) => (
  <Modal open={open} onClose={handleClose}>
    <article className="order-summary__modal">
      <div className="order-summary__modal__content">
        <h1 className="order-summary__modal__title">
          Zamówienie przekazane do realizacji !
        </h1>
        <h2 className="order-summary__modal__title">
          Zamowienie nr. {orderNumber} zostało utworzone i przekazane do
          realizacji :). Nasz kurier odbiorze twoją paczkę już niedługo !
        </h2>
        <div className="order-summary__modal__link">
          <Button
            className="order-summary__modal__button"
            variant="contained"
            type="submit"
          >
            Ok
          </Button>
        </div>
      </div>
    </article>
  </Modal>
);

export default OrderSummaryModal;
