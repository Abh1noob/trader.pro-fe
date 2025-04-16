import { local } from "@/app/api";
import { NSEFeedItem } from "./types";

export type NewsCategory =
  | "annualReports"
  | "corporateActions"
  | "onlineAnnouncements";

export interface CategorizedNews {
  annualReports: NSEFeedItem[];
  corporateActions: NSEFeedItem[];
  onlineAnnouncements: NSEFeedItem[];
}

export const getNews = async (): Promise<CategorizedNews> => {
  const res = await local.get("/news");
  return res.data;
};
