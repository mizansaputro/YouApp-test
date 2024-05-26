import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios";
import ProfileContainer from "@containers/Profile";
import { BASE_URL } from "@constants/baseUrl";

export const generateMetadata = (): Metadata => {
  return {
    title: `YouApp: Profile`,
  };
};

const getData = async () => {
  const cookieStore = cookies();
  const token = cookieStore?.get("token")?.value;
  if (token && token !== undefined) {
    const resp = await axios?.get(`${BASE_URL}/api/getProfile`, {
      headers: {
        "x-access-token": token,
        "content-type": "application/json",
      },
    });
    return resp?.data?.data;
  } else {
    redirect("/login");
  }
};
const ProfilePage = async () => {
  const data = await getData();

  return (
    <ProfileContainer
      key={data}
      about={{
        displayName: data?.username ?? "",
        birthday: data?.birthday ?? "",
        gender: data?.gender ?? "",
        height: data?.height?.toString() ?? "",
        weight: data?.weight?.toString() ?? "",
      }}
      interest={data?.interests}
      profile={[]}
    />
  );
};

export default ProfilePage;
