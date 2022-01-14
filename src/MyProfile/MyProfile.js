import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Error } from "../Error/Error";
import { UserProfileInfo } from "./UserPorfileInfo/UserProfileInfo";
import { OrdersHistory } from "./OrdersHistory/OrdersHistory";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { MenuItem, Modal, Select } from "@mui/material";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import box from "./box.svg";
import "./MyProfile.scss";

export const MyProfile = () => {
  const [orders, setOrders] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderInfoStatus, setOrderInfoStatus] = useState(null);
  const user = useContext(AuthContext);

  const handleClose = async () => {
    if (user?.displayName) {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours =
        date_ob.getHours() < 10 ? "0" + date_ob.getHours() : date_ob.getHours();
      let minutes =
        date_ob.getMinutes() < 10
          ? "0" + date_ob.getMinutes()
          : date_ob.getMinutes();
      let seconds =
        date_ob.getSeconds() < 10
          ? "0" + date_ob.getSeconds()
          : date_ob.getSeconds();
      const actualDate =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      await updateDoc(doc(db, "orders", `${orderInfo?.id}`), {
        status: orderInfoStatus,
        updateDate: actualDate,
      });
      await updateDoc(
        doc(
          db,
          "users",
          `${orderInfo?.data?.user}`,
          "orders",
          `${orderInfo?.id}`
        ),
        { status: orderInfoStatus, updateDate: actualDate }
      );
      await updateDoc(
        doc(
          db,
          "couriers",
          `${orderInfo?.data?.courier}`,
          "orders",
          `${orderInfo?.id}`
        ),
        { status: orderInfoStatus, updateDate: actualDate }
      );
    }
    setOrderInfo(null);
  };

  const handleSelect = (event) => {
    setOrderInfoStatus(event.target.value);
  };

  useEffect(() => {
    orderInfo
      ? setOrderInfoStatus(orderInfo.data.status)
      : setOrderInfoStatus(null);
  }, [orderInfo]);

  useEffect(async () => {
    if (user) {
      const collectionRef = user?.displayName
        ? collection(db, "couriers", user?.displayName, "orders")
        : collection(db, "users", user?.email, "orders");
      const querySnapshot = await getDocs(collectionRef);
      const querySnapshotTable = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          querySnapshotTable.push({ id: doc?.id, data: doc?.data() });
        });
      }
      setOrders(
        querySnapshotTable.sort(
          (a, b) =>
            b.data.updateDate
              .split("")
              .filter((char) => char !== "-" && char !== ":" && char !== " ")
              .join("") -
            a.data.updateDate
              .split("")
              .filter((char) => char !== "-" && char !== ":" && char !== " ")
              .join("")
        )
      );
    }
  }, [user, orderInfo]);

  return user ? (
    <div className="my-profile">
      <Modal open={Boolean(orderInfo)} onClose={handleClose}>
        <div className="my-profile__modal">
          <div className="my-profile__modal__content">
            <IconButton
              className="my-profile__modal__exit-button"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <div className="my-profile__modal__first-row">
              <div>
                <img src={box} height="250px" />
              </div>
              <div style={{ paddingLeft: "20px" }}>
                <div>
                  <h2>Zamówienie nr. {orderInfo?.id}</h2>
                  <div>Data utworzenia: {orderInfo?.data.createDate}</div>
                  <div>
                    Data aktualizacji statusu: {orderInfo?.data.updateDate}
                  </div>
                  <div>
                    Status płatności:{" "}
                    {orderInfo?.data.cashOnDelivery
                      ? "Przy odbiorze"
                      : "Opłacona"}
                  </div>
                  {user?.displayName ? (
                    <div>
                      <span>Status przesyłki:</span>
                      <Select
                        className="my-profile__modal__select"
                        fullWidth
                        onChange={handleSelect}
                        value={orderInfoStatus}
                      >
                        <MenuItem value="Przyjęta do realizacji">
                          Przyjęta do realizacji
                        </MenuItem>
                        <MenuItem value="Odebrana od nadawcy">
                          Odebrana od nadawcy
                        </MenuItem>
                        <MenuItem value="W drodze do sortowni">
                          W drodze do sortowni
                        </MenuItem>
                        <MenuItem value="W sortowni">W sortowni</MenuItem>
                        <MenuItem value="W drodze do odbiorcy">
                          W drodze do odbiorcy
                        </MenuItem>
                        <MenuItem value="Dostarczona">Dostarczona</MenuItem>
                      </Select>
                    </div>
                  ) : (
                    <div>Status przesyłki: {orderInfo?.data.status}</div>
                  )}
                </div>
                <div className="my-profile__modal__second-row">
                  <div>
                    <div>Dane nadawcy:</div>
                    <div>{orderInfo?.data.sender.street}</div>{" "}
                    <div>{orderInfo?.data.sender.postCode}</div>
                    <div>{orderInfo?.data.sender.name}</div>
                  </div>
                  <div>
                    <div>Dane dostawcy:</div>
                    <div>{orderInfo?.data.reciver.street}</div>
                    <div>{orderInfo?.data.reciver.postCode}</div>
                    <div>{orderInfo?.data.reciver.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="my-profile__info">
        <UserProfileInfo
          orders={orders}
          isCourier={!!user?.displayName}
          user={user}
        />
      </div>
      <div className="my-profile__orders">
        <OrdersHistory setOrderInfo={setOrderInfo} orders={orders} />
      </div>
    </div>
  ) : (
    <Error />
  );
};
