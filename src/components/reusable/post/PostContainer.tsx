import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { convertDateFullAndTime } from "@/functions/dateFunctions";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
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

// NOTE: The data-fetching hooks below will not work without a real backend.
// They are kept here to maintain the component's structure, but the simulation
// relies on local state for likes and comments.

const PostContainer: FC<{
  post: iPlayerSpotlightResponse;
  userImage: string;
  username: string;
  currentPlayer: boolean;
}> = ({ post, userImage, username, currentPlayer }) => {
  const [comment, setComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  
  // Initialize local state from props to allow for UI interaction
  const [totalComments, setTotalComments] = useState<number>(post.commentCount);
  const [totalLikes, setTotalLikes] = useState<number>(post.likeCount);

  // Reset local state when the post prop changes (due to the 5-second refresh)
  useEffect(() => {
    setTotalComments(post.commentCount);
    setTotalLikes(post.likeCount);
    setShowComments(false); // Hide comments on post refresh
  }, [post]);

  // Mock hooks for UI interaction without a backend
  const handleAddComment = () => {
    const res = comment.trim();
    if (res.length === 0) return;
    console.log("Adding comment:", { spotLightPostId: post.id, text: res });
    setTotalComments((prev) => prev + 1);
    setComment("");
  };

  const handleLike = () => {
    console.log("Liking post:", post.id);
    setTotalLikes((prev) => prev + 1);
  };

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-4 bg-white flex flex-col transition-opacity duration-500 ease-in-out">
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
      
      {/* --- CONDITIONAL IMAGE RENDERING --- */}
      {post.mediaUrls.length > 0 && (
        <div className="w-full rounded-xl overflow-hidden">
          <Image
            src={post.mediaUrls[0].mediaUrl}
            alt="post content"
            width={500} // Provide base dimensions for aspect ratio
            height={300}
            className="w-full h-auto object-cover"
            priority={true} // Helps load visible images faster
          />
        </div>
      )}

      <div className="w-full text-12-14 text-placeholder justify-end items-center flex gap-3">
        <p>{totalLikes} likes</p>
        <p>{totalComments} comments</p>
      </div>
      <hr className="w-full bg-border-gray" />
      <div className="w-full flex items-center justify-between text-12-14 font-medium text-dark">
        <div
          onClick={handleLike}
          className="w-fit items-center gap-1 flex cursor-pointer"
        >
          <FaRegHeart className="text-16-19" />
          <p>Like</p>
        </div>
        <div
          className="w-fit items-center gap-1 flex cursor-pointer"
          onClick={() => setShowComments(!showComments)}
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
      {showComments && (
        <div className="w-full h-auto gap-4 flex flex-col">
          <div className="w-full justify-between items-center flex">
            <h2 className="text-16-19 text-dark font-semibold">Comments</h2>
            <IoMdClose
              size={20}
              className="text-dark cursor-pointer"
              onClick={() => setShowComments(false)}
            />
          </div>
          {/* Comment list would go here. For this demo, we'll just show the input. */}
        </div>
      )}
      {!currentPlayer && (
        <div className="w-full flex items-center justify-between">
          <Image
            src={userImage}
            alt="current user avatar"
            className="size-9 rounded"
            width={36}
            height={36}
          />
          <input
            className="h-8 rounded w-[calc(100%-6rem)] px-2 bg-[#F5F6FA] text-14-16 placeholder:text-placeholder font-lato text-dark"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="rounded size-9 bg-primary-2 text-white font-medium text-16-19 grid place-content-center"
          >
            <BsFillSendFill fill="#FFFFFF" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostContainer;