"use client";

import Image from "next/image";
import React, { FC, useEffect } from "react";

import {
  useGetCurrentPlayerSpotlights,
  useGetPlayerSpotlights,
  useGetSpecificPlayerSpotlights,
} from "@/hooks/player";
import { Loader } from "@mantine/core";
import { useGlobalData } from "@/stores/globalStore";
import Void from "@/public/images/Void.png";
import { useCurrentUserStore } from "@/stores/userStore";

import PostContainer from "./PostContainer";

const Posts: FC<{ currentPlayer?: boolean; playerEmail?: string }> = ({
  currentPlayer,
  playerEmail,
}) => {
  const refreshPosts = useGlobalData((state) => state.shouldRefreshPosts);
  const userImage = useCurrentUserStore((state) => state.image);
  const username = useCurrentUserStore((state) => state.name);

  const {
    loading: loadingAllSpotlights,
    data: allPosts,
    get: getAllPosts,
  } = useGetPlayerSpotlights();
  const {
    loading: loadingPlayerSpotlights,
    data: playerPosts,
    get: getPlayerPosts,
  } = useGetCurrentPlayerSpotlights();

  const {
    loading: loadingSpecificSpotlight,
    data: specificPosts,
    get: getSpecificPosts,
  } = useGetSpecificPlayerSpotlights();

  useEffect(() => {
    if (currentPlayer !== undefined && currentPlayer) {
      getPlayerPosts();
    } else if (currentPlayer !== undefined && !currentPlayer) {
      getAllPosts();
    } else if (currentPlayer === undefined && playerEmail !== undefined) {
      getSpecificPosts(playerEmail);
    }
  }, [refreshPosts]);

  if (
    loadingAllSpotlights ||
    loadingPlayerSpotlights ||
    loadingSpecificSpotlight
  ) {
    return (
      <div className="w-full grid place-content-center h-80">
        <Loader color="primary.6" />
      </div>
    );
  }

  const posts = currentPlayer
    ? playerPosts
    : playerEmail
    ? specificPosts
    : allPosts;

  if (
    !loadingAllSpotlights &&
    !loadingPlayerSpotlights &&
    !loadingSpecificSpotlight &&
    posts.length === 0
  ) {
    return (
      <div className="w-full h-[30rem] flex flex-col shadow-custom justify-center items-center gap-5 sticky top-6 bg-white rounded-xl">
        <Image
          src={Void}
          alt="no posts"
          width={100}
          height={100}
          className="w-40 h-auto object-cover"
        />
        <h2 className="text-dark text-16-19 font-medium">
          There are no posts here yet
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {posts.map((post, i) => (
        <PostContainer
          key={i}
          post={post}
          username={username}
          userImage={userImage}
          currentPlayer={currentPlayer ?? false}
        />
      ))}
    </div>
  );
};

export default Posts;
