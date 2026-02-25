"use client";
import { useMemo, useState } from "react";
import { Activity, Review } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useOthersActivity } from "@/app/hooks";
import { Button } from "../general/Button";
import { ProperReviewCard } from "./ProperReviewCard";

type ActivityPageProps = {
  user: {
    username: string;
  };
};

type ActivityFilterState = "incoming" | "friends" | "you";

const extractReviewFromActivity = (activity: Activity): Review | null => {
  const rd = activity.review_details;
  if (!rd) return null;

  return {
    id: rd.id,
    album_discogs_id: rd.album.discogs_id,
    username: rd.user.username,
    user_avatar: rd.user.avatar ?? "/default-avatar.png",
    user_is_staff: rd.user.is_staff ?? false,
    rating: rd.rating,
    content: rd.content,
    created_at: activity.created_at,
    album_title: rd.album.title,
    album_artist: rd.album.artist,
    album_cover: rd.album.cover_url ?? "",
    album_year: rd.album.year,
    is_pinned: false,
    likes_count: rd.likes_count ?? 0,
    is_liked_by_user: rd.is_liked_by_user,
    comments_count: rd.comments_count ?? 0,
    user_genres: rd.user_genres,
  };
};

export default function ActivityPage({ user }: ActivityPageProps) {
  const { t } = useTranslation("activity");

  const [filter, setFilter] = useState<ActivityFilterState>("incoming");

  const { data: youActivity = [], isLoading: isLoadingYou } = useOthersActivity(
    user.username,
    "you",
  );
  const { data: friendActivity = [], isLoading: isLoadingFriends } =
    useOthersActivity(user.username, "friends");

  const { data: followingActivity = [], isLoading: isLoadingFollowing } =
    useOthersActivity(user.username, "incoming");

  console.log("[ActivityPage] Render", {
    filter,
    youCount: youActivity.length,
    friendsCount: friendActivity.length,
    followingCount: followingActivity.length,
    isLoading: { isLoadingYou, isLoadingFriends, isLoadingFollowing },
  });

  // Derive filtered activities dynamically using useMemo
  const filteredActivities = useMemo(() => {
    switch (filter) {
      case "you":
        return youActivity;
      case "friends":
        return friendActivity;
      case "incoming":
      default:
        return followingActivity;
    }
  }, [youActivity, friendActivity, followingActivity, filter]);

  return (
    <div className="flex flex-col border-black border-2 bg-white rounded-xl pb-10 h-auto px-9 py-9 w-full">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="another-heading1 text-[42px]">
          {/* {t("reviews.activity")} */}
          Activity
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setFilter("incoming")}
            isSelected={filter === "incoming"}
          >
            Following
          </Button>
          <Button
            onClick={() => setFilter("friends")}
            isSelected={filter === "friends"}
          >
            Friends
          </Button>
          <Button
            onClick={() => setFilter("you")}
            isSelected={filter === "you"}
          >
            You
          </Button>
        </div>
      </div>

      {/* Scrollable list of cards */}
      <div className="overflow-y-auto min-h-[550px] max-h-[700px] pr-2 flex flex-col gap-4">
        {(isLoadingYou || isLoadingFriends || isLoadingFollowing) && (
          <p className="text-gray-500 italic">Loading activity...</p>
        )}
        {!isLoadingYou &&
          !isLoadingFriends &&
          !isLoadingFollowing &&
          filteredActivities.length === 0 && (
            <p className="text-gray-500 italic">
              No activity found for this filter.
            </p>
          )}
        {filteredActivities.length > 0 &&
          filteredActivities.map((activity: Activity) => {
            const review = extractReviewFromActivity(activity);
            if (!review) return null;
            return (
              <ProperReviewCard
                key={activity.id}
                review={review}
                username={activity.user.username}
                setOpen={() => {}}
              />
            );
          })}
      </div>
    </div>
  );
}
