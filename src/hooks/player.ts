"use client";

import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export interface iUpdatePlayerPayload {
  address: string;
  biography: string;
  currentTeam: string;
  dob: string;
  facebookUrl: string;
  fullName: string;
  height: string;
  igUrl: string;
  imageUrl: string | File;
  jerseyNumber: string;
  location: string;
  nationality: string;
  nin: string;
  phone: string;
  position: string;
  preferredFoot: string;
  ticTokUrl: string;
  weight: string;
  xurl: string;
}

export interface iPlayerResponse {
  address: string | null;
  biography: string;
  currentTeam: string;
  dob: string;
  email: string;
  facebookUrl: string | null;
  fullName: string;
  height: string;
  igUrl: string | null;
  imageUrl: string;
  jerseyNumber: string;
  licenceNumber: string;
  location: string;
  nationality: string;
  nin: string;
  phone: string;
  position: string;
  preferredFoot: string;
  ticTokUrl: string | null;
  weight: string;
  xurl: string | null;
}

export interface iCreatePlayerSpotlightPayload {
  mediaUrls: (string | File)[];
  text: string;
}

export interface iPlayerSpotlightResponse {
  id: number;
  text: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  userFullName: string;
  userProfilePicUrl: string;
  dateCreated: string;
  mediaUrls: {
    id: number;
    mediaUrl: string;
    createdDate: string;
  }[];
}

export interface iAddCommentPayload {
  mediaUrl: string;
  spotLightPostId: number;
  text: string;
}

export interface iPostComment {
  id: number;
  text: string;
  userFullName: string;
  userImageUrl: string;
}

export interface iPostActionPayload {
  like: boolean;
  spotLightPostId: number;
}

export interface ImageData {
  id: number;
  mediaUrl: string;
  createdDate: string;
}

export const useGetPlayer = () => {
  const [data, setData] = useState<iPlayerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/player/getProfile",
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

export const useGetPlayerByEmail = () => {
  const [data, setData] = useState<iPlayerResponse>({
    address: "",
    biography: "",
    currentTeam: "",
    dob: "",
    email: "",
    facebookUrl: "",
    fullName: "",
    height: "",
    igUrl: "",
    imageUrl: "",
    jerseyNumber: "",
    licenceNumber: "",
    location: "",
    nationality: "",
    nin: "",
    phone: "",
    position: "",
    preferredFoot: "",
    ticTokUrl: "",
    weight: "",
    xurl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async (email: string) => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      `/api/v1/profile/player/getProfile?playerEmail=${email}`,
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    if (status) {
      setData(data);
    }
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useUpdatePlayer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { requestApi } = useAxios();

  const update = async (payloadToBePosted: Partial<iUpdatePlayerPayload>) => {
    const { status } = await requestApi(
      "/api/v1/profile/player/editProfile",
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

export const useGetPlayerSpotlights = () => {
  const [data, setData] = useState<iPlayerSpotlightResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/spotLights/getPosts?limit=100&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.data.obj as iPlayerSpotlightResponse[]) : []);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error getting the latest posts`,
        icon: "error",
      });
    }
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useGetCurrentPlayerSpotlights = () => {
  const [data, setData] = useState<iPlayerSpotlightResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/spotLights/getUserPosts?limit=100&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.data.obj as iPlayerSpotlightResponse[]) : []);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error getting your posts`,
        icon: "error",
      });
    }
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useGetSpecificPlayerSpotlights = () => {
  const [data, setData] = useState<iPlayerSpotlightResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async (email: string) => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      `/api/v1/spotLights/getUserPostsByScout?limit=100&offset=0&playerMail=${email}`,
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.data.obj as iPlayerSpotlightResponse[]) : []);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error getting your posts`,
        icon: "error",
      });
    }
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const usePostPlayerSpotlight = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: iCreatePlayerSpotlightPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/spotLights/addPost",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);
  };

  return {
    upload,
    loading,
    success,
  };
};

export const useAddPlayerSpotlightComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const add = async (payload: iAddCommentPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/spotLights/addComment",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);
  };

  return {
    add,
    loading,
    success,
  };
};

export const useGetPlayerSpotlightComments = (postId: number) => {
  const [data, setData] = useState<iPostComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      `/api/v1/spotLights/getPostComments?limit=100&offset=0&postId=${postId}`,
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? (data.data.obj as iPostComment[]) : []);
  };

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useLikeOrUnlikePlayerSpotlightComments = (
  spotLightPostId: number
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const action = async (like: boolean) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/api/v1/spotLights/like/increaseOrDecreaseCount",
      "PUT",
      { like, spotLightPostId }
    );
    setLoading(false);
    setSuccess(status);
  };

  return {
    action,
    loading,
    success,
  };
};

export const useGetUserGallery = () => {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/gallery/getUserGallery?limit=100&offset=0",
      "GET"
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj : []);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error getting the latest media`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    data,
    loading,
    success,
    get,
  };
};

export const useGetPlayerNamesList = () => {
  const [data, setData] = useState<
    {
      fullName: string;
      playerUserId: number;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const get = async () => {
    if (loading) return;
    setLoading(true);
    const { data, status } = await requestApi(
      "/api/v1/profile/player/namesList",
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
