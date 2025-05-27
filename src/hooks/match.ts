"use client";

import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export interface iMatchResponse {
  awayTeam: string;
  awayTeamHighlight: string;
  awayTeamLogoUrl: string;
  awayTeamScore: number;
  competition: string;
  date: string;
  dateTime: string;
  homeTeam: string;
  homeTeamHighlight: string;
  homeTeamLogoUrl: string;
  homeTeamScore: number;
  matchName: string;
  referee: string;
  stadiumPitch: string;
}

export interface iCreateMatchPayload
  extends Omit<
    iMatchResponse,
    | "awayTeamHighlight"
    | "awayTeamScore"
    | "homeTeamHighlight"
    | "homeTeamScore"
    | "matchName"
    | "stadiumPitch"
    | "date"
  > {
  pitch: string;
}

export interface iUpdateMatchPayload
  extends Omit<
    iMatchResponse,
    | "awayTeam"
    | "awayTeamLogoUrl"
    | "competition"
    | "date"
    | "dateTime"
    | "homeTeam"
    | "homeTeamLogoUrl"
    | "referee"
    | "stadiumPitch"
  > {}

export const useGetUpcomingMatches = () => {
  const [data, setData] = useState<iMatchResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/matches/upcoming/getMatches?limit=1000&offset=0",
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

export const useGetUpcomingMatchesCount = () => {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/matches/upcoming/getMatchesCount",
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

export const useGetPreviousMatches = () => {
  const [data, setData] = useState<iMatchResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/matches/previous/getMatches?limit=1000&offset=0",
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

export const useCreateMatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const create = async (payload: iCreateMatchPayload) => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/matches/addMatches",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);

    Swal.fire({
      title: status ? "Success!" : "Oops!",
      text: status
        ? "Upcoming match created successfully!"
        : "An error occurred. Please try again",
      icon: status ? "success" : "error",
    });
  };

  return {
    loading,
    success,
    create,
  };
};

export const useUpdateMatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const update = async (payload: iUpdateMatchPayload) => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/matches/updateMatches",
      "POST",
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
