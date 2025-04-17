import { type ColumnDef } from "@tanstack/react-table";
import { Trade } from "../../types";
import { Badge } from "@/components/badge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/button";

import { RiHammerLine } from "@remixicon/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import TradeForm from "@/app/(main)/chart/[stock]/_components/TradeForm";

export const tradeColumns = (refetch: () => void): ColumnDef<Trade>[] => [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <span>{row.getValue("symbol")}</span>,
    meta: {
      displayName: "Symbol",
    },
  },
  {
    accessorKey: "trade_type",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("trade_type") === "buy" ? "success" : "error"}
      >
        {String(row.getValue("trade_type")).toUpperCase()}
      </Badge>
    ),
    meta: {
      displayName: "Trade Type",
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <span>{row.getValue("quantity")}</span>,
    meta: {
      displayName: "Quantity",
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{Number(row.getValue("price")).toFixed(2)}</span>,
    meta: {
      displayName: "Price",
    },
  },
  {
    accessorKey: "total_amount",
    header: "Total",
    cell: ({ row }) => (
      <span>{Number(row.getValue("total_amount")).toFixed(2)}</span>
    ),
    meta: {
      displayName: "Total Amount",
    },
  },
  {
    accessorKey: "timestamp",
    header: "Placed At",
    cell: ({ row }) => formatDate(row.getValue("timestamp")),
    meta: {
      displayName: "Placed At",
    },
  },
  {
    accessorKey: "executed_at",
    header: "Executed At",
    cell: ({ row }) => formatDate(row.getValue("executed_at")),
    meta: {
      displayName: "Executed At",
    },
  },
  {
    id: "more",
    header: "More",
    cell: ({ row }) => {
      const trade = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 rounded-md transition-all bg-indigo-600 hover:bg-indigo-700 text-white">
              <RiHammerLine className="h-4 w-4" />
              <span className="hidden sm:inline">Modify Trade</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none shadow-xl w-fit">
            <TradeForm stockCode={trade.symbol} onSuccess={refetch} />
          </DialogContent>
        </Dialog>
      );
    },
    meta: {
      displayName: "More",
    },
  },
];
