import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";

import {
  IcAquarius,
  IcArcher,
  IcAries,
  IcBalance,
  IcBull,
  IcCancer,
  IcCrab,
  IcFish,
  IcGemini,
  IcGoat,
  IcLeo,
  IcLibra,
  IcLion,
  IcPisces,
  IcRam,
  IcSagittarius,
  IcScorpion,
  IcScorpious,
  IcTaurus,
  IcTwins,
  IcVirgin,
  IcVirgo,
  IcWaterBearer,
} from "@assets/index";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const FORMAT_DATE = "DD MM YYYY";
export const GENDER_LIST = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export const ZODIAC_LIST: Record<any, any> = {
  Aries: "Ram",
  Taurus: "Bull",
  Gemini: "Twins",
  Cancer: "Crab",
  Leo: "Lion",
  Virgo: "Virgin",
  Libra: "Balance",
  Scorpius: "Scorpion",
  Sagittarius: "Archer",
  Capricornus: "Goat",
  Aquarius: "Water Bearer",
  Picses: "Fish",
};

export const ZODIAC_IMG_LIST: Record<any, any> = {
  Ram: IcRam,
  Bull: IcBull,
  Twins: IcTwins,
  Crab: IcCrab,
  Lion: IcLion,
  Virgin: IcVirgin,
  Balance: IcBalance,
  Scorpion: IcScorpion,
  Archer: IcArcher,
  Goat: IcGoat,
  "Water Bearer": IcWaterBearer,
  Fish: IcFish,
};

export const HOROSCOPE_IMG_LIST: Record<any, any> = {
  Aries: IcAries,
  Taurus: IcTaurus,
  Gemini: IcGemini,
  Cancer: IcCancer,
  Leo: IcLeo,
  Virgo: IcVirgo,
  Libra: IcLibra,
  Scorpius: IcScorpious,
  Sagittarius: IcSagittarius,
  Capricornus: IcGoat,
  Aquarius: IcAquarius,
  Picses: IcPisces,
};

export const HOROSCOPE_LIST: Record<any, any> = {
  "20 03, 20 04": "Aries",
  "19 04, 21 05": "Taurus",
  "20 05, 22 06": "Gemini",
  "21 06, 23 07": "Cancer",
  "22 07, 23 08": "Leo",
  "22 08, 23 09": "Virgo",
  "22 09, 24 10": "Libra",
  "23 10, 22 11": "Scorpius",
  "21 11, 22 12": "Sagittarius",
  "19 01, 19 02": "Aquarius",
  "18 02, 21 03": "Picses",
  //"21 12, 20 01": "Capricornus", for default val because dateBetween read as false (start month < end motnth)
};

export const getHoroscope = (
  date: string
): { horoscope: string; zodiac: string } => {
  for (const item in HOROSCOPE_LIST) {
    const dateBetweenList = item?.split(",");

    const isTrue = dayjs(date?.slice(0, 5), "DD MM")?.isBetween(
      dayjs(dateBetweenList?.[0], "DD M"),
      dayjs(dateBetweenList?.[1], "DD MM")
    );
    if (isTrue) {
      const horoscope = HOROSCOPE_LIST?.[item];
      const zodiac = ZODIAC_LIST?.[horoscope];
      return { horoscope, zodiac };
    }
  }
  return {
    horoscope: "Capricornus",
    zodiac: "Goat",
  };
};
