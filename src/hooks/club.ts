"use client";

import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";

export interface iClubResponse {
  address: "string";
  completedCount: 0;
  country: "string";
  dateCreated: "2024-10-03T13:21:08.709Z";
  description: "string";
  email: "string";
  establishmentsType: "string";
  founded: "2024-10-03T13:21:08.709Z";
  graduatedCount: 0;
  id: 0;
  imageUrl: "string";
  latitude: "string";
  lga: "string";
  logoUrl: "string";
  longitude: "string";
  lostCount: 0;
  name: "string";
  phone: "string";
  playersCount: 0;
  principalOrCoach: "string";
  state: "string";
  totalMatches: 0;
  website: "string";
  winCount: 0;
}

export interface iModifyClubPayload
  extends Omit<
    iClubResponse,
    | "id"
    | "imageUrl"
    | "logoUrl"
    | "dateCreated"
    | "establishmentsType"
    | "graduatedCount"
    | "totalMatches"
    | "principalOrCoach"
  > {
  coach: string;
}

export const useGetClubs = () => {
  const [data, setData] = useState<iClubResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/est/fc/getFootballClubs?limit=1000&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.content as iClubResponse[]) : []);
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

export const useClubsCount = () => {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/est/fc/getFootballClubsCount",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.count : 0);
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

export const useCreateClub = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const create = async (payload: iModifyClubPayload) => {
    if (loading) return;
    setLoading(true);
    const { status } = await requestApi(
      "/api/v1/est/fc/addFootballClub",
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

export const useUpdateClub = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const update = async (payload: iModifyClubPayload) => {
    if (loading) return;
    setLoading(true);
    const { status } = await requestApi(
      "/api/v1/est/fc/editFootballClub",
      "PUT",
      payload
    );
    setLoading(false);
    setSuccess(status);
  };

  return {
    loading,
    success,
    update,
  };
};
