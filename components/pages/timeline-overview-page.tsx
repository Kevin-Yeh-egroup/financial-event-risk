"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock, Wallet, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { skillInvestmentPersonas } from "@/lib/event-data";
import { useCalculatorStore } from "@/lib/calculator-store";

interface TimelineOverviewPageProps {
  onStart: () => void;
  onBack: () => void;
}

const defaultTimeline = {
  beforeTitle: "事前：準備成本",
  before: "開始進修前，不只要看學費，也要看你是否有足夠資源承接啟動成本。若一開始就把存款用光，後面容易被迫中斷。",
  duringTitle: "事中：現金流壓力",
  during: "進修期間最大的壓力通常不是單筆學費，而是每個月持續發生的生活支出。如果收入減少，現金流會比想像中更快吃緊。",
  afterTitle: "事後：銜接空窗",
  after: "很多人以為結訓就是壓力結束，但真正容易卡住的是結訓後到第一份收入進來之前。這段時間需要生活費、面試費、交通費，也可能開始面對債務還款。",
};

const stageIcons = [Clock, Wallet, TrendingUp];
const stageColors = [
  { card: "bg-primary/10 text-primary", dot: "bg-primary text-primary-foreground", dotMobile: "bg-primary text-primary-foreground" },
  { card: "bg-risk-warning/10 text-risk-warning", dot: "bg-risk-warning text-foreground", dotMobile: "bg-risk-warning text-foreground" },
  { card: "bg-accent/30 text-accent-foreground", dot: "bg-accent text-accent-foreground", dotMobile: "bg-accent text-accent-foreground" },
];
const stageLabels = [
  { label: "事前｜準備期", question: "要不要開始？" },
  { label: "事中｜進行期", question: "能不能撐過？" },
  { label: "事後｜銜接期", question: "能不能接上收入？" },
];

export function TimelineOverviewPage({ onStart, onBack }: TimelineOverviewPageProps) {
  const { selectedPersona: selectedPersonaId } = useCalculatorStore();

  const persona = skillInvestmentPersonas.find((p) => p.id === selectedPersonaId);
  const timeline = persona?.timeline ?? defaultTimeline;

  const timelineCards = [
    { title: timeline.beforeTitle, content: timeline.before },
    { title: timeline.duringTitle, content: timeline.during },
    { title: timeline.afterTitle, content: timeline.after },
  ];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回情境選擇
      </Button>

      {/* Header */}
      <div className="space-y-4 text-center">
        {persona && (
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {persona.title}・{persona.age}
            </Badge>
          </div>
        )}
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          這段進修，不只是學習，而是一段財務過程
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          {persona
            ? `以下是針對「${persona.title}」情境整理的三個財務關鍵階段。`
            : "我們會分成三個階段，陪你看見可能的花費、收入空窗、資源與風險。"}
        </p>
      </div>

      {/* Timeline Visual */}
      <div className="relative mx-auto max-w-3xl">
        {/* Timeline line - Desktop */}
        <div className="absolute left-0 right-0 top-6 hidden h-1 bg-border md:block" />

        {/* Timeline points - Desktop */}
        <div className="hidden md:flex justify-between relative z-10">
          {stageLabels.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold",
                stageColors[index].dot
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
          {stageLabels.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold",
                stageColors[index].dotMobile
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

      {/* Summary Cards — persona-specific */}
      <div className="grid gap-4 md:grid-cols-3">
        {timelineCards.map((card, index) => {
          const Icon = stageIcons[index];
          return (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stageColors[index].card)}>
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
