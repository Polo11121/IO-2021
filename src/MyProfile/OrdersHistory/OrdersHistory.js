import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { OrderCard } from "../OrderCard/OrderCard.";
import { OrdersHistoryModal } from "./OrdersHistoryModal";
import { AuthContext } from "../../contexts/AuthProvider";
import "./OrdersHistory.scss";

export const OrdersHistory = ({ orders, setOrderInfo, courierType }) => {
  const [isActiveOrders, setIsActiveOrders] = useState(true);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    inputFilter: "",
    statusFilter: "",
    payFilter: "",
    createDateFilter: [null, null],
    modifyDateFilter: [null, null],
  });

  const user = useContext(AuthContext);

  const handleClick = () => {
    setIsActiveOrders(!isActiveOrders);
    setFilters({
      inputFilter: "",
      statusFilter: "",
      payFilter: "",
      createDateFilter: [null, null],
      modifyDateFilter: [null, null],
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isFiltered = Object.values(filters).some((tmp) =>
    Array.isArray(tmp) ? tmp.some((item) => item) : tmp
  );

  const filterByInputFilter = (orders) =>
    filters.inputFilter
      ? orders.id?.includes(filters.inputFilter) ||
        orders.data.reciver?.name.includes(filters.inputFilter) ||
        orders.data.sender?.name.includes(filters.inputFilter) ||
        orders.data.reciver?.street.includes(filters.inputFilter) ||
        orders.data.sender?.street.includes(filters.inputFilter) ||
        orders.data.reciver?.postCode.includes(filters.inputFilter) ||
        orders.data.sender?.postCode.includes(filters.inputFilter)
      : orders;

  const filterByStatusInput = (orders) =>
    filters.statusFilter ? orders.data.status === filters.statusFilter : orders;

  const filterByPayFilter = (orders) =>
    filters.payFilter
      ? (!orders.data.cashOnDelivery && filters.payFilter === "Opłacone") ||
        (orders.data.cashOnDelivery && filters.payFilter === "Przy odbiorze")
      : orders;

  const formatUpdateDate = (order) =>
    order.data.updateDate
      .split("")
      .filter((char) => char !== "-" && char !== ":" && char !== " ")
      .join("")
      .substring(0, 8);

  const formatCreateDate = (order) =>
    order.data.createDate
      .split("")
      .filter((char) => char !== "-" && char !== ":" && char !== " ")
      .join("")
      .substring(0, 8);

  const filterByCreateDateFilter = (orders) =>
    filters.createDateFilter.some((date) => date)
      ? (filters.createDateFilter[0] &&
          !filters.createDateFilter[1] &&
          `${filters?.createDateFilter?.[0]?.getUTCFullYear()}${
            filters?.createDateFilter?.[0]?.getUTCMonth() + 1 < 10
              ? `0${filters?.createDateFilter?.[0]?.getUTCMonth() + 1}`
              : filters?.createDateFilter?.[0]?.getUTCMonth() + 1
          }${
            filters?.createDateFilter?.[0]?.getUTCDate() + 1 < 10
              ? `0${filters?.createDateFilter?.[0]?.getUTCDate() + 1}`
              : filters?.createDateFilter?.[0]?.getUTCDate() + 1
          }` <= formatCreateDate(orders)) ||
        (filters.createDateFilter[1] &&
          !filters.createDateFilter[0] &&
          `${filters?.createDateFilter?.[1]?.getUTCFullYear()}${
            filters?.createDateFilter?.[1]?.getUTCMonth() + 1 < 10
              ? `0${filters?.createDateFilter?.[1]?.getUTCMonth() + 1}`
              : filters?.createDateFilter?.[1]?.getUTCMonth() + 1
          }${
            filters?.createDateFilter?.[1]?.getUTCDate() + 1 < 10
              ? `0${filters?.createDateFilter?.[1]?.getUTCDate() + 1}`
              : filters?.createDateFilter?.[1]?.getUTCDate() + 1
          }` >= formatCreateDate(orders)) ||
        (filters.createDateFilter[0] &&
          filters.createDateFilter[1] &&
          `${filters?.createDateFilter?.[0]?.getUTCFullYear()}${
            filters?.createDateFilter?.[0]?.getUTCMonth() + 1 < 10
              ? `0${filters?.createDateFilter?.[0]?.getUTCMonth() + 1}`
              : filters?.createDateFilter?.[0]?.getUTCMonth() + 1
          }${
            filters?.createDateFilter?.[0]?.getUTCDate() + 1 < 10
              ? `0${filters?.createDateFilter?.[0]?.getUTCDate() + 1}`
              : filters?.createDateFilter?.[0]?.getUTCDate() + 1
          }` <= formatCreateDate(orders) &&
          `${filters?.createDateFilter?.[1]?.getUTCFullYear()}${
            filters?.createDateFilter?.[1]?.getUTCMonth() + 1 < 10
              ? `0${filters?.createDateFilter?.[1]?.getUTCMonth() + 1}`
              : filters?.createDateFilter?.[1]?.getUTCMonth() + 1
          }${
            filters?.createDateFilter?.[1]?.getUTCDate() + 1 < 10
              ? `0${filters?.createDateFilter?.[1]?.getUTCDate() + 1}`
              : filters?.createDateFilter?.[1]?.getUTCDate() + 1
          }` >= formatCreateDate(orders))
      : orders;

  const filterByModifyDateFilter = (orders) =>
    filters.modifyDateFilter.some((date) => date)
      ? (filters.modifyDateFilter[0] &&
          !filters.modifyDateFilter[1] &&
          `${filters?.modifyDateFilter?.[0]?.getUTCFullYear()}${
            filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1}`
              : filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1
          }${
            filters?.modifyDateFilter?.[0]?.getUTCDate() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[0]?.getUTCDate() + 1}`
              : filters?.modifyDateFilter?.[0]?.getUTCDate() + 1
          }` <= formatUpdateDate(orders)) ||
        (filters.modifyDateFilter[1] &&
          !filters.modifyDateFilter[0] &&
          `${filters?.modifyDateFilter?.[1]?.getUTCFullYear()}${
            filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1}`
              : filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1
          }${
            filters?.modifyDateFilter?.[1]?.getUTCDate() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[1]?.getUTCDate() + 1}`
              : filters?.modifyDateFilter?.[1]?.getUTCDate() + 1
          }` >= formatUpdateDate(orders)) ||
        (filters.modifyDateFilter[0] &&
          filters.modifyDateFilter[1] &&
          `${filters?.modifyDateFilter?.[0]?.getUTCFullYear()}${
            filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1}`
              : filters?.modifyDateFilter?.[0]?.getUTCMonth() + 1
          }${
            filters?.modifyDateFilter?.[0]?.getUTCDate() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[0]?.getUTCDate() + 1}`
              : filters?.modifyDateFilter?.[0]?.getUTCDate() + 1
          }` <= formatUpdateDate(orders) &&
          `${filters?.modifyDateFilter?.[1]?.getUTCFullYear()}${
            filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1}`
              : filters?.modifyDateFilter?.[1]?.getUTCMonth() + 1
          }${
            filters?.modifyDateFilter?.[1]?.getUTCDate() + 1 < 10
              ? `0${filters?.modifyDateFilter?.[1]?.getUTCDate() + 1}`
              : filters?.modifyDateFilter?.[1]?.getUTCDate() + 1
          }` >= formatUpdateDate(orders))
      : orders;

  const filteredOrders = orders
    ?.filter(filterByInputFilter)
    .filter(filterByStatusInput)
    .filter(filterByPayFilter)
    .filter(filterByModifyDateFilter)
    .filter(filterByCreateDateFilter);

  const activeOrders = orders?.filter(
    ({ id, data }) =>
      (data?.status !== "Przekazane do sortowni" &&
        courierType === "collector") ||
      (data?.status !== "Dostarczone do odbiorcy" &&
        courierType === "delivery") ||
      (!user?.displayName && data?.status !== "Dostarczone do odbiorcy" && (
        <OrderCard
          orderNumber={id}
          createDate={data.createDate}
          updateDate={data.updateDate}
          cashOnDelivery={data.cashOnDelivery}
          status={data.status}
        />
      ))
  );

  return (
    <section className="orders-history">
      <OrdersHistoryModal
        courierType={courierType}
        open={open}
        handleClose={handleClose}
        filters={filters}
        setFilters={setFilters}
      />
      <h1 className="orders-history__title">Historia zamówień</h1>
      {orders?.length === 0 && orders !== null && (
        <h2 className="orders-history__title">Brak zamówień !</h2>
      )}
      {orders?.length !== 0 && orders !== null && (
        <>
          <Button onClick={handleClick} className="orders-history__button">
            {isActiveOrders ? "Wszystkie zamówienia" : "Aktywne zamówienia"}
          </Button>
          {user?.displayName && (
            <Button onClick={handleOpen} className="orders-history__button">
              Filtruj zamówienia
            </Button>
          )}
          <div className="orders-history__info">
            <span className="orders-history__info__row">Numer zamówienia</span>
            <span className="orders-history__info__row">Data utworzenia</span>
            <span className="orders-history__info__row">Data aktualizacji</span>
            <span className="orders-history__info__row">Status płatności</span>
            <span className="orders-history__info__row">Status zamówienia</span>
          </div>
          <div className="orders-history__orders">
            {isFiltered
              ? filteredOrders?.map((order) => (
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
              : isActiveOrders
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
        </>
      )}
    </section>
  );
};
