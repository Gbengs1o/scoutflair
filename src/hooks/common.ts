"use client";

import { useAxios } from "@/api/base";
import { useState } from "react";
import Swal from "sweetalert2";

export interface iCreateGalleryMedia {
  category: string; // Goals, Assists
  description: string;
  fileName: string;
  mediaUrl: string;
  title: string;
}

export const useUploadPicture = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: File) => {
    if (loading) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("file", payload);

    const { data, status } = await requestApi(
      "/scoutflair/v1/file/picture/upload",
      "POST",
      formData,
      {
        "Content-Type": "multipart-formdata",
      }
    );
    setLoading(false);
    setSuccess(status);
    setData(data.message);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error uploading your picture`,
        icon: "error",
      });
    }
  };

  return {
    loading,
    success,
    data,
    upload,
  };
};

export const useUploadLogo = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: File) => {
    if (loading) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("file", payload);

    const { data, status } = await requestApi(
      "/scoutflair/v1/file/logo/upload",
      "POST",
      formData,
      {
        "Content-Type": "multipart-formdata",
      }
    );
    setLoading(false);
    setSuccess(status);
    setData(data.message);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error uploading your logo`,
        icon: "error",
      });
    }
  };

  return {
    loading,
    success,
    data,
    upload,
  };
};

export const useUploadVideo = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: File) => {
    if (loading) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("file", payload);

    const { data, status } = await requestApi(
      "/scoutflair/v1/file/video/upload",
      "POST",
      formData,
      {
        "Content-Type": "multipart-formdata",
      }
    );
    setLoading(false);
    setSuccess(status);
    setData(data.message);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error uploading your video`,
        icon: "error",
      });
    }
  };

  return {
    loading,
    success,
    data,
    upload,
  };
};

export const useUploadMediaToGallery = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: iCreateGalleryMedia) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      "/api/v1/gallery/createMedia",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);
    setData(data.message);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error uploading your media`,
        icon: "error",
      });
    }
  };

  return {
    loading,
    success,
    data,
    upload,
  };
};

export const useUploadSpotlightImage = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const upload = async (payload: File) => {
    if (loading) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("file", payload);

    const { data, status } = await requestApi(
      "/api/v1/spotLights/media/upload",
      "POST",
      formData,
      {
        "Content-Type": "multipart-formdata",
      }
    );
    setLoading(false);
    setSuccess(status);
    setData(status ? data.data.obj.body.message : null);

    if (!status) {
      Swal.fire({
        title: "Oops...",
        text: `Error uploading your spotlight picture`,
        icon: "error",
      });
    }
  };

  return {
    loading,
    success,
    data,
    upload,
  };
};
