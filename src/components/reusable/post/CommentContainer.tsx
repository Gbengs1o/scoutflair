import Image from "next/image";
import React, { FC } from "react";
import { iPostComment } from "@/hooks/player";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const CommentContainer: FC<{ comment: iPostComment }> = ({ comment }) => {
  return (
    <div className="w-full flex gap-2">
      <ProfileImageOrTextAvatar
        image={comment.userImageUrl}
        name={comment.userFullName}
        radius="rounded"
        size="size-6"
        text="text-10-12"
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-dark text-12-14 font-bold">
          {comment.userFullName}
        </h2>
        <p className="text-dark text-10-15">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentContainer;
