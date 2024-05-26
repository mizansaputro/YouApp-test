import { create } from "zustand";

interface RegisterStateInterface {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  setEmail: (next: string) => void;
  setUsername: (next: string) => void;
  setPassword: (next: string) => void;
  setPasswordConfirm: (next: string) => void;
}

export const useRegisterStore = create<RegisterStateInterface>((set) => ({
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
  setUsername: (next: string) => set({ username: next }),
  setEmail: (next: string) => set({ email: next }),
  setPassword: (next: string) => set({ password: next }),
  setPasswordConfirm: (next: string) => set({ passwordConfirm: next }),
}));
