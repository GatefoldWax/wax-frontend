export interface Music {
  music_id: string;
  artist_ids: string[];
  artist_names: string[];
  name: string;
  type: string;
  tracks: string[] | null;
  album_id: string;
  genres: string[] | null;
  preview: string;
  album_img: string;
  release_date: string;
  avg_rating: "true" | null;
}

export interface Review {
  review_id?: number;
  music_id: string;
  username: string;
  rating: number;
  review_title: string | null;
  review_body: string | null;
  created_at?: string;
}

export interface PostReview {
  username: string;
  rating: number;
  review_title: string | null;
  review_body: string | null;
}

export interface Track {
  id: string;
  track_number: number;
  disc_number: number;
  spotify_url: string;
  name: string;
}
