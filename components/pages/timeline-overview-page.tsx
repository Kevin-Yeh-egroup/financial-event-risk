"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Wallet, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineOverviewPageProps {
  onStart: () => void;
  onBack: () => void;
}

const timelineCards = [
  {
    icon: Clock,
    stage: "事前",
    title: "事前：準備成本",
    content: "學費、設備、證照、交通、生活預備金，可能在開始前就形成壓力。",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wallet,
    stage: "事中",
    title: "事中：現金流壓力",
    content: "進修期間收入可能減少，但房租、餐費、貸款、保險與工具訂閱仍會持續發生。",
    color: "bg-risk-warning/10 text-risk-warning",
  },
  {
    icon: TrendingUp,
    stage: "事後",
    title: "事後：銜接空窗",
    content: "結訓後不一定馬上有收入，找工作、面試、治裝與第一份薪水前的生活費都需要預留。",
    color: "bg-accent/30 text-accent-foreground",
  },
];

export function TimelineOverviewPage({ onStart, onBack }: TimelineOverviewPageProps) {
  return (
    <div className="space-y-8">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回情境選擇
      </Button>

      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          這段進修，不只是學習，而是一段財務過程
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          我們會分成三個階段，陪你看見可能的花費、收入空窗、資源與風險。
        </p>
      </div>

      {/* Timeline Visual */}
      <div className="relative mx-auto max-w-3xl">
        {/* Timeline line - Desktop */}
        <div className="absolute left-0 right-0 top-6 hidden h-1 bg-border md:block" />
        
        {/* Timeline points - Desktop */}
        <div className="hidden md:flex justify-between relative z-10">
          {[
            { label: "事前｜準備期", question: "要不要開始？" },
            { label: "事中｜進行期", question: "能不能撐過？" },
            { label: "事後｜銜接期", question: "能不能接上收入？" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold",
                index === 0 && "bg-primary text-primary-foreground",
                index === 1 && "bg-risk-warning text-foreground",
                index === 2 && "bg-accent text-accent-foreground"
              )}>
                {index + 1}
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.question}</p>
            </div>
          ))}
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-4">
          {[
            { label: "事前｜準備期", question: "要不要開始？", color: "bg-primary text-primary-foreground" },
            { label: "事中｜進行期", question: "能不能撐過？", color: "bg-risk-warning text-foreground" },
            { label: "事後｜銜接期", question: "能不能接上收入？", color: "bg-accent text-accent-foreground" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold",
                item.color
              )}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {timelineCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", card.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Button size="lg" onClick={onStart} className="group">
          開始逐步盤點
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
