import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthProvider";
import { Error } from "../Error/Error";
import { CreateOrdersForms } from "./CreateOrdersForms/CreateOrderForms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./CreateOrder.scss";

export const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user?.displayName) {
      navigate("/myprofile");
    }
  }, []);

  useEffect(() => {
    setOrderNumber(Math.ceil(Math.random() * 900000000000));
  }, []);

  const sizeCost = {
    XS: 12.93,
    S: 14.55,
    M: 15.36,
    L: 23.49,
    XL: 25.2,
  };

  const formik = useFormik({
    initialValues: {
      size: "XS",
      creator: "Nadawca",
      value: "",
      senderStreet: "",
      senderNumber: "",
      senderLocal: "",
      senderTown: "",
      senderPostCode: "",
      senderName: "",
      senderSurname: "",
      senderPhone: "",
      senderEmail: "",
      reciverStreet: "",
      reciverNumber: "",
      reciverLocal: "",
      reciverTown: "",
      reciverPostCode: "",
      reciverName: "",
      reciverSurname: "",
      reciverPhone: "",
      reciverEmail: "",
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .test(
          "Is positive?",
          "Nieprawidłowa wartość paczki!",
          (value) => value > 0
        )
        .required(),
      senderStreet: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      senderNumber: Yup.string()
        .test("Is positive?", "Must be a number", (value) => value > 0)
        .required(),
      senderLocal: Yup.string()
        .test("Is positive?", "Must be a number", (value) => value > 0)
        .required(),
      senderTown: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      senderPostCode: Yup.string()
        .matches(/\d{2}-\d{3}/)
        .test("len", "Must have length of 6", (val) => val?.length === 6)
        .required(),
      senderName: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      senderSurname: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      senderEmail: Yup.string().email().required(),
      senderPhone: Yup.string()
        .test("Is number", "Must be a number", (value) => (value) => 0)
        .test("len", "Must be have length of 9", (val) => val?.length === 9)
        .required(),
      reciverStreet: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      reciverNumber: Yup.string()
        .test("Is positive?", "Must be a number", (value) => value > 0)
        .required(),
      reciverLocal: Yup.string()
        .test("Is positive?", "Must be a number", (value) => value > 0)
        .required(),
      reciverTown: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      reciverPostCode: Yup.string()
        .matches(/\d{2}-\d{3}/)
        .test("len", "Must have length of 6", (val) => val?.length === 6)
        .required(),
      reciverName: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      reciverSurname: Yup.string()
        .matches(
          /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]\w/
        )
        .required(),
      reciverEmail: Yup.string().email().required(),
      reciverPhone: Yup.string()
        .test("Is number", "Must be a number", (value) => (value) => 0)
        .test("len", "Must be have length of 9", (val) => val?.length === 9)
        .required(),
    }),
    onSubmit: async (data) => {
      const collectionRef = collection(db, "couriers");
      const querySnapshot = await getDocs(collectionRef);
      const querySnapshotTable = [];
      querySnapshot.forEach((doc) => {
        querySnapshotTable.push(doc.id);
      });
      const courier =
        querySnapshotTable[
          Math.floor(Math.random() * querySnapshotTable.length)
        ];
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
      const orderInfo = {
        user: user?.email,
        courier,
        orderValue: formik.values.value,
        orderCost: cashOnDelivery
          ? `${sizeCost[formik.values.size] + 6.5}`.length < 5
            ? `${sizeCost[formik.values.size] + 6.5}0`
            : `${sizeCost[formik.values.size] + 6.5}`
          : `${sizeCost[formik.values.size]}`.length < 5
          ? `${sizeCost[formik.values.size]}0`
          : `${sizeCost[formik.values.size]}`,
        size: data.size,
        creator: data.creator,
        cashOnDelivery,
        status: "Przyjęta do realizacji",
        createDate: actualDate,
        updateDate: actualDate,
        sender: {
          street: `${data.senderStreet} ${data.senderNumber}/${data.senderLocal}`,
          postCode: `${data.senderTown}, ${data.senderPostCode} `,
          name: `${data.senderName} ${data.senderSurname}`,
          phone: data.senderPhone,
          email: data.senderEmail,
        },
        reciver: {
          street: `${data.reciverStreet} ${data.reciverNumber}/${data.reciverLocal}`,
          postCode: `${data.reciverTown}, ${data.reciverPostCode} `,
          name: `${data.reciverName} ${data.reciverSurname}`,
          phone: data.reciverPhone,
          email: data.reciverEmail,
        },
      };
      await setDoc(doc(db, "orders", `${orderNumber}`), orderInfo);
      await setDoc(
        doc(db, "users", `${user.email}`, "orders", `${orderNumber}`),
        orderInfo
      );
      await setDoc(
        doc(db, "couriers", `${courier}`, "orders", `${orderNumber}`),
        orderInfo
      );
    },
  });

  const nextform = () => {
    if (activeStep === 0) {
      return !formik.values.value;
    }
    if (activeStep === 1) {
      return !!(
        formik.errors.senderStreet ||
        formik.errors.senderNumber ||
        formik.errors.senderLocal ||
        formik.errors.senderTown ||
        formik.errors.senderPostCode ||
        formik.errors.senderName ||
        formik.errors.senderSurname ||
        formik.errors.senderPhone ||
        formik.errors.senderEmail
      );
    }
    if (activeStep === 2) {
      return !!(
        formik.errors.reciverStreet ||
        formik.errors.reciverNumber ||
        formik.errors.reciverLocal ||
        formik.errors.reciverTown ||
        formik.errors.reciverPostCode ||
        formik.errors.reciverName ||
        formik.errors.reciverSurname ||
        formik.errors.reciverPhone ||
        formik.errors.reciverEmail
      );
    }
  };

  const steps = [
    "Rozmiar, opcje i usługi",
    "Dane kontaktowe nadawcy",
    "Dane kontaktowe odbiorcy",
    "Podsumowanie",
  ];

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return user ? (
    <div className="create-order">
      <div className="create-order__content">
        <Stepper className="create-order__steps" activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Krok {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {activeStep !== 0 && "Cofnij"}
            </Button>
            {activeStep !== 3 && (
              <div>
                Całkowity koszt:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {cashOnDelivery
                    ? `${sizeCost[formik.values.size] + 6.5}`.length < 5
                      ? `${sizeCost[formik.values.size] + 6.5}0`
                      : `${sizeCost[formik.values.size] + 6.5}`
                    : `${sizeCost[formik.values.size]}`.length < 5
                    ? `${sizeCost[formik.values.size]}0`
                    : `${sizeCost[formik.values.size]}`}{" "}
                  PLN
                </span>
              </div>
            )}
            {activeStep !== 3 && (
              <Button disabled={nextform()} onClick={handleNext}>
                Dalej
              </Button>
            )}
          </Box>
        </>
        <CreateOrdersForms
          activeStep={activeStep}
          formik={formik}
          cashOnDelivery={cashOnDelivery}
          setCashOnDelivery={setCashOnDelivery}
          cost={sizeCost[formik.values.size]}
          onSubmit={formik.handleSubmit}
          orderNumber={orderNumber}
        />
        {activeStep === 0 && (
          <div className="create-order__next-button">
            <Button disabled={nextform()} onClick={handleNext}>
              Dalej
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Error />
  );
};
