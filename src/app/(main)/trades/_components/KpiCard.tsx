import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  color?: string;
}

export function KpiCard({
  title,
  value,
  icon,
  description,
  color = "indigo",
}: KpiCardProps) {
  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow p-5 min-w-[180px]`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span
          className={`text-sm font-medium text-gray-500 dark:text-gray-400`}
        >
          {title}
        </span>
      </div>
      <div
        className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}
      >
        {value}
      </div>
      {description && (
        <div className="text-xs text-gray-400 mt-1">{description}</div>
      )}
    </div>
  );
}
