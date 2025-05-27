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
import { useCurrentUserStore } from "@/stores/userStore";
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

  const userImage = useCurrentUserStore((state) => state.image);
  const username = useCurrentUserStore((state) => state.name);

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
    <div className="w-full h-fit gap-3 sm:gap-5 bg-white rounded-xl shadow-custom flex flex-col px-3 sm:px-6 py-3 sm:py-4">
      {/* Desktop Layout */}
      <div className="hidden sm:flex w-full items-center justify-between">
        <ProfileImageOrTextAvatar
          image={userImage}
          name={username}
          radius="rounded"
          size="size-9"
        />
        <div className="relative w-[calc(100%-8rem)]">
          <input
            className="h-8 rounded w-full pr-11 pl-4 bg-[#F5F6FA] text-14-16 placeholder:text-placeholder font-lato text-dark"
            placeholder="What's happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <FaImage
            onClick={() => fileRef.current?.click()}
            className="absolute inset-y-1/2 -translate-y-1/2 right-4 text-lg cursor-pointer text-placeholder hover:text-primary-2 transition-colors"
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
          className="w-16 px-4 h-10 rounded bg-primary-2 text-white font-medium text-16-19 grid place-content-center hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {loading || loadingUploadImage ? (
            <Loader color="white.6" size={24} />
          ) : (
            "Post"
          )}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden w-full flex flex-col gap-3">
        {/* User Profile Row */}
        <div className="flex items-center gap-3">
          <ProfileImageOrTextAvatar
            image={userImage}
            name={username}
            radius="rounded"
            size="size-8"
          />
          <span className="text-sm font-medium text-dark truncate flex-1">
            {username}
          </span>
        </div>

        {/* Input Row */}
        <div className="relative w-full">
          <textarea
            className="w-full min-h-[80px] max-h-[120px] rounded-lg px-4 py-3 bg-[#F5F6FA] text-sm placeholder:text-placeholder font-lato text-dark resize-none border-none outline-none"
            placeholder="What's happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            rows={3}
          />
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <FaImage className="text-base text-placeholder" />
            <span className="text-xs text-placeholder">Photo</span>
          </button>

          <button
            disabled={loading || post.trim().length === 0}
            onClick={() => {
              if (post.trim().length === 0) return;
              if (files.length !== 0) {
                uploadImage(files[0]);
              } else {
                upload({ text: post, mediaUrls: [] });
              }
            }}
            className="px-4 py-2 rounded-lg bg-primary-2 text-white font-medium text-sm grid place-content-center hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px]"
          >
            {loading || loadingUploadImage ? (
              <Loader color="white.6" size={16} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>

      {/* Image Preview - Same for both layouts */}
      {fileImages.length > 0 && (
        <div className="overflow-hidden relative w-full">
          <Image
            src={fileImages[0]}
            width={100}
            height={100}
            className="w-full h-32 sm:h-36 rounded-lg object-cover brightness-50"
            alt="post image"
          />
          <button
            onClick={() => {
              setFileImages([]);
              setFiles([]);
            }}
            className="absolute right-2 top-2 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
          >
            <IoMdClose
              size={16}
              className="text-white"
            />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
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