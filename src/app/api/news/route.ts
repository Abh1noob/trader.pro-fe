import { NextResponse } from "next/server";
import axios from "axios";
import { parseStringPromise } from "xml2js";

interface NewsItem {
  title?: string[];
  description?: string[];
  link?: string[];
  pubDate?: string[];
}

interface RssFeed {
  rss?: {
    channel?: [
      {
        item?: NewsItem[];
      }
    ];
  };
}

export async function GET() {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    };

    const [announcements, corporateAction, annualReports] = await Promise.all([
      axios.get(
        "https://nsearchives.nseindia.com/content/RSS/Online_announcements.xml",
        {
          headers,
          timeout: 5000,
        }
      ),
      axios.get(
        "https://nsearchives.nseindia.com/content/RSS/Corporate_action.xml",
        {
          headers,
          timeout: 5000,
        }
      ),
      axios.get(
        "https://nsearchives.nseindia.com/content/RSS/Annual_Reports.xml",
        {
          headers,
          timeout: 5000,
        }
      ),
    ]);

    const [announcementsData, corporateActionsData, annualReportsData] =
      await Promise.all([
        parseStringPromise(announcements.data),
        parseStringPromise(corporateAction.data),
        parseStringPromise(annualReports.data),
      ]);

    const parseItems = (feed: RssFeed) =>
      feed?.rss?.channel?.[0]?.item?.map((item: NewsItem) => ({
        title: item.title?.[0],
        description: item.description?.[0],
        link: item.link?.[0],
        pubDate: item.pubDate?.[0] ?? "",
      })) ?? [];

    const response = {
      onlineAnnouncements: parseItems(announcementsData).slice(0, 10),
      corporateActions: parseItems(corporateActionsData).slice(0, 10),
      annualReports: parseItems(annualReportsData).slice(0, 10),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching NSE news:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch NSE news",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
