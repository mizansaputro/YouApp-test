import { cookies } from "next/headers";
import { Metadata } from "next";
import { FC } from "react";
import axios from "axios";
import EditInterestContainer from "@containers/ProfileEditInterest";
import { BASE_URL } from "@constants/baseUrl";

export const generateMetadata = (): Metadata => {
  return {
    title: `YouApp: Edit Interest`,
  };
};
const getData = async () => {
  const cookieStore = cookies();
  const token = cookieStore?.get("token")?.value;
  const resp = await axios?.get(`${BASE_URL}/api/getProfile`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json",
    },
  });
  return resp?.data?.data;
};

const EditInterestPage: FC = async () => {
  const data = await getData();
  return <EditInterestContainer data={data?.interests} />;
};

export default EditInterestPage;
