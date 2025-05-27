import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import { convertDateFullAndTime } from "@/functions/dateFunctions";

import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { PiShareFatFill, PiShareFatLight } from "react-icons/pi";
import {
  iPlayerSpotlightResponse,
  useAddPlayerSpotlightComment,
  useGetPlayerSpotlightComments,
  useLikeOrUnlikePlayerSpotlightComments,
} from "@/hooks/player";
import { Loader } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

import CommentContainer from "./CommentContainer";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const PostContainer: FC<{
  post: iPlayerSpotlightResponse;
  userImage: string;
  username: string;
  currentPlayer: boolean;
}> = ({ post, userImage, username, currentPlayer }) => {
  const [comment, setComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [totalComments, setTotalComments] = useState<number>(post.commentCount);
  const [totalLikes, setTotalLikes] = useState<number>(post.likeCount);

  const {
    loading: loadingGetComments,
    success: getCommentSuccess,
    data: postComments,
    get: getComments,
  } = useGetPlayerSpotlightComments(post.id);

  const {
    loading: loadingAddComment,
    success: addCommentSuccess,
    add: addComment,
  } = useAddPlayerSpotlightComment();

  const {
    loading: loadingPostAction,
    success: postActionSuccess,
    action: postAction,
  } = useLikeOrUnlikePlayerSpotlightComments(post.id);

  useEffect(() => {
    if (!loadingAddComment && addCommentSuccess) {
      setComment("");
      setShowComments(false);
      setTotalComments((prev) => prev + 1);
    }
  }, [loadingAddComment, addCommentSuccess]);

  useEffect(() => {
    if (!loadingGetComments && getCommentSuccess) {
      setShowComments(true);
    }
  }, [getCommentSuccess, loadingGetComments]);

  useEffect(() => {
    if (!loadingPostAction && postActionSuccess) {
      setTotalLikes((prev) => prev + 1);
    }
  }, [loadingPostAction, postActionSuccess]);

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-4 bg-white flex flex-col">
      <div className="flex gap-4 h-9">
        <ProfileImageOrTextAvatar
          image={post.userProfilePicUrl}
          name={post.userFullName}
          radius="rounded"
          size="size-9"
        />

        <div className="flex flex-col">
          <h2 className="text-dark text-16-19 font-bold">
            {post.userFullName}
          </h2>
          <p className="text-8-9 text-placeholder ">
            {convertDateFullAndTime(post.dateCreated)}
          </p>
        </div>
      </div>
      <p className="text-12-18 text-dark">{post.text}</p>
      {post.mediaUrls.length > 0 && (
        <Image
          src={post.mediaUrls[0].mediaUrl}
          alt="post image"
          width={300}
          height={100}
          className="w-full rounded-xl object-cover h-48"
        />
      )}
      <div className="w-full text-12-14 text-placeholder justify-end items-center flex gap-3">
        <p>{totalLikes} likes</p>
        <p>{totalComments} comments</p>
      </div>
      <hr className="w-full bg-border-gray" />
      <div className="w-full flex items-center justify-between text-12-14 font-medium text-dark">
        <div
          onClick={() => postAction(true)}
          className="w-fit items-center gap-1 flex cursor-pointer"
        >
          <FaRegHeart className="text-16-19" />
          <p>Like</p>
        </div>
        <div
          className="w-fit items-center gap-1 flex cursor-pointer"
          onClick={() => {
            setShowComments(false);
            getComments();
          }}
        >
          <FaRegComment className="text-16-19" />
          <p>Comments</p>
        </div>
        <div className="w-fit items-center gap-1 flex">
          <PiShareFatLight className="text-16-19" />
          <p>Shares</p>
        </div>
      </div>
      <hr className="w-full bg-border-gray" />
      {loadingGetComments && (
        <div className="w-full h-20 grid place-content-center">
          <Loader color="primary.6" />
        </div>
      )}
      {showComments && postComments.length > 0 && (
        <div className="w-full h-32 gap-4 flex flex-col">
          <div className="w-full justify-between items-center flex">
            <h2 className="text-16-19 text-dark font-semibold">Comments</h2>
            <IoMdClose
              size={20}
              className="text-dark cursor-pointer"
              onClick={() => setShowComments(false)}
            />
          </div>
          <div className="max-h-24 overflow-y-scroll flex flex-col gap-3 scrollbar-thin scrollbar-webkit px-4">
            {postComments.map((pc, i) => {
              return <CommentContainer key={i} comment={pc} />;
            })}
          </div>
        </div>
      )}
      {!currentPlayer && (
        <div className="w-full flex items-center justify-between">
          {userImage ? (
            <Image
              src={userImage}
              alt="poster image"
              className="size-9 rounded"
              width={36}
              height={36}
            />
          ) : (
            <div className="rounded size-9 text-white text-16-19 font-bold bg-primary-2 grid place-content-center">
              {username.substring(0, 1)}
            </div>
          )}
          <input
            className="h-8 rounded w-[calc(100%-6rem)] px-2 bg-[#F5F6FA] text-14-16  placeholder:text-placeholder font-lato text-dark"
            placeholder="What's happening?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            disabled={loadingAddComment}
            onClick={() => {
              const res = comment.trim();
              if (res.length === 0) return;
              addComment({ mediaUrl: "", spotLightPostId: post.id, text: res });
            }}
            className="rounded size-9 bg-primary-2 text-white font-medium text-16-19 grid place-content-center"
          >
            {loadingAddComment ? (
              <Loader color="white.6" size={24} />
            ) : (
              <BsFillSendFill fill="#FFFFFF" size={16} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostContainer;
