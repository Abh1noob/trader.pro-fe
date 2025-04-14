import { NextRequest, NextResponse } from "next/server";
import { SortOrder } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import Instrument from "@/db/instruments";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sortField = searchParams.get("sortField") || "company_name";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    if (!query.trim()) {
      return NextResponse.json(
        {
          results: [],
          totalCount: 0,
          page,
          limit,
          totalPages: 0,
        },
        { status: 200 }
      );
    }

    const searchRegex = new RegExp(query, "i");

    const filter = {
      $or: [
        { short_name: searchRegex },
        { company_name: searchRegex },
        { exchange_code: searchRegex },
      ],
    };

    const totalCount = await Instrument.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const sort: { [key: string]: SortOrder } = {};
    sort[sortField] = sortOrder as SortOrder;

    const results = await Instrument.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        results,
        totalCount,
        page,
        limit,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Failed to perform search", error },
      { status: 500 }
    );
  }
}
