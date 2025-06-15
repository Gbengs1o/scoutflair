"use client";

import React, { useState, useEffect, useRef, FC } from "react";
import { Loader } from "@mantine/core";

import { IoMdClose } from "react-icons/io";
import { usePostPlayerSpotlight } from "@/hooks/player";
import { useGlobalData } from "@/stores/globalStore";

import { FaImage } from "react-icons/fa";

import Image from "next/image";
import { useUploadSpotlightImage } from "@/hooks/common";
import Swal from "sweetalert2";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const CreateNewPost = () => {
  const [post, setPost] = useState<string>("");
  const { upload, loading, success } = usePostPlayerSpotlight();
  const {
    loading: loadingUploadImage,
    data: uploadedUrl,
    upload: uploadImage,
    success: uploadedImage,
  } = useUploadSpotlightImage();

  const refreshPosts = useGlobalData((state) => state.refreshPosts);
  const fileRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [fileImages, setFileImages] = useState<string[]>([]);

  // Removed the lines fetching user image and name from the store
  // as they are now hardcoded below.

  useEffect(() => {
    if (!loading && success) {
      setPost("");
      setFiles([]);
      setFileImages([]);
      refreshPosts();
    }
  }, [loading, success]);

  useEffect(() => {
    if (!loadingUploadImage && uploadedImage) {
      if (uploadedUrl) {
        upload({ text: post, mediaUrls: [uploadedUrl] });
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  }, [loadingUploadImage, uploadedImage]);

  return (
    <div className="w-full h-fit gap-5 bg-white rounded-xl shadow-custom flex flex-col px-6 py-4">
      <div className="w-full flex items-center justify-between">
        <ProfileImageOrTextAvatar
          image="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_793_4448.png"
          name="Player One"
          radius="rounded"
          size="size-9"
        />
        <div className="relative w-[calc(100%-8rem)]">
          <input
            className="h-8 rounded w-full pr-11 pl-4 bg-[#F5F6FA] text-14-16  placeholder:text-placeholder font-lato text-dark"
            placeholder="What's happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <FaImage
            onClick={() => fileRef.current?.click()}
            className="absolute inset-y-1/2 -translate-y-1/2 right-4 text-lg cursor-pointer text-placeholder"
          />
        </div>

        <button
          disabled={loading}
          onClick={() => {
            if (post.trim().length === 0) return;
            if (files.length !== 0) {
              uploadImage(files[0]);
            } else {
              upload({ text: post, mediaUrls: [] });
            }
          }}
          className="w-16 px-4 h-10 rounded bg-primary-2 text-white font-medium text-16-19 grid place-content-center"
        >
          {loading || loadingUploadImage ? (
            <Loader color="white.6" size={24} />
          ) : (
            "Post"
          )}
        </button>
      </div>
      {fileImages.length > 0 && (
        <div className="overflow-hidden relative w-full">
          <Image
            src={fileImages[0]}
            width={100}
            height={100}
            className="w-full h-36 rounded object-cover brightness-50"
            alt="post image"
          />
          <IoMdClose
            size={16}
            className="cursor-pointer text-white absolute right-2 top-1"
            onClick={() => {
              setFileImages([]);
              setFiles([]);
            }}
          />
        </div>
      )}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => {
          if (!e.target.files) return;
          setFiles(Array.from(e.target.files));

          for (let i = 0; i < e.target.files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = () => {
              if (typeof reader.result === "string") {
                setFileImages([reader.result]);
              }
            };
          }
        }}
      />
    </div>
  );
};

export default CreateNewPost;