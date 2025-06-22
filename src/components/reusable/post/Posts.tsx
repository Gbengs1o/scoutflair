"use client";

import React, { FC, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import Image from "next/image";
import PostContainer from "./PostContainer";
import { iPlayerSpotlightResponse } from "@/hooks/player"; // Assuming this type is available

// --- FAKE DATA POOL ---
const contentImagePool = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002585_793_4994.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_793_4448.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424-1.png",
];

const avatarImagePool = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002584_793_4991.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_791_1967.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Saudi_arabia_heart_flag_793_4461-1.png",
];

const namePool = [ "Emmanuel Ogundare", "Ogunkoya Dvid", "Getrude Trent", "leo camp", "Sam Kerr", "Kasim Segun", "John Bull", ];

const textPool = [
  "Just finished a great training session! Feeling ready for the next match. #Hustle",
  "What a goal! Can't believe we pulled off that win. Teamwork makes the dream work.",
  "On the road for an away game. Wish us luck! ✈️⚽",
  "Thinking about tactics for the upcoming game. Every detail matters.",
  "It's not just about the goals, it's about the passion for the game. ❤️",
  "Post-match recovery day. Just as important as the training itself.",
];

// --- FAKE POST GENERATOR ---
const generateFakePost = (index: number): iPlayerSpotlightResponse => {
  const hasImage = Math.random() > 0.4; // 60% chance of having an image
  const randomContentImage = contentImagePool[index % contentImagePool.length]; // Cycle through images
  const randomAvatar = avatarImagePool[Math.floor(Math.random() * avatarImagePool.length)];

  return {
    id: `${Date.now()}-${index}`,
    userFullName: namePool[Math.floor(Math.random() * namePool.length)],
    userProfilePicUrl: randomAvatar,
    text: textPool[Math.floor(Math.random() * textPool.length)],
    mediaUrls: hasImage ? [{ mediaUrl: randomContentImage }] : [],
    likeCount: Math.floor(Math.random() * 250),
    commentCount: Math.floor(Math.random() * 50),
    dateCreated: new Date().toISOString(),
    // Add other fields from iPlayerSpotlightResponse with default values if necessary
    isLikedByCurrentUser: false,
  };
};


const Posts: FC = () => {
  // State to hold our generated posts
  const [posts, setPosts] = useState<iPlayerSpotlightResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs on mount and sets an interval to refresh posts
  useEffect(() => {
    // Function to generate a new set of posts
    const createAndSetPosts = () => {
        // We use a Set to ensure we don't use the same content image twice in one batch
        const usedImageIndexes = new Set();
        const newPosts = Array.from({ length: 3 }, (_, i) => {
            let imageIndex;
            do {
                imageIndex = Math.floor(Math.random() * contentImagePool.length);
            } while (usedImageIndexes.has(imageIndex));
            usedImageIndexes.add(imageIndex);
            
            return generateFakePost(imageIndex);
        });
      setPosts(newPosts);
      setIsLoading(false);
    };

    // Initial generation
    createAndSetPosts();

    // Set interval to regenerate posts every 5 seconds
    const intervalId = setInterval(createAndSetPosts, 20000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isLoading) {
    return (
      <div className="w-full grid place-content-center h-80">
        <Loader color="primary.6" />
      </div>
    );
  }

  // A static image for the "current user" commenting
  const currentUserImage = "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422-1.png";
  const currentUsername = "You";

  return (
    <div className="w-full flex flex-col gap-6">
      {posts.map((post) => (
        <PostContainer
          key={post.id} // Use a unique ID for the key
          post={post}
          username={currentUsername}
          userImage={currentUserImage}
          currentPlayer={false} // Assuming the viewer is not the player posting
        />
      ))}
    </div>
  );
};

export default Posts;