"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type RiskLevel, getRiskColor, getRiskLabel } from "@/lib/event-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CalculationItem {
  label: string;
  value: number;
  type?: "positive" | "negative" | "neutral" | "result";
}

interface CalculationSummaryProps {
  items: CalculationItem[];
  resultLabel: string;
  resultValue: number;
  riskLevel: RiskLevel;
  message: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function CalculationSummary({ 
  items, 
  resultLabel, 
  resultValue, 
  riskLevel,
  message 
}: CalculationSummaryProps) {
  const Icon = resultValue >= 0 ? TrendingUp : TrendingDown;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Calculation items */}
        <div className="divide-y divide-border">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className={cn(
                "text-sm font-medium",
                item.type === "positive" && "text-risk-safe",
                item.type === "negative" && "text-risk-danger",
                item.type === "neutral" && "text-foreground"
              )}>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Result */}
        <div className={cn(
          "flex items-center justify-between px-4 py-4",
          getRiskColor(riskLevel)
        )}>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span className="font-medium">{resultLabel}</span>
          </div>
          <span className="text-lg font-bold">
            {formatCurrency(resultValue)}
          </span>
        </div>
        
        {/* Risk message */}
        <div className="bg-muted/50 px-4 py-3">
          <div className="flex items-start gap-2">
            <div className={cn(
              "mt-0.5 h-2 w-2 shrink-0 rounded-full",
              riskLevel === "safe" && "bg-risk-safe",
              riskLevel === "warning" && "bg-risk-warning",
              riskLevel === "danger" && "bg-risk-danger"
            )} />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
