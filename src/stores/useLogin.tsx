import { create } from "zustand";

interface LoginStateInterface {
  email: string;
  password: string;
  setEmail: (next: string) => void;
  setPassword: (next: string) => void;
}

export const useLoginStore = create<LoginStateInterface>((set) => ({
  email: "",
  password: "",
  setEmail: (next: string) => set({ email: next }),
  setPassword: (next: string) => set({ password: next }),
}));
