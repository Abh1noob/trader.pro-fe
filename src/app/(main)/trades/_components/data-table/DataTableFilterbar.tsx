"use client";

import { Table } from "@tanstack/react-table";
import { ViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-x-6 ">
      <div className="flex items-center gap-2 ">
        <ViewOptions table={table} />
      </div>
    </div>
  );
}
