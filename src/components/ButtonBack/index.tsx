"use client";
import Link from "next/link";
import { FC } from "react";
import { Button, ButtonProps } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { URL_LIST, UrlInterface } from "@constants/menu";
import { destroyCookie } from "nookies";

interface Props {
  nextUrl: keyof UrlInterface;
  deleteToken?: boolean;
  props?: ButtonProps;
}

const ButtonBack: FC<Props> = ({ nextUrl, props, deleteToken }) => {
  const handlerBack = (e: any) => {
    e?.stopPropagation();
    destroyCookie(undefined, "token");
  };
  return (
    <Link className="active:!text-blue-400" href={URL_LIST?.[nextUrl]}>
      <Button
        {...props}
        type="text"
        className="button-text font-bold"
        icon={<LeftOutlined />}
        onClick={deleteToken ? handlerBack : () => {}}
      >
        Back
      </Button>
    </Link>
  );
};

export default ButtonBack;
