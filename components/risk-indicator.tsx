"use client";

import { cn } from "@/lib/utils";
import { type RiskLevel, getRiskLabel } from "@/lib/event-data";

interface RiskIndicatorProps {
  label: string;
  level: RiskLevel;
  className?: string;
}

export function RiskIndicator({ label, level, className }: RiskIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg bg-card p-4 shadow-sm", className)}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className={cn(
          "h-3 w-3 rounded-full",
          level === "safe" && "bg-risk-safe",
          level === "warning" && "bg-risk-warning",
          level === "danger" && "bg-risk-danger"
        )} />
        <span className={cn(
          "text-sm font-medium",
          level === "safe" && "text-risk-safe",
          level === "warning" && "text-risk-warning",
          level === "danger" && "text-risk-danger"
        )}>
          {getRiskLabel(level)}
        </span>
      </div>
    </div>
  );
}
