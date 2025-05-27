"use client";

import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";

import { iPlayerResponse } from "./player";
import Swal from "sweetalert2";

export interface iUpdateScoutPayload {
  address: string;
  career: string;
  coachingEducation: string;
  coachingStyle: string;
  currentTeam: string;
  dob: string;
  email: string;
  experience: string;
  fullName: string;
  imageUrl: string;
  licenceNumber: string;
  nationality: string;
  nin: string;
  phone: string;
  placeOfBirth: string;
  quote: string;
}

export interface iActivityFeedResponse {
  playerUserId: number;
  userImageUrl: string;
  userFullName: string;
  message: string;
  createdDate: string;
}

export interface iScoutResponse {
  quote: string;
  career: any;
  coachingEducation: string;
  coachingStyle: string;
  currentTeam: string;
  email: string;
  experience: string;
  fullName: string;
  placeOfBirth: string;
  phone: string;
  nin: string;
  address: string;
  nationality: string;
  imageUrl: string;
  matchNotification: boolean;
  promotion: boolean;
  playerAbsence: boolean;
  emailNotifications: boolean;
}

export interface iKeyEditMetricsPayload {
  aerialDuels: number;
  assist: number;
  crosses: number;
  dribbles: number;
  fowlsWon: number;
  goals: number;
  interceptions: number;
  minutes: number;
  playerId: number;
  redCards: number;
  yellowCards: number;
}

export interface iEditPlayerTraitsMetricsPayload {
  agility: number;
  composure: number;
  leader: number;
  playerId: number;
  speed: number;
  stamina: number;
  tacticalAwareness: number;
  workRate: number;
}

export interface iEditSkillMetricsPayload {
  accuracy: number;
  fitness: number;
  freeKicks: number;
  header: number;
  longShots: number;
  oneToOne: number;
  playerId: number;
  shotPower: number;
  skillAerialDuels: number;
  skillDribbling: number;
}

export interface iCreateScoutReportPayload {
  injuryHistory: string;
  playerId: number;
  scoutComments: string;
  strength: string;
  weakness: string;
}

export interface iScoutPlayersResponse {
  age: number;
  appearances: number;
  assists: number;
  currentTeam: string;
  dob: string;
  email: string;
  fullName: string;
  imageUrl: string;
  goals: number;
  height: string;
  jerseyNumber: string;
  nationality: string;
  playerId: number;
  position: string;
  preferredFoot: string;
  weight: string;
}

export interface iPlayerProspect {
  playerId: number;
  playerFullName: string;
  playerImageUrl: string;
  playerGA: number;
}

export interface iPlayerFullDetails {
  id: number;
  player: number;
  scout: number;
  injuryHistory: string;
  email: string;
  nationality: string;
  goals: number;
  assist: number;
  yellowCards: number;
  redCards: number;
  fowlsWon: number;
  aerialDuels: number;
  crosses: number;
  dribbles: number;
  interceptions: number;
  minutes: number;
  appearances: number;
  longShots: number;
  freeKicks: number;
  skillAerialDuels: number;
  skillDribbling: number;
  oneToOne: number;
  header: number;
  fitness: number;
  accuracy: number;
  shotPower: number;
  speed: number;
  stamina: number;
  leader: number;
  workRate: number;
  composure: number;
  agility: number;
  tacticalAwareness: number;
  strength: string;
  weakness: string;
  scoutComments: string;
  fullName: string;
  currentTeam: string;
  imageUrl: string;
  jerseyNumber: string;
  dob: string;
  position: string;
  preferredFoot: string;
  height: string;
  weight: string;
  age: number;
  datecreated: string;
}

export const useGetScout = () => {
  const [data, setData] = useState<iScoutResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getScoutProfile",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data : null);
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useGetScoutsPlayers = () => {
  const [data, setData] = useState<iScoutPlayersResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getScoutPlayers?limit=1000&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : []);
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
  };
};

export const useGetScoutsPlayerDetails = () => {
  const [data, setData] = useState<iPlayerFullDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async (playerId: string | number) => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      `/api/v1/profile/scout/getScoutPlayers/fullDetails?playerId=${playerId}`,
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : null);
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useGetPlayers = () => {
  const [data, setData] = useState<iPlayerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getPlayers?limit=1000&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data : []);
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
  };
};

export const useGetScoutActivityFeed = () => {
  const [data, setData] = useState<iActivityFeedResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getActivityFeed?limit=1000&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : []);
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
  };
};

export const useGetScoutPlayerProspects = () => {
  const [data, setData] = useState<iPlayerProspect[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getScoutPlayerProspects",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : []);
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
  };
};

export const useGetScoutPlayerMetrics = () => {
  const [data, setData] = useState<{
    imageUrls: string[];
    playerScoutedNumber: number;
  }>({
    imageUrls: [],
    playerScoutedNumber: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/scout/getScoutPlayerMetrics",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : []);
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
  };
};

export const useEditKeyMetrics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const edit = async (payload: iKeyEditMetricsPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/profile/scout/editKeyMetrics",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    edit,
  };
};

export const useEditPlayerTraitsMetrics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const edit = async (payload: iEditPlayerTraitsMetricsPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/profile/scout/editPlayerTraitsMetrics",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    edit,
  };
};

export const useEditSkillMetrics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const edit = async (payload: iEditSkillMetricsPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/profile/scout/editSkillMetrics",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    edit,
  };
};

export const useAddPlayerToProspect = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const add = async (playerUserId: number) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/profile/scout/addPlayerToProspect",
      "POST",
      { playerUserId }
    );

    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    add,
  };
};

export const useCreateScoutReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const create = async (payload: iCreateScoutReportPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/profile/scout/createNewScoutReport",
      "POST",
      payload
    );

    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    create,
  };
};

export const useCreateScoutTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const { requestApi } = useAxios();

  const create = async (playerUserId: number) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      "/api/v1/profile/scout/createNewScoutTask",
      "POST",
      { playerUserId }
    );

    setLoading(false);
    setSuccess(status);
    setData(data);
  };

  return {
    loading,
    success,
    create,
    data,
  };
};

export const useUpdateScout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const update = async (payloadToBePosted: Partial<iUpdateScoutPayload>) => {
    const { status } = await requestApi(
      "/api/v1/profile/scout/editProfile",
      "POST",
      payloadToBePosted
    );
    setLoading(false);
    setSuccess(status);

    Swal.fire({
      title: status ? "Congratulations" : "Oops...",
      text: status
        ? "Your profile has been updated"
        : `Error updating your profile`,
      icon: status ? "success" : "error",
    });
  };

  return {
    loading,
    success,
    update,
  };
};
