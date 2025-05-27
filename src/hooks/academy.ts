"use client";

import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";

export interface iAcademyResponse {
  address: string;
  completedCount: number;
  country: string;
  dateCreated: string;
  description: string;
  email: string;
  establishmentsType: string;
  founded: string;
  graduatedCount: number;
  id: number;
  imageUrl: string;
  latitude: string;
  lga: string;
  logoUrl: string;
  longitude: string;
  lostCount: number;
  name: string;
  phone: string;
  playersCount: number;
  principalOrCoach: string;
  state: string;
  totalMatches: number;
  website: string;
  winCount: number;
  rating: number;
}

export interface iModifyAcademyPayload
  extends Omit<
    iAcademyResponse,
    | "dateCreated"
    | "establishmentsType"
    | "id"
    | "principalOrCoach"
    | "completedCount"
    | "logoUrl"
    | "country"
    | "website"
  > {
  principal: string;
}

export const useGetAcademies = () => {
  const [data, setData] = useState<iAcademyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/est/academy/getAcademies?limit=1000&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.content as iAcademyResponse[]) : []);
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

export const useAcademiesCount = () => {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/est/academy/getAcademiesCount",
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

export const useCreateAcademy = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const create = async (payload: iModifyAcademyPayload) => {
    if (loading) return;
    setLoading(true);
    const { status } = await requestApi(
      "/api/v1/est/academy/addAcademy",
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

export const useUpdateAcademy = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const update = async (payload: iModifyAcademyPayload) => {
    if (loading) return;
    setLoading(true);
    const { status } = await requestApi(
      "/api/v1/est/academy/editAcademy",
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
