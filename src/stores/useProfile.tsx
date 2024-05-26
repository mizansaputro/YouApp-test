import { create } from "zustand";
import { UploadFile } from "antd";
import { AboutInterface } from "@constants/about";

interface ProfileStateInterface {
  token: string;
  about: AboutInterface;
  interest: string[] | undefined;
  isEditAbout: boolean;
  profile: UploadFile[];
  setAbout: ({ key, val }: { key: string; val: string }) => void;
  setIsEditAbout: (val: boolean) => void;
  setProfile: (val: UploadFile[]) => void;
  setInterest: (val: string[] | undefined) => void;
  setToken: (val: string) => void;
}

export const useProfileStore = create<ProfileStateInterface>((set) => ({
  token: "",
  about: {
    displayName: "",
    gender: undefined,
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
  },
  interest: [],
  profile: [],
  isEditAbout: false,
  setAbout: ({ key, val }) =>
    set((state) => ({ about: { ...state?.about, [key]: val } })),
  setIsEditAbout: (val) => set({ isEditAbout: val }),
  setProfile: (val) => set({ profile: val }),
  setInterest: (val) => set({ interest: val }),
  setToken: (val) => set({ token: val }),
}));
