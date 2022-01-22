import React from "react";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import "./OrdersHistory.scss";

export const OrdersHistoryModal = ({
  open,
  handleClose,
  filters,
  courierType,
  setFilters,
}) => (
  <Modal open={open} onClose={handleClose}>
    <div className="orders-history__modal">
      <form className="orders-history__modal__content">
        <IconButton
          className="orders-history__modal__exit-button"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <h1>Filtruj zamówienia</h1>
        <TextField
          id="inputFilter"
          name="inputFilter"
          value={filters.inputFilter}
          onChange={(event) =>
            setFilters({ ...filters, inputFilter: event.target.value })
          }
          className="orders-history__input"
          color="primary"
          label="Szukaj po numerze zamówienia, odbiorcy lub nadawcy"
          variant="filled"
          className="orders-history__modal__input"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "10px",
          }}
        >
          <span>Status zamówienia:</span>
          <Select
            value={filters.statusFilter}
            onChange={(event) =>
              setFilters({ ...filters, statusFilter: event.target.value })
            }
            className="orders-history__modal__select"
            fullWidth
          >
            {courierType === "collector"
              ? [
                  "Przyjęte do realizacji",
                  "Odebrane od nadawcy",
                  "W drodze do sortowni",
                  "Przekazane do sortowni",
                ].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))
              : [
                  "Gotowe do odbioru z sortowni",
                  "Odebrane z sortowni",
                  "W drodze do odbiorcy",
                  "Dostarczone do odbiorcy",
                ].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
            <MenuItem value="">Anuluj</MenuItem>
          </Select>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span>Status płatności:</span>
          <Select
            value={filters.payFilter}
            onChange={(event) =>
              setFilters({ ...filters, payFilter: event.target.value })
            }
            className="orders-history__modal__select"
            fullWidth
          >
            <MenuItem value="Przy odbiorze">Przy odbiorze</MenuItem>
            <MenuItem value="Opłacone">Opłacone</MenuItem>
            <MenuItem value="">Anuluj</MenuItem>
          </Select>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ marginBottom: "5px" }}>Data utworzenia</span>{" "}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              value={filters.createDateFilter}
              startText="Początek"
              endText="Koniec"
              onChange={(value) => {
                setFilters({ ...filters, createDateFilter: value });
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField color="primary" variant="filled" {...startProps} />
                  <Box sx={{ mx: 2 }}> do </Box>
                  <TextField color="primary" variant="filled" {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ marginBottom: "5px" }}>Data modyfikacji</span>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              value={filters.modifyDateFilter}
              startText="Początek"
              endText="Koniec"
              onChange={(value) => {
                setFilters({ ...filters, modifyDateFilter: value });
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField color="primary" variant="filled" {...startProps} />
                  <Box sx={{ mx: 2 }}> do </Box>
                  <TextField color="primary" variant="filled" {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Button onClick={handleClose} className="orders-history__button">
            Zatwierdź
          </Button>
        </div>
      </form>
    </div>
  </Modal>
);
