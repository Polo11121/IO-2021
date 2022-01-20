import React from "react";
import { Button, Modal } from "@mui/material";

export const CheckStatusModal = ({ open, handleClose, formik, order }) => (
  <Modal open={open} onClose={handleClose}>
    <article className="check-status__modal">
      <div className="check-status__modal__content">
        <h1 className="check-status__modal__title">
          Zamowienie nr. {formik.values.orderNumber}
        </h1>
        <div className="check-status__modal__info">
          <section>
            <div>Data utworzenia: {order?.createDate}</div>
            <div>Data aktualizacji statusu: {order?.updateDate}</div>
            <div>Status przesyłki: {order?.status}</div>
            <div>
              Status płatności:{" "}
              {order?.cashOnDelivery ? "Przy odbiorze" : "Opłacona"}
            </div>
          </section>
          <section>
            <div>Dane nadawcy:</div>
            <div>{order?.sender?.street}</div>{" "}
            <div>{order?.sender?.postCode}</div>
            <div>{order?.sender?.name}</div>
          </section>
          <section>
            <div>Dane dostawcy:</div>
            <div>{order?.reciver?.street}</div>
            <div>{order?.reciver?.postCode}</div>
            <div>{order?.reciver?.name}</div>
          </section>
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
    </article>
  </Modal>
);
