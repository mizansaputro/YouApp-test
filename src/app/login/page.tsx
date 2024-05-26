import { Metadata } from "next";
import LoginContainer from "@containers/Login";

export const generateMetadata = (): Metadata => {
  return {
    title: `YouApp: Login`,
  };
};

const LoginPage = () => {
  return <LoginContainer />;
};

export default LoginPage;
