import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Button, MenuItem, Modal, Select } from "@mui/material";
import box from "./box.svg";

const MyProfileModal = ({
  orderInfo,
  handleClose,
  handleSelect,
  orderInfoStatus,
  user,
  courierType,
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
                {orderInfo?.data.cashOnDelivery ? "Przy odbiorze" : "Opłacone"}
              </div>
              {user?.displayName &&
              !(
                orderInfo?.data.status === "Przekazane do sortowni" ||
                orderInfo?.data.status === "Dostarczone do odbiorcy"
              ) ? (
                <div>
                  <span>Status zamówienia:</span>
                  {courierType === "collector" &&
                    orderInfo?.data.status !== "Przekazane do sortowni" && (
                      <Select
                        className="my-profile__modal__select"
                        fullWidth
                        onChange={handleSelect}
                        value={orderInfoStatus}
                      >
                        <MenuItem value="Przyjęte do realizacji">
                          Przyjęte do realizacji
                        </MenuItem>
                        <MenuItem value="Odebrane od nadawcy">
                          Odebrane od nadawcy
                        </MenuItem>
                        <MenuItem value="W drodze do sortowni">
                          W drodze do sortowni
                        </MenuItem>
                        <MenuItem value="Przekazane do sortowni">
                          Przekazane do sortowni
                        </MenuItem>
                      </Select>
                    )}
                  {courierType === "delivery" &&
                    orderInfo?.data.status !== "Dostarczone do odbiorcy" && (
                      <Select
                        className="my-profile__modal__select"
                        fullWidth
                        onChange={handleSelect}
                        value={orderInfoStatus}
                      >
                        <MenuItem value="Gotowe do odbioru z sortowni">
                          Gotowe do odbioru z sortowni
                        </MenuItem>
                        <MenuItem value="Odebrane z sortowni">
                          Odebrane z sortowni
                        </MenuItem>
                        <MenuItem value="W drodze do odbiorcy">
                          W drodze do odbiorcy
                        </MenuItem>
                        <MenuItem value="Dostarczone do odbiorcy">
                          Dostarczone do odbiorcy
                        </MenuItem>
                      </Select>
                    )}
                </div>
              ) : (
                <div>Status zamówienia: {orderInfo?.data.status}</div>
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
            {user?.displayName &&
              !(
                orderInfo?.data.status === "Przekazane do sortowni" ||
                orderInfo?.data.status === "Dostarczone do odbiorcy"
              ) && (
                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    className="orders-history__button"
                  >
                    Zatwierdź
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default MyProfileModal;
