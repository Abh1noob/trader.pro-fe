"use client";

import { useQuery } from "@tanstack/react-query";
import { getTradesList } from "./services";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Trade } from "./types";

export default function TradesPage() {
  const { data, isLoading } = useQuery<Trade[]>({
    queryKey: ["trades"],
    queryFn: getTradesList,
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Details
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
