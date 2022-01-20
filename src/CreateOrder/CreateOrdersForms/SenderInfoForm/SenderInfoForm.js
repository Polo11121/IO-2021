import React from "react";
import { TextField } from "@mui/material";
import "./SenderInfoForm.scss";

export const SenderInfoForm = ({ formik }) => (
  <main>
    <div className="sender-info-form__title">
      <h2>Dane kontaktowe nadawcy</h2>
      Powiadomimy odbiorcę o terminie dostawy, a nadawcę — gdy doręczymy paczkę
    </div>
    <div style={{ width: "60%", margin: "20px auto" }}>
      <span style={{ fontWeight: "bold" }}>Skąd</span> - adres nadawcy
    </div>
    <form className="sender-info-form">
      <div className="sender-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="senderStreet"
            name="senderStreet"
            className="sender-info-form__textfield"
            fullWidth
            label=" Ulica"
            variant="standard"
            error={formik.errors.senderStreet && formik.touched.senderStreet}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderStreet}
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <TextField
            id="senderNumber"
            name="senderNumber"
            className="sender-info-form__textfield"
            fullWidth
            label="Nr"
            variant="standard"
            error={formik.errors.senderNumber && formik.touched.senderNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderNumber}
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <TextField
            id="senderLocal"
            name="senderLocal"
            className="sender-info-form__textfield"
            fullWidth
            label="Lokal"
            variant="standard"
            error={formik.errors.senderLocal && formik.touched.senderLocal}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderLocal}
          />
        </div>
      </div>
      <div className="sender-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="senderTown"
            name="senderTown"
            className="sender-info-form__textfield"
            fullWidth
            label="Miejscowość"
            variant="standard"
            error={formik.errors.senderTown && formik.touched.senderTown}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderTown}
          />
        </div>
        <div style={{ flex: 0.4 }}>
          <TextField
            id="senderPostCode"
            name="senderPostCode"
            className="sender-info-form__textfield"
            fullWidth
            label="Kod Poczotwy"
            variant="standard"
            error={
              formik.errors.senderPostCode && formik.touched.senderPostCode
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderPostCode}
          />
        </div>
      </div>
      <div className="sender-info-form__row">
        <div style={{ flex: 0.5 }}>
          <TextField
            id="senderName"
            name="senderName"
            className="sender-info-form__textfield"
            fullWidth
            label="Imię"
            variant="standard"
            error={formik.errors.senderName && formik.touched.senderName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderName}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <TextField
            id="senderSurname"
            name="senderSurname"
            className="sender-info-form__textfield"
            fullWidth
            label="Nazwisko"
            variant="standard"
            error={formik.errors.senderSurname && formik.touched.senderSurname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderSurname}
          />
        </div>
      </div>
      <div className="sender-info-form__row">
        <div style={{ flex: 0.6 }}>
          <TextField
            id="senderPhone"
            name="senderPhone"
            className="sender-info-form__textfield"
            fullWidth
            label="Tel komórkowy"
            variant="standard"
            error={formik.errors.senderPhone && formik.touched.senderPhone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderPhone}
          />
        </div>
        <div style={{ flex: 0.4 }}>
          <TextField
            id="senderEmail"
            name="senderEmail"
            className="sender-info-form__textfield"
            fullWidth
            label="E-mail"
            variant="standard"
            error={formik.errors.senderEmail && formik.touched.senderEmail}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.senderEmail}
          />
        </div>
      </div>
    </form>
  </main>
);
