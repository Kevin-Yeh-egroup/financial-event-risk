"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { skillInvestmentPersonas } from "@/lib/event-data";
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  CalendarDays,
  MapPin,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaSelectionPageProps {
  onSelectPersona: (id: string) => void;
  onBack: () => void;
}

export function PersonaSelectionPage({ onSelectPersona, onBack }: PersonaSelectionPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const total = skillInvestmentPersonas.length;
  const persona = skillInvestmentPersonas[currentIndex];

  const goPrev = () => {
    setSlideDirection("left");
    setCurrentIndex((i) => (i - 1 + total) % total);
  };

  const goNext = () => {
    setSlideDirection("right");
    setCurrentIndex((i) => (i + 1) % total);
  };

  const goTo = (index: number) => {
    setSlideDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
    setShowQuickSelect(false);
    setTimeout(() => carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button variant="ghost" onClick={onBack} className="group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回事件選擇
      </Button>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          你比較接近哪一種進修情境？
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          同樣是進修，不同人生階段面對的財務壓力截然不同。
        </p>
      </div>

      {/* ── Carousel ── */}
      <div ref={carouselRef} className="relative mx-auto max-w-xl">
        {/* Prev */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-md bg-background hidden sm:flex"
          onClick={goPrev}
          aria-label="上一個"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Card with slide animation */}
        <div
          key={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "animate-in fade-in duration-250",
            slideDirection === "right"
              ? "slide-in-from-right-6"
              : "slide-in-from-left-6"
          )}
        >
          <Card className="border-primary/30 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              {/* Name + age */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{persona.title}</h2>
                    <p className="text-sm text-muted-foreground leading-snug mt-0.5">{persona.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs font-normal whitespace-nowrap">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {persona.age}
                </Badge>
              </div>

              {/* Traits */}
              <div className="flex flex-wrap gap-1.5">
                {persona.traits.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs font-normal px-2 py-0.5">
                    {t}
                  </Badge>
                ))}
              </div>

              {/* Environment */}
              <div className="flex gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <span className="leading-snug">{persona.environment}</span>
              </div>

              {/* Resources */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">可能的相關資源</p>
                <div className="flex flex-wrap gap-1.5">
                  {persona.resources.map((r) => (
                    <span
                      key={r}
                      className="text-xs bg-muted rounded-md px-2 py-0.5 text-muted-foreground"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline preview */}
              <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">財務關鍵聚焦</p>
                <div className="space-y-1.5">
                  {[
                    { label: "事前", text: persona.timeline.beforeTitle.replace(/^事前[：:]\s*/, ""), color: "text-primary" },
                    { label: "事中", text: persona.timeline.duringTitle.replace(/^事中[：:]\s*/, ""), color: "text-risk-warning" },
                    { label: "事後", text: persona.timeline.afterTitle.replace(/^事後[：:]\s*/, ""), color: "text-accent-foreground" },
                  ].map(({ label, text, color }) => (
                    <div key={label} className="flex gap-2 text-xs items-start">
                      <span className={cn("font-semibold shrink-0 w-6", color)}>{label}</span>
                      <span className="text-muted-foreground leading-snug">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => onSelectPersona(persona.id)}>
                這就是我的情境
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-md bg-background hidden sm:flex"
          onClick={goNext}
          aria-label="下一個"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Dot indicators + mobile arrows */}
      <div className="flex items-center justify-center gap-3">
        {/* Mobile prev */}
        <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8" onClick={goPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {skillInvestmentPersonas.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={p.title}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-7 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>

        {/* Mobile next */}
        <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8" onClick={goNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-muted-foreground tabular-nums">
        {currentIndex + 1} / {total}
      </p>

      {/* ── Quick Select ── */}
      <div className="border-t pt-4 space-y-3">
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground gap-2"
          onClick={() => setShowQuickSelect((v) => !v)}
        >
          <LayoutGrid className="h-4 w-4" />
          快速瀏覽全部情境
          {showQuickSelect ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {showQuickSelect && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {skillInvestmentPersonas.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all hover:border-primary/50 hover:bg-accent/20",
                  i === currentIndex
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="font-semibold text-sm text-foreground">{p.title}</span>
                  <Badge variant="secondary" className="text-xs font-normal shrink-0">{p.age}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">{p.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* General option */}
      <div className="flex justify-center pb-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSelectPersona("general")}
          className="group"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          我不確定，先看一般版
        </Button>
      </div>
    </div>
  );
}
