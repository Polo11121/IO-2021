import React from "react";
import ReactTooltip from "react-tooltip";
import "./OrderCard.scss";

export const OrderCard = ({
  orderNumber,
  cashOnDelivery,
  createDate,
  updateDate,
  status,
  onClick,
}) => (
  <article
    role="button"
    tabIndex={1}
    onClick={onClick}
    data-for={orderNumber}
    data-tip={`Pokaż szczegóły zamówienia nr. ${orderNumber}`}
    className="order-card"
  >
    <span className="order-card__row">{orderNumber}</span>
    <span className="order-card__row">{createDate}</span>
    <span className="order-card__row">{updateDate}</span>
    <span className="order-card__row">
      {cashOnDelivery ? "Przy odbiorze" : "Opłacona"}
    </span>
    <span className="order-card__row">{status}</span>
    <ReactTooltip
      offset={{ bottom: 10 }}
      className="order-card__tooltip"
      arrowColor="#f1c40f"
      id={orderNumber}
      place="bottom"
    />
  </article>
);
