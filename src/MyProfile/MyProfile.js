import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Error } from "../Error/Error";
import { UserProfileInfo } from "./UserPorfileInfo/UserProfileInfo";
import { OrdersHistory } from "./OrdersHistory/OrdersHistory";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import MyProfileModal from "./MyProfileModal";
import "./MyProfile.scss";

export const MyProfile = () => {
  const [orders, setOrders] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderInfoStatus, setOrderInfoStatus] = useState(null);
  const user = useContext(AuthContext);

  const handleClose = async () => {
    if (user?.displayName && orderInfo?.data?.status !== orderInfoStatus) {
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
    <main className="my-profile">
      <MyProfileModal
        orderInfo={orderInfo}
        orderInfoStatus={orderInfoStatus}
        handleClose={handleClose}
        handleSelect={handleSelect}
        user={user}
      />
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
    </main>
  ) : (
    <Error />
  );
};
