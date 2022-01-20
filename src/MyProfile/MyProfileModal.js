import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { MenuItem, Modal, Select } from "@mui/material";
import box from "./box.svg";

const MyProfileModal = ({
  orderInfo,
  handleClose,
  handleSelect,
  orderInfoStatus,
  user,
}) => (
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
          <div className="my-profile__modal__box">
            <img alt="przesyłka" role="img" src={box} height="250px" />
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <div>
              <h2>Zamówienie nr. {orderInfo?.id}</h2>
              <div>Data utworzenia: {orderInfo?.data.createDate}</div>
              <div>Data aktualizacji statusu: {orderInfo?.data.updateDate}</div>
              <div>
                Status płatności:{" "}
                {orderInfo?.data.cashOnDelivery ? "Przy odbiorze" : "Opłacona"}
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
);

export default MyProfileModal;
