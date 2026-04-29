"use client";

import { cn } from "@/lib/utils";
import { timelineStages } from "@/lib/event-data";
import { Check } from "lucide-react";

interface TimelineProgressProps {
  currentStep: number;
  className?: string;
}

export function TimelineProgress({ currentStep, className }: TimelineProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Timeline */}
      <div className="hidden md:flex items-center justify-between">
        {timelineStages.map((stage, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div key={stage.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                  isCompleted && "bg-risk-safe text-white",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}>
                    {stage.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stage.question}
                  </p>
                </div>
              </div>
              {index < timelineStages.length - 1 && (
                <div className={cn(
                  "h-0.5 flex-1 mx-4 transition-all",
                  isCompleted ? "bg-risk-safe" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile Timeline */}
      <div className="md:hidden space-y-3">
        {timelineStages.map((stage, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div 
              key={stage.id} 
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 transition-all",
                isCurrent && "bg-primary/10",
                isCompleted && "bg-risk-safe/10"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                isCompleted && "bg-risk-safe text-white",
                isCurrent && "bg-primary text-primary-foreground",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}>
                  {stage.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stage.question}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
