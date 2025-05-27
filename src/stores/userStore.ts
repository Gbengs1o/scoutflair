import { StaticImageData } from "next/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type tUser = {
  role: "SCOUT" | "COACH" | "PLAYER" | "";
  type: string;
  name: string;
  image: string;
};

export type tPlayer = {
  email: string;
  phone: string;

  role: string;
  jersey: number;
  age: number;
  bio: string;
  dob: Date;
  nationality: string;
  foot: string;
  height: number;
  weight: number;
  status: string;

  recommendedName: string;
  recommendedEmail: string;
  recommendedPhone: string;

  fbLink: string;
  igLink: string;
  xLink: string;
  ttLink: string;
};

export type tScout = {
  quote: string;
  career: any;
  experience: string;
  license: string;
  coachingEducation: string;
  coachingStyle: string;
  currentTeam: string;
  email: string;
  placeOfBirth: string;
  phone: string;
  nin: string;
  address: string;
  nationality: string;
  matchNotification: boolean;
  promotion: boolean;
  playerAbsence: boolean;
  emailNotifications: boolean;
};

export const useCurrentUserStore = create<tUser>((set) => ({
  type: "",
  role: "",
  name: "",
  image: "",
}));

export const usePlayerDataStore = create<tPlayer>((set) => ({
  phone: "",
  role: "",
  jersey: 0,
  age: 0,
  bio: "",
  dob: new Date(),
  nationality: "",
  foot: "",
  height: 0,
  weight: 0,
  status: "",
  email: "",

  recommendedName: "",
  recommendedEmail: "",
  recommendedPhone: "",

  fbLink: "",
  igLink: "",
  xLink: "",
  ttLink: "",
}));

export const useScoutDataStore = create<tScout>((set) => ({
  quote: "",
  career: null,
  coachingEducation: "",
  coachingStyle: "",
  currentTeam: "",
  email: "",
  placeOfBirth: "",
  phone: "",
  nin: "",
  license: "",
  experience: "",
  address: "",
  nationality: "",
  matchNotification: false,
  promotion: false,
  playerAbsence: false,
  emailNotifications: false,
}));

export function clearUserData() {
  useCurrentUserStore.setState({
    type: "",
    role: "",
    name: "",
    image: "",
  });

  usePlayerDataStore.setState({
    phone: "",
    role: "",
    jersey: 0,
    age: 0,
    bio: "",
    dob: new Date(),
    nationality: "",
    foot: "",
    height: 0,
    weight: 0,
    status: "",
    email: "",

    recommendedName: "",
    recommendedEmail: "",
    recommendedPhone: "",

    fbLink: "",
    igLink: "",
    xLink: "",
    ttLink: "",
  });

  useScoutDataStore.setState({
    quote: "",
    career: null,
    coachingEducation: "",
    coachingStyle: "",
    currentTeam: "",
    email: "",
    placeOfBirth: "",
    phone: "",
    experience: "",
    license: "",
    nin: "",
    address: "",
    nationality: "",
    matchNotification: false,
    promotion: false,
    playerAbsence: false,
    emailNotifications: false,
  });
}
