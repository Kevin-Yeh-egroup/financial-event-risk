"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { type Persona } from "@/lib/event-data";

interface PersonaCardProps {
  persona: Persona;
  onSelect: (id: string) => void;
}

export function PersonaCard({ persona, onSelect }: PersonaCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
      <CardContent className="pt-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/30 text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <User className="h-5 w-5" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {persona.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {persona.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          onClick={() => onSelect(persona.id)}
        >
          進入我的時間軸
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
