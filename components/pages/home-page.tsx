"use client";

import { EventCategoryCard } from "@/components/event-category-card";
import { eventCategories } from "@/lib/event-data";
import { Heart } from "lucide-react";

interface HomePageProps {
  onSelectCategory: (id: string) => void;
}

export function HomePage({ onSelectCategory }: HomePageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Heart className="h-4 w-4" />
          好理家在｜人生事件財務風險預備工具
        </div>
        <h1 className="text-2xl font-bold text-foreground md:text-4xl text-balance">
          你現在正在面對哪一種財務或風險事件？
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          不同人生變動，會帶來不同的花費、壓力與可用資源。先選一個最接近你的情境，我們會用時間軸陪你一步步盤點。
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventCategories.map((category) => (
          <EventCategoryCard
            key={category.id}
            category={category}
            onSelect={onSelectCategory}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mx-auto max-w-2xl rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          本工具提供初步財務風險盤點，不取代社工、法律、醫療或金融專業建議。
        </p>
      </div>
    </div>
  );
}
