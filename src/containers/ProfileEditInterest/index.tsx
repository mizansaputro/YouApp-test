"use client";
import { FC, useEffect, useState } from "react";
import { Button, Select, message } from "antd";
import ButtonBack from "@components/ButtonBack";
import { options } from "./config";
import "./style.css";
import { useProfileStore } from "@stores/useProfile";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@constants/baseUrl";
import { getCookie } from "cookies-next";

interface Props {
  data: string[] | undefined;
}

const ProfileEditInterest: FC<Props> = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const token = getCookie("token");

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const { setInterest } = useProfileStore();
  const [input, setInput] = useState<string[] | undefined>();

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  const handlerSaveAbout = () => {
    setInterest(input);
    refetch();
  };

  /* -------------------------------------------------------------------------- */
  /*                                   WIRING                                   */
  /* -------------------------------------------------------------------------- */
  const {
    data: dataPost,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["update-about"],
    queryFn: async () => {
      const resp = await axios?.put(
        `${BASE_URL}/api/updateProfile`,
        {
          interests: input,
        },
        {
          headers: {
            "x-access-token": token,
            "content-type": "application/json",
          },
        }
      );

      return resp?.data;
    },
    enabled: false,
  });
  useEffect(() => {
    if (isFetching) {
      messageApi?.open({
        key: "fetching-update-interest",
        type: "loading",
        content: "processing profile updates",
        duration: 0,
      });
    } else {
      if (dataPost) {
        messageApi?.destroy("fetching-update-interest");
        messageApi?.open({
          key: "update-interest",
          type: "info",
          content: dataPost?.message,
          duration: 5,
        });
        router?.push("/profile");
      } else {
        messageApi?.destroy("fetching-update-interest");
      }
    }
  }, [isFetching, dataPost, messageApi, router]);
  /* -------------------------------------------------------------------------- */
  /*                                 USE EFFECT                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setInput(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleChange = (value: string[]) => {
    setInput(value);
  };
  return (
    <div className="flex flex-col gap-[73px]">
      <header className="flex items-center justify-between gap-4 pl-[18px] pr-[26.76px] pt-[37px]">
        <ButtonBack nextUrl="profile" />
        <Button
          type="text"
          className="button-text !bg-gradient-2 !text-transparent !bg-clip-text"
          onClick={handlerSaveAbout}
        >
          Save
        </Button>
      </header>
      <main className="main-container gap-[35px]">
        <div className="flex flex-col gap-3 pl-[35px] pr-[27px]">
          <div className="text-transparent bg-golden bg-clip-text font-bold text-sm">
            Tell everyone about yourself
          </div>
          <div className="font-bold text-xl">What interest you?</div>
        </div>
        <div className="pl-6 pr-[27px]">
          <Select
            value={input}
            size="large"
            mode="tags"
            onChange={handleChange}
            options={options}
            className="w-full "
            listHeight={100}
            suffixIcon={null}
          />
        </div>
      </main>
    </div>
  );
};

export default ProfileEditInterest;
