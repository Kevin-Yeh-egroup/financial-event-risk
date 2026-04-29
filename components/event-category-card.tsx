"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { type EventCategory } from "@/lib/event-data";

interface EventCategoryCardProps {
  category: EventCategory;
  onSelect: (id: string) => void;
}

export function EventCategoryCard({ category, onSelect }: EventCategoryCardProps) {
  const Icon = category.icon;
  
  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      category.available 
        ? "cursor-pointer hover:border-primary/50 hover:-translate-y-1" 
        : "opacity-60"
    }`}>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          {!category.available && (
            <Badge variant="secondary" className="text-xs">
              即將推出
            </Badge>
          )}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant={category.available ? "default" : "secondary"}
          className="w-full"
          disabled={!category.available}
          onClick={() => category.available && onSelect(category.id)}
        >
          {category.available ? (
            <>
              查看這類事件的時間軸
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "敬請期待"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
