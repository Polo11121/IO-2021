import React from "react";
import {
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import boxXS from "./boxXS.png";
import boxS from "./boxS.png";
import boxM from "./boxM.png";
import boxL from "./boxL.png";
import boxXL from "./boxXL.png";
import "./OrderInfoForm.scss";

export const OrderInfoForm = ({
  formik,
  cashOnDelivery,
  setCashOnDelivery,
}) => {
  const packageSizeInfo = {
    XS: {
      weight: "1 kg",
      size: "od 2 do 35 cm",
      descp: "Koperta lub karton",
      example: "np. dokumenty, telefon, zegarek",
      image: boxXS,
    },
    S: {
      weight: "31.5 kg",
      size: "od 36 do 50 cm",
      descp: "Karton",
      example: "np. aparat fotograficzny, książka",
      image: boxS,
    },
    M: {
      weight: "31.5 kg",
      size: "od 51 do 80 cm",
      descp: "Karton",
      example: "np. pudełko z butami, mikser, toster",
      image: boxM,
    },
    L: {
      weight: "31.5 kg",
      size: "od 81 do 120 cm",
      descp: "Karton",
      example: "np. odkurzacz, robot kuchenny, mikrofalówka",
      image: boxL,
    },
    XL: {
      weight: "31.5 kg",
      size: "od 121 do 180 cm",
      descp: "120 x 60 x 60 cm",
      example: "maksymalne wymiary paczki",
      image: boxXL,
    },
  };

  const handleSwitchChange = () => setCashOnDelivery(!cashOnDelivery);

  const IOSSwitch = styled((props) => (
    <Switch
      checked={!!cashOnDelivery}
      onBlur={formik.handleBlur}
      onChange={handleSwitchChange}
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <form className="order-info-form">
      <h2> Jaki jest rozmiar paczki?</h2>
      <RadioGroup
        className="order-info-form__radio-group"
        row
        aria-label="gender"
        name="size"
        value={formik.values.size}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <FormControlLabel
          value="XS"
          control={<Radio />}
          label="XS (12.93 zł)"
        />
        <FormControlLabel value="S" control={<Radio />} label="S (14.55 zł)" />
        <FormControlLabel value="M" control={<Radio />} label="M (15.36 zł)" />
        <FormControlLabel value="L" control={<Radio />} label="L (23.49 zł)" />
        <FormControlLabel
          value="XL"
          control={<Radio />}
          label="XL (25.20 zł)"
        />
      </RadioGroup>
      <div className="order-info-form__box">
        <img src={packageSizeInfo[formik.values.size].image} alt="" />
      </div>
      <h3>Paczka {formik.values.size}</h3>
      <div className="order-info-form__size__info">
        <div>
          <span className="order-info-form__size__info--bold">
            {packageSizeInfo[formik.values.size].weight}
          </span>
          maksymalnej wagi
        </div>
        <div>
          <span className="order-info-form__size__info--bold">
            {packageSizeInfo[formik.values.size].size}
          </span>
          suma najkrótszego i najdłuższego boku
        </div>
        <div>
          <span className="order-info-form__size__info--bold">
            {packageSizeInfo[formik.values.size].descp}
          </span>
          {packageSizeInfo[formik.values.size].example}
        </div>
      </div>
      <h2>Opcje i usługi dodatkowe</h2>
      <h3
        style={{
          margin: 0,
          fontWeight: "normal",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        Wpisz wartość paczki i wybierz usługi dodatkowe
      </h3>
      <div style={{ width: "70%", marginBottom: "50px" }}>
        <div className="order-info-form__info">
          <div className="order-info-form__info__label">
            Kto zleca usługe kurierską?
          </div>
          <div className="order-info-form__info__input">
            <Select
              value={formik.values.creator}
              onChange={formik.handleChange}
              id="creator"
              name="creator"
              variant="standard"
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Nadawca">Nadawca</MenuItem>
              <MenuItem value="Odbiorca">Odbiorca</MenuItem>
            </Select>
          </div>
        </div>
        <div className="order-info-form__info">
          <div className="order-info-form__info__label">
            Wpisz wartość paczki
          </div>
          <div className="order-info-form__info__input">
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">PLN</InputAdornment>
                ),
              }}
              value={formik.values.value}
              error={Boolean(formik.errors.value || !formik.values.value)}
              helperText={
                formik.errors.value && formik.touched.value
                  ? formik.errors.value
                  : null
              }
              onChange={formik.handleChange}
              id="value"
              name="value"
              variant="standard"
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="order-info-form__info">
          <div className="order-info-form__info__label">
            Paczka pobraniowa Płatność przez adresata przy odbiorze
          </div>
          <div className="order-info-form__info__input">
            <span style={{ fontWeight: "bold" }}>+6,50 PLN</span>
            <IOSSwitch />
          </div>
        </div>
      </div>
    </form>
  );
};
