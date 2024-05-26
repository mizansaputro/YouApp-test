"use client";
import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import InformationBox from "../InformationBox";
import ButtonEdit from "@components/ButtonEdit";
import BoxAnimate from "@components/BoxAnimate";
import { AboutInterface } from "@constants/about";
import {
  HOROSCOPE_IMG_LIST,
  ZODIAC_IMG_LIST,
} from "@containers/Profile/constants/config";
import { useProfileStore } from "@stores/useProfile";
import { FileType, getBase64 } from "@containers/Profile/constants/interface";

interface Props {
  about: AboutInterface;
  extra: {
    horoscope: string;
    zodiac: string;
  };
}

const WidgetBox: FC<Props> = ({ about, extra }) => {
  const { profile } = useProfileStore();
  const [imgBanner, setImg] = useState<string>();

  useEffect(() => {
    const renderImgBase64 = async () => {
      if (
        !profile?.[0]?.url &&
        !profile?.[0]?.preview &&
        profile?.[0]?.originFileObj
      ) {
        profile[0].preview = await getBase64(
          profile?.[0]?.originFileObj as FileType
        );
        setImg(profile?.[0]?.preview);
      }
    };
    renderImgBase64();
  }, [profile]);

  return (
    <div
      className={`h-[190px] xl:h-[50dvh] w-full relative rounded-2xl bg-[#162329]`}
    >
      {imgBanner && imgBanner?.length > 0 && (
        <Image
          src={imgBanner}
          alt="bg-img-profile"
          fill
          objectFit="cover"
          priority
          quality={100}
          objectPosition="center"
        />
      )}
      <div className="absolute top-[6px] right-[14px] font-bold">
        <ButtonEdit />
      </div>
      <div className="absolute bottom-[17px] left-[13px] flex flex-col gap-3 text-[13px] z-[1]">
        <div className="flex flex-col gap-[6px]">
          <div className="font-bold">{about?.displayName}</div>
          <div className="font-medium">{about?.gender}</div>
        </div>
        <div className="flex items-center gap-[15px]">
          {extra?.horoscope && (
            <BoxAnimate index={1}>
              <InformationBox
                label={extra?.horoscope}
                img={HOROSCOPE_IMG_LIST?.[extra?.horoscope]}
              />
            </BoxAnimate>
          )}
          {extra?.zodiac && (
            <BoxAnimate index={2}>
              <InformationBox
                label={extra?.zodiac}
                img={ZODIAC_IMG_LIST?.[extra?.zodiac]}
              />
            </BoxAnimate>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetBox;
