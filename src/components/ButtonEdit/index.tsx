import { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ButtonEdit: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} type="text" className="button-text">
      <EditOutlined className="text-[17px]" />
    </Button>
  );
};

export default ButtonEdit;
