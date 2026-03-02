export interface User {
  id: number;
  username: string;
  email?: string;
  name?: string;
  display_name: string;
  bio?: string;
  location?: string;
  avatar?: string;
  banner?: string; // Profile banner image URL
  favorite_genres?: Genre[];
  most_reviewed_genres?: Genre[]; // Includes count field
  follower_count: number;
  following_count: number;
  review_count?: number;
  pinned_reviews?: Review[];
  is_following?: boolean;
  is_staff?: boolean;
  favorite_albums: FavoriteAlbum[];
}

export interface FavoriteAlbum {
  id: string; // UUID
  title: string;
  artist: string;
  year?: number;
  cover_url?: string;
  discogs_id: string;
  user_review_id?: number; // Review ID if user has reviewed this album
  user_rating?: number; // User's rating for this album (1-10)
  user_review_content?: string; // User's review content (truncated to 100 chars)
}

export interface Genre {
  id: number;
  name: string;
  count?: number; // Number of reviews with this genre (only present in most_reviewed_genres)
}

export interface Album {
  id: string; // UUID
  title: string;
  artist: string;
  year?: number;
  cover_url?: string;
  cover_image?: string;
  artist_photo_url?: string; // Artist photo from Discogs
  genres?: Genre[]; // Album genres (not user-assigned)
  discogs_id: string;
  discogs_genres?: string[]; // Original genres from Discogs
  discogs_styles?: string[]; // Original styles from Discogs
  tracklist?: Array<{
    position: string;
    title: string;
    duration?: string;
    artists?: Array<{ name: string }>;
  }>;
  credits?: Array<{
    name: string;
    role: string;
  }>;
  created_at?: string; // ISO datetime
  updated_at?: string; // ISO datetime
  user_review_id?: number; // If user has reviewed this album
  user_rating?: number; // User's rating (1-10)
}

export interface Review {
  id: number;
  username: string;
  user_avatar: string | null;
  user_is_staff: boolean;
  rating: number;
  content: string;
  created_at: string;
  album_title: string;
  album_artist: string;
  album_cover: string | null;
  album_artist_photo: string | null; // Artist photo URL from Discogs
  album_year?: number;
  album_discogs_id: string; // Discogs ID of the album
  is_pinned: boolean;
  likes_count: number;
  is_liked_by_user: boolean;
  comments_count: number;
  user_genres: Genre[];
}

export interface AlbumDetailData {
  album: Album; // Full album details with all fields from AlbumSerializer
  reviews: Review[];
  review_count: number;
  average_rating: number | null;
  exists_in_db: boolean;
  cached: boolean;
}

// Alias for AlbumData - same structure as Album
export type AlbumData = Album;

export interface Comment {
  id: number;
  username: string; // User's username
  user_avatar: string | null; // User's avatar URL
  content: string;
  created_at: string;
}

export interface UserData {
  id: number;
  username: string;
  avatar: string | null;
  is_staff?: boolean;
}

export interface SearchResult {
  id: string; // Discogs ID
  title: string;
  artist: string;
  year?: number;
  cover_image?: string;
  thumb?: string;
  genre?: string[];
  style?: string[];
  artist_photo_url?: string;
  discogs_id?: string; // Alias for id
}

export interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  bio?: string;
  follower_count: number;
  following_count: number;
  review_count: number;
  is_following: boolean;
  is_staff?: boolean;
}

export interface Activity {
  id: number;
  activity_type: "review_liked" | "review_created" | "review_pinned" | "user_followed" | "comment_created";
  user: UserData;
  target_user: UserData | null;
  review_details: ReviewActivityDetails | null;
  comment_details: CommentActivityDetails | null;
  created_at: string;
}

export interface ReviewActivityDetails {
  id: number;
  rating: number;
  content: string; // Truncated to 100 chars
  is_liked_by_user: boolean;
  likes_count: number;
  comments_count: number;
  user_genres: Genre[];
  album: {
    title: string;
    artist: string;
    year?: number;
    cover_url: string | null;
    discogs_id: string;
  };
  user: UserData;
}

export interface CommentActivityDetails {
  id: number;
  content: string;
  created_at: string;
}

export interface NewReleases {
  albumName: string;
  artistName: string;
  coverUrl?: string;
  year?: number;
  discogsId?: string;
}

export interface TopRated {
  albumName: string;
  artistName: string;
  coverUrl?: string;
  rating?: number;
  discogsId?: string;
}

// ============= List Types =============

export interface List {
  id: number;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  user: UserData;
  items: ListItem[];
  album_count: number;
  likes_count: number;
  is_liked_by_user: boolean;
}

export interface ListItem {
  id: number;
  album: Album;
  order: number;
  added_at: string;
}

export interface ListSummary {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  user: UserData;
  album_count: number;
  likes_count: number;
  first_albums: Array<{
    id: string;
    title: string;
    artist: string;
    cover_url: string | null;
  }>;
}

// ============= This Day In History =============

export interface ThisDayInHistory {
  id: number;
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  year?: number;
}

// ============= Like & Follow Response Types =============

export interface FollowResponse {
  action: "followed" | "unfollowed";
  target_user: string;
  following_count: number;
  followers_count: number;
}

export interface ReviewLikeResponse {
  action: "liked" | "unliked";
  like_count: number;
}

export interface ListLikeResponse {
  action: "liked" | "unliked";
  like_count: number;
}

// ============= Likes List Response =============

export interface LikesListResponse {
  users: UserData[];
  total_count: number;
  has_more: boolean;
  next_offset: number | null;
  review?: Review; // Optional, only if include_review=true
}

export interface ListLikesResponse {
  users: UserData[];
  total_count: number;
  has_more: boolean;
  next_offset: number | null;
}

// ============= Search & Discovery Responses =============

export interface SearchAlbumsResponse {
  results: SearchResult[];
  cached: boolean;
}

export interface SearchUsersResponse {
  users: UserResult[];
}

export interface GenreStatsResponse {
  user: string;
  genres: Genre[];
  message: string;
}

// ============= Favorite Albums Response =============

export interface FavoriteAlbumsResponse {
  albums: Album[];
}

// ============= Pagination Helper =============

export interface PaginatedResponse<T> {
  results: T[];
  total_count: number;
  has_more: boolean;
  next_offset: number | null;
}
