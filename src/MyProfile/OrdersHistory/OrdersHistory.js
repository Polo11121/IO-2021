import { Button } from "@mui/material";
import React, { useState } from "react";
import { OrderCard } from "../OrderCard/OrderCard.";
import "./OrdersHistory.scss";

export const OrdersHistory = ({ orders, setOrderInfo }) => {
  const [isActiveOrders, setIsActiveOrders] = useState(true);
  const handleClick = () => setIsActiveOrders(!isActiveOrders);

  const activeOrders = orders?.filter(
    ({ id, data }) =>
      data?.status !== "Dostarczona" && (
        <OrderCard
          orderNumber={id}
          createDate={data.createDate}
          updateDate={data.updateDate}
          cashOnDelivery={data.cashOnDelivery}
          status={data.status}
        />
      )
  );

  return (
    <div className="orders-history">
      <h1 className="orders-history__title">Historia zamówień</h1>
      <Button onClick={handleClick} className="orders-history__button">
        {isActiveOrders ? "Wszystkie zamówienia" : "Aktywne zamówienia"}
      </Button>
      <div className="orders-history__info">
        <span className="orders-history__info__row">Numer zamówienia</span>
        <span className="orders-history__info__row">Data utworzenia</span>
        <span className="orders-history__info__row">Data aktualizacji</span>
        <span className="orders-history__info__row">Status płatności</span>
        <span className="orders-history__info__row">Status zamówienia</span>
      </div>
      <div className="orders-history__orders">
        {isActiveOrders
          ? activeOrders?.map((order) => (
              <OrderCard
                onClick={() => setOrderInfo(order)}
                key={order.id}
                orderNumber={order.id}
                createDate={order.data.createDate}
                updateDate={order.data.updateDate}
                cashOnDelivery={order.data.cashOnDelivery}
                status={order.data.status}
              />
            ))
          : orders?.map((order) => (
              <OrderCard
                onClick={() => setOrderInfo(order)}
                key={order.id}
                orderNumber={order.id}
                createDate={order.data.createDate}
                updateDate={order.data.updateDate}
                cashOnDelivery={order.data.cashOnDelivery}
                status={order.data.status}
              />
            ))}
      </div>
    </div>
  );
};
