"use client";

import { Button } from "@/components/ui/button";
import { PersonaCard } from "@/components/persona-card";
import { skillInvestmentPersonas } from "@/lib/event-data";
import { ArrowLeft, HelpCircle } from "lucide-react";

interface PersonaSelectionPageProps {
  onSelectPersona: (id: string) => void;
  onBack: () => void;
}

export function PersonaSelectionPage({ onSelectPersona, onBack }: PersonaSelectionPageProps) {
  return (
    <div className="space-y-8">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回事件選擇
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          你比較接近哪一種進修情境？
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          同樣是進修，不同人生階段會面對不同的財務壓力。請選一個最接近你的狀況。
        </p>
      </div>

      {/* Persona Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillInvestmentPersonas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            onSelect={onSelectPersona}
          />
        ))}
      </div>

      {/* Secondary action */}
      <div className="flex justify-center">
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
