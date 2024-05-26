import { Metadata } from "next";
import React from "react";
import RegisterContainer from "@containers/Register";

export const generateMetadata = (): Metadata => {
  return {
    title: `YouApp: Register`,
  };
};

const RegisterPage = () => {
  return <RegisterContainer />;
};

export default RegisterPage;
