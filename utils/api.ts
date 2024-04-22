import axios, { AxiosResponse } from "axios";
import { PostReview } from "../types/front-end";
import { supabase } from "../lib/supabase";

const refreshSession = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  return data.session?.access_token;
};

const api = axios.create({
  baseURL: "https://jxkaizmyfxwrhbvundhm.supabase.co/functions/v1",
});

export const getMusic = async (
  music_id?: string,
  avg_rating?: "true" | null
) => {
  try {
    const response: AxiosResponse = await api.get(
      "/music",

      {
        params: { music_id, avg_rating },
        headers: { Authorization: `Bearer ${await refreshSession()}` },
      }
    );
   
    return response.data.music;
  } catch (err) {
    console.log("🚀 ~ file: api.ts:11 ~ getMusic ~ err:", err);
  }
};

export const getReviews = async (music_id?: string, username?: string) => {
  try {
    const response: AxiosResponse = await api.get(
      `/reviews/${music_id}/${username}`,
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );
    
    return response.data.reviews;
  } catch (err) {
    console.log("🚀 ~ file: api.ts:24 ~ getReviews ~ err:", err);
  }
};

export const getReviewsByUsername = async (username?: string) => {
  try {
    const response: AxiosResponse = await api.get(
      `/reviews/${username}`,
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );

    return response.data.reviews;
  } catch (err) {
    console.log("🚀 ~ file: api.ts:24 ~ getReviewsByUsername ~ err:", err);
  }
};

export const postReview = async (music_id: string, review: PostReview) => {
  try {
    const response: AxiosResponse = await api.post(
      `/reviews/${music_id}/${review.username}`,
      review,
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );

    return response.data.review;
  } catch (err) {
    console.log("🚀 ~ file: api.ts:40 ~ postReview ~ err:", err);
  }
};

export const getSpotifyMusic = async (type: string, q: string) => {
  try {
    const response: AxiosResponse = await api.post(
      "/search",
      {
        type,
        q,
      },
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );
    return response.data.music;
  } catch (err) {
    console.log("🚀 ~ getSpotifyMusic ~ err:", err);
  }
};

export const getSpotifyTrackList = async (music_id: string) => {
  try {
    const response: AxiosResponse = await api.get(
      `/search/${music_id}/tracks`,
   
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );
    return response.data.tracks;
  } catch (err) {
    console.log("🚀 ~ getSpotifyTrackList ~ err:", err);
  }
};

export const deleteReview = async (review_id: number) => {
  try {
    const response: AxiosResponse = await api.delete(`/reviews/${review_id}`, {
      headers: { Authorization: `Bearer ${await refreshSession()}` },
    });
    return response.data;
  } catch (err) {
    console.log("🚀 ~ file: api.ts:51 ~ deleteReview ~ err:", err);
  }
};

export const getFollows = async (username: string) => {
  if (!username) throw new Error("username is required");
  try {
    const response: AxiosResponse = await api.get(`/users/${username}`, {
      headers: { Authorization: `Bearer ${ await refreshSession()}` },
    });
    return response.data;
  } catch (err) {
    console.log("🚀 ~ getFollows ~ err:", err);
  }
};

export const patchFollows = async (
  loggedInUser: string,
  newFollow: string,
  followRequest: boolean
) => {
  try {
    await api.patch(
      `/users/${loggedInUser}`,
      {
        new_follow: newFollow,
        follow_request: followRequest,
      },
      { headers: { Authorization: `Bearer ${await refreshSession()}` } }
    );
  } catch (err) {
    console.log("🚀 ~ patchFollows ~ err:", err);
  }
};
