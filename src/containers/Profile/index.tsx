import Link from "next/link";
import { FC, useMemo } from "react";
import { Button, UploadFile } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { BoxAnimate, ButtonBack, ButtonEdit } from "@components/index";
import WidgetBox from "./components/WidgetBox";
import AboutCard from "./components/AboutCard";
import { AboutInterface } from "@constants/about";
import { getHoroscope } from "./constants/config";
import "./constants/style.css";

interface Props {
  about: AboutInterface;
  profile: UploadFile[];
  interest: string[] | undefined;
}

const Profile: FC<Props> = ({ about, profile, interest }) => {
  const memoHoroscope = useMemo(
    () => getHoroscope(about?.birthday),
    [about?.birthday]
  );

  const renderInterest = useMemo(() => {
    if (interest) {
      if (interest?.length > 0) {
        return (
          <div className="flex items-center gap-3 flex-wrap">
            {interest?.map((item, index) => (
              <BoxAnimate index={index} key={`interest-${item}`}>
                <div
                  key={`interest-${item}`}
                  className="bg-white bg-opacity-[6%] py-2 px-4 rounded-[100px] capitalize text-[14px] font-semibold"
                >
                  {item}
                </div>
              </BoxAnimate>
            ))}
          </div>
        );
      }
    }
    return (
      <div className="font-medium text-sm opacity-[52%] pr-5">
        Add in your interest to find a better match
      </div>
    );
  }, [interest]);
  return (
    <div className="flex flex-col gap-[28px]">
      <header className="flex items-center justify-between gap-4 pl-[18px] pr-[26.76px] pt-[37px]">
        <ButtonBack nextUrl="login" deleteToken={true} />
        <div className="font-semibold text-sm">{about?.displayName}</div>
        <Button type="text" className="button-text">
          <EllipsisOutlined className="text-[21.24px]" />
        </Button>
      </header>
      <main className="grid grid-cols-4 gap-6 px-2 xl:px-8 pb-4">
        <div className="col-span-4 xl:col-span-3">
          <WidgetBox about={about} extra={memoHoroscope} />
        </div>
        <div className="col-span-4 xl:col-span-1">
          <AboutCard
            data={{
              ...about,
              horoscope: memoHoroscope?.horoscope,
              zodiac: memoHoroscope?.zodiac,
            }}
          />
        </div>
        <Link href="profile/edit-interest" className="col-span-4">
          <div className="menu-container">
            <div className="flex justify-between items-center">
              <div className="font-bold text-sm">Interest</div>
              <ButtonEdit />
            </div>
            {renderInterest}
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Profile;
