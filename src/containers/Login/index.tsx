"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FC, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setCookie } from "cookies-next";
import { Button, Input, message } from "antd";
import Typewriter from "typewriter-effect";
import { ButtonBack } from "@components/index";
import { BASE_URL } from "@constants/baseUrl";
import { useLoginStore } from "@stores/useLogin";
import { isAnyEmptyValue } from "@utils/array";
import "./style.css";
import { destroyCookie } from "nookies";

const Login: FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useLoginStore();
  const [messageApi, contextHolder] = message.useMessage();

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  const isDisabledLogin = useMemo(
    () => isAnyEmptyValue([email, password]),
    [email, password]
  );
  const handlerClick = async () => {
    refetch();
  };

  /* -------------------------------------------------------------------------- */
  /*                                   WIRING                                   */
  /* -------------------------------------------------------------------------- */
  const { data, isFetching, refetch, isError, error, isSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const resp = await axios?.post(`${BASE_URL}/api/login`, {
        email,
        username: email,
        password,
      });

      return resp?.data;
    },
    enabled: false,
  });

  /* -------------------------------------------------------------------------- */
  /*                                 USE EFFECT                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setEmail("");
    setPassword("");
    destroyCookie(undefined, "token");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFetching) {
      messageApi?.open({
        key: "fetching",
        type: "loading",
        content: (
          <Typewriter
            options={{
              strings: "Wait a moment...",
              autoStart: true,
              loop: true,
            }}
          />
        ),
        duration: 0,
      });
    }
    if (data && !isFetching && !isError) {
      const includeSuccess = (data?.message as string)
        ?.toLowerCase()
        ?.includes("success");
      messageApi?.destroy("fetching");
      messageApi.open({
        key: "data",
        type: includeSuccess ? "success" : "error",
        content: data?.message,
        duration: 3,
      });

      if (isSuccess) {
        if (data?.access_token) {
          setCookie("token", data?.access_token);
          setTimeout(() => {
            router?.push(`/profile`);
          }, 2000);
        }
      }
    }
    if (isError && !isFetching) {
      const errorMsg = error?.message;
      messageApi?.destroy("fetching");
      messageApi.open({
        key: "error",
        type: "error",
        content: errorMsg,
        duration: 5,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error?.message, isError, isFetching, isSuccess, messageApi]);
  return (
    <div className="flex flex-col gap-[60px]">
      {contextHolder}
      <header className="flex items-center justify-between gap-4 pl-[18px] pr-[26.76px] pt-[37px]">
        <ButtonBack nextUrl="register" />
      </header>
      <main className="main-container gap-[40px]">
        <div className="flex flex-col gap-[25px]">
          <div className="text-2xl font-bold px-[41px]">Login</div>
          <div className="flex flex-col gap-[15px] pl-[23px] pr-[25px]">
            <Input
              size="large"
              className="input-custom"
              placeholder="Enter Username/Email"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <Input.Password
              size="large"
              className="input-custom text-left"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </div>
          <Button
            size="large"
            className="mx-[23px] button-custom"
            type="primary"
            disabled={isDisabledLogin || isFetching}
            onClick={handlerClick}
          >
            Login
          </Button>
        </div>
        <div className="font-medium pl-[23px] pr-[25px] flex justify-center items-center gap-1 text-[13px]">
          <div>No account?</div>
          <Link
            className="border-b border-b-golden text-transparent bg-golden bg-clip-text"
            href="/register"
          >
            <div>Register here</div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
