import { ConfigProvider, ThemeConfig } from "antd";
import { ReactNode } from "react";
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const THEME: ThemeConfig = {
    components: {
      Input: {
        colorBgContainer: "rgba(255, 255, 255, 0.06)",
        borderRadius: 9,
        colorBorder: "transparent",
        colorText: "white",
        colorTextPlaceholder: "rgba(255, 255, 255, 0.4)",
        activeBorderColor: "#4b5563",
        colorIcon: "#fff",
      },
      DatePicker: {
        colorBgElevated: "#4b5563",
        colorPrimary: "#2563eb",
        colorText: "#fff",
        colorPrimaryBorder: "#0284c7",
        colorSplit: "#9ca3af",
        colorTextHeading: "#fff",
        colorTextLightSolid: "#facc15",
        colorIcon: "#e5e7eb",
        colorTextDisabled: "#9ca3af",
      },
      Select: {
        colorBgElevated: "#4b5563",
        colorText: "white",
        controlItemBgActive: "#9ca3af",
        colorBorder: "transparent",
      },
    },
  };
  return <ConfigProvider theme={THEME}>{children}</ConfigProvider>;
};

export default ThemeProvider;
