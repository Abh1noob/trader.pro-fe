import { local } from "../../app/api";
import { SearchResponse } from "./types";

export async function searchCompanies(query: string): Promise<SearchResponse> {
  const res = await local.get<SearchResponse>(`/search?q=${query}`);
  return res.data;
}
