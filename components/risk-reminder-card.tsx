"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface RiskReminderCardProps {
  title: string;
  reminders: string[];
}

export function RiskReminderCard({ title, reminders }: RiskReminderCardProps) {
  return (
    <Card className="border-risk-warning/30 bg-risk-warning/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-risk-warning">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {reminders.map((reminder, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-risk-warning" />
              {reminder}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
