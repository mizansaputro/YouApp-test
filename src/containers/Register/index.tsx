"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FC, useEffect, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Typewriter from "typewriter-effect";
import { ButtonBack } from "@components/index";
import { useRegisterStore } from "@stores/useRegister";
import { isAnyEmptyValue } from "@utils/array";
import { BASE_URL } from "@constants/baseUrl";
import "./style.css";

const Register: FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const {
    email,
    username,
    password,
    passwordConfirm,
    setUsername,
    setEmail,
    setPassword,
    setPasswordConfirm,
  } = useRegisterStore();
  const [messageApi, contextHolder] = message.useMessage();

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  const isDisabledLogin = useMemo(
    () => isAnyEmptyValue([email, username, password, passwordConfirm]),
    [email, username, password, passwordConfirm]
  );
  const isErrorPasswordConfirm = useMemo(
    () => password !== passwordConfirm && passwordConfirm?.length > 0,
    [password, passwordConfirm]
  );
  const handlerRegister = () => {
    refetch();
  };

  /* -------------------------------------------------------------------------- */
  /*                                   WIRING                                   */
  /* -------------------------------------------------------------------------- */
  const { data, isFetching, refetch, isError, error, isSuccess } = useQuery({
    queryKey: ["register"],
    queryFn: async () => {
      const resp = await axios?.post(`${BASE_URL}/api/register`, {
        email,
        username,
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
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
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
      messageApi?.destroy("fetching");
      messageApi.open({
        key: "data",
        type: (data?.message as string)?.toLowerCase()?.includes("success")
          ? "success"
          : "error",
        content: data?.message,
        duration: 3,
      });
      if (isSuccess) {
        if (data?.message !== "User already exists") {
          setTimeout(() => router?.push("/login"), 3000);
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
  }, [data, isError, isFetching, messageApi, error, isSuccess]);
  return (
    <div className="flex flex-col gap-[60px]">
      {contextHolder}
      <header className="flex items-center justify-between gap-4 pl-[18px] pr-[26.76px] pt-[37px]">
        <ButtonBack nextUrl="login" />
      </header>
      <main className="main-container gap-[34px] ">
        <div className="flex flex-col gap-[25px]">
          <div className="text-2xl font-bold px-[41px]">Register</div>
          <div className="flex flex-col gap-[11px] pl-[23px] pr-[25px]">
            <Input
              size="large"
              className="input-custom"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <Input
              size="large"
              className="input-custom"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e?.target?.value)}
            />
            <Input.Password
              size="large"
              className="input-custom "
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
            />
            <div className="flex flex-col gap-2">
              <Input.Password
                size="large"
                className="input-custom "
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e?.target?.value)}
                status={isErrorPasswordConfirm ? "error" : ""}
                prefix={isErrorPasswordConfirm ? <ClockCircleOutlined /> : null}
              />
              {isErrorPasswordConfirm && (
                <div className="text-red-400 text-[10px]">
                  Password must be same!
                </div>
              )}
            </div>
          </div>
          <Button
            size="large"
            className="mx-[23px] button-custom"
            type="primary"
            disabled={isDisabledLogin || isErrorPasswordConfirm}
            onClick={handlerRegister}
          >
            Register
          </Button>
        </div>
        <div className="font-medium pl-[23px] pr-[25px] flex justify-center items-center gap-1 text-[13px]">
          <div>Have an account?</div>
          <Link
            className="border-b border-b-golden text-transparent bg-golden bg-clip-text"
            href="/login"
          >
            <div>Login here</div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Register;
