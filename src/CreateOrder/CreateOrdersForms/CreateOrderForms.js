import React from "react";
import { OrderInfoForm } from "./OrderInfoForm/OrderInfoForm";
import { ReciverInfoForm } from "./ReciverInfoForm/ReciverInfoForm";
import { SenderInfoForm } from "./SenderInfoForm/SenderInfoForm";
import { OrderSummary } from "./OrderSummary/OrderSummary";

export const CreateOrdersForms = ({
  activeStep,
  formik,
  cashOnDelivery,
  setCashOnDelivery,
  cost,
  onSubmit,
  orderNumber,
}) => {
  if (activeStep === 0) {
    return (
      <OrderInfoForm
        formik={formik}
        cashOnDelivery={cashOnDelivery}
        setCashOnDelivery={setCashOnDelivery}
      />
    );
  } else if (activeStep === 1) {
    return <SenderInfoForm formik={formik} />;
  } else if (activeStep === 2) {
    return <ReciverInfoForm formik={formik} />;
  }
  return (
    <OrderSummary
      onSubmit={onSubmit}
      formik={formik}
      cashOnDelivery={cashOnDelivery}
      cost={cost}
      orderNumber={orderNumber}
    />
  );
};
