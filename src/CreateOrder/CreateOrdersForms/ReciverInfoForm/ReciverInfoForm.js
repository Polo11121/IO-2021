import React from "react";
import { TextField } from "@mui/material";
import "./ReciverInfoForm.scss";

export const ReciverInfoForm = ({ formik }) => (
  <div>
    <div className="reciver-info-form__title">
      <h2>Dane kontaktowe odbiorcy</h2>
      Powiadomimy odbiorcę o terminie dostawy, a nadawcę — gdy doręczymy paczkę
    </div>
    <div style={{ width: "60%", margin: "20px auto" }}>
      <span style={{ fontWeight: "bold" }}>Dokąd</span> - adres odbiorcy
    </div>
    <form className="reciver-info-form">
      <div className="reciver-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="reciverStreet"
            name="reciverStreet"
            className="reciver-info-form__textfield"
            fullWidth
            label="Ulica"
            variant="standard"
            error={formik.errors.reciverStreet && formik.touched.reciverStreet}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverStreet}
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <TextField
            id="reciverNumber"
            name="reciverNumber"
            className="reciver-info-form__textfield"
            fullWidth
            label="Nr"
            variant="standard"
            error={formik.errors.reciverNumber && formik.touched.reciverNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverNumber}
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <TextField
            id="reciverLocal"
            name="reciverLocal"
            className="reciver-info-form__textfield"
            fullWidth
            label="Lokal"
            variant="standard"
            error={formik.errors.reciverLocal && formik.touched.reciverLocal}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverLocal}
          />
        </div>
      </div>
      <div className="reciver-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="reciverTown"
            name="reciverTown"
            className="reciver-info-form__textfield"
            fullWidth
            label="Miejscowość"
            variant="standard"
            error={formik.errors.reciverTown && formik.touched.reciverTown}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverTown}
          />
        </div>
        <div style={{ flex: 0.4 }}>
          <TextField
            id="reciverPostCode"
            name="reciverPostCode"
            className="reciver-info-form__textfield"
            fullWidth
            label="Kod Poczotwy"
            variant="standard"
            error={
              formik.errors.reciverPostCode && formik.touched.reciverPostCode
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverPostCode}
          />
        </div>
      </div>
      <div className="reciver-info-form__row">
        <div style={{ flex: 0.5 }}>
          <TextField
            id="reciverName"
            name="reciverName"
            className="reciver-info-form__textfield"
            fullWidth
            label="Imię"
            variant="standard"
            error={formik.errors.reciverName && formik.touched.reciverName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverName}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <TextField
            id="reciverSurname"
            name="reciverSurname"
            className="reciver-info-form__textfield"
            fullWidth
            label="Nazwisko"
            variant="standard"
            error={
              formik.errors.reciverSurname && formik.touched.reciverSurname
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverSurname}
          />
        </div>
      </div>
      <div className="reciver-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="reciverPhone"
            name="reciverPhone"
            className="reciver-info-form__textfield"
            fullWidth
            label="Tel komórkowy"
            variant="standard"
            error={formik.errors.reciverPhone && formik.touched.reciverPhone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverPhone}
          />
        </div>
        <div style={{ flex: 0.4 }}>
          <TextField
            id="reciverEmail"
            name="reciverEmail"
            className="reciver-info-form__textfield"
            fullWidth
            label="E-mail"
            variant="standard"
            error={formik.errors.reciverEmail && formik.touched.reciverEmail}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reciverEmail}
          />
        </div>
      </div>
    </form>
  </div>
);
