import React from "react";
import { Avatar } from "@mui/material";
import "./UserProfileInfo.scss";

export const UserProfileInfo = ({ user, isCourier, orders, courierType }) =>
  isCourier ? (
    <section className="user-profile-info">
      <Avatar
        alt="avatar"
        role="img"
        src={user?.photoURL}
        className="user-profile-info__avatar"
      ></Avatar>
      <h1 style={{ paddingBottom: "0", marginBottom: 0 }}>
        Kurier {courierType === "collector" ? "Odbierający" : "Rozwożący"}
      </h1>
      <h2 style={{ paddingTop: "0", marginTop: 0 }}>{user?.displayName}</h2>
      <h3>
        Aktywne zamówienia:{" "}
        {
          orders?.filter(
            ({ id, data }) =>
              (courierType === "collector" &&
                data.status !== "Przekazane do sortowni") ||
              (courierType === "delivery" &&
                data.status !== "Dostarczone do odbiorcy")
          ).length
        }
      </h3>
      <h3 style={{ paddingTop: "0", marginTop: 0 }}>
        Wszystkie zamówienia: {orders?.length}
      </h3>
    </section>
  ) : (
    <section className="user-profile-info">
      <Avatar className="user-profile-info__avatar"></Avatar>
      <h2>{user.email}</h2>
    </section>
  );
