"use client"; // Only if using App Router
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  useCurrentUserStore,
  usePlayerDataStore,
  useScoutDataStore,
} from "../stores/userStore";

import { iPlayerResponse, useGetPlayer } from "@/hooks/player";
import { iScoutResponse, useGetScout } from "@/hooks/scout";

import { getYearDifference } from "../functions/dateFunctions";
import { Loader } from "@mantine/core";

export const setPlayerData = (player: iPlayerResponse | null) => {
  const date: string = player?.dob!;
  useCurrentUserStore.setState({
    role: "PLAYER",
    name: player?.fullName,
    image: player?.imageUrl,
  });

  const dob = new Date(date);
  const years = getYearDifference(new Date(), dob);

  usePlayerDataStore.setState({
    role: player?.position,
    age: years,
    bio: player?.biography,
    dob: dob,
    phone: player?.phone,
    email: player?.email,
    nationality: player?.nationality,
    foot: player?.preferredFoot,
    height: Number(player?.height),
    weight: Number(player?.weight),
    recommendedName: "",
    recommendedEmail: "",
    recommendedPhone: "",
    jersey: Number(player?.jerseyNumber),
    status: "",
    fbLink: player?.facebookUrl ?? "",
    igLink: player?.igUrl ?? "",
    xLink: player?.xurl ?? "",
    ttLink: player?.ticTokUrl ?? "",
  });
};

export const setScoutData = (scout: iScoutResponse | null) => {
  useCurrentUserStore.setState({
    role: "SCOUT",
    name: scout?.fullName,
    image: scout?.imageUrl,
  });

  useScoutDataStore.setState({
    quote: scout?.quote,
    career: scout?.career,
    coachingEducation: scout?.coachingEducation,
    coachingStyle: scout?.coachingStyle,
    currentTeam: scout?.currentTeam,
    email: scout?.email,
    placeOfBirth: scout?.placeOfBirth,
    phone: scout?.phone,
    nin: scout?.nin,
    address: scout?.address,
    nationality: scout?.nationality,
    matchNotification: scout?.matchNotification,
    promotion: scout?.promotion,
    playerAbsence: scout?.playerAbsence,
    emailNotifications: scout?.emailNotifications,
  });
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const {
    data: playerResponse,
    get: getPlayer,
    success: getPlayerSuccess,
    loading: loadingPlayer,
  } = useGetPlayer();

  const {
    data: scoutResponse,
    get: getScout,
    success: getScoutSuccess,
    loading: loadingScout,
  } = useGetScout();

  const isOtherPage = () => {
    const current = pathName.split("/")[1];
    return current !== "dashboard";
  };

  useEffect(() => {
    const type = determineUser();
    if (isOtherPage()) return;

    if (type === 0) {
      getPlayer();
    } else if (type === 1) {
      getScout();
    }
  }, []);

  const determineUser = () => {
    const current = pathName.split("/")[2];

    if (current === "player") {
      return 0;
    } else if (current === "scout") {
      return 1;
    }
    return -1;
  };

  useEffect(() => {
    if (!loadingPlayer && getPlayerSuccess) {
      setPlayerData(playerResponse);
    }
  }, [loadingPlayer, playerResponse, getPlayerSuccess]);

  useEffect(() => {
    if (!loadingScout && getScoutSuccess) {
      setScoutData(scoutResponse);
    }
  }, [loadingScout, scoutResponse, getScoutSuccess]);

  if (isOtherPage()) {
    return <>{children}</>;
  }

  if (loadingPlayer || loadingScout) {
    return (
      <div className="w-full h-[100vh] bg-white grid place-content-center">
        <Loader color="primary.6" />
      </div>
    );
  }

  return <>{children}</>;
}
