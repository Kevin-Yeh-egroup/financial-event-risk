"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, CalendarDays, MapPin } from "lucide-react";
import { type Persona } from "@/lib/event-data";

interface PersonaCardProps {
  persona: Persona;
  onSelect: (id: string) => void;
}

export function PersonaCard({ persona, onSelect }: PersonaCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 flex flex-col">
      <CardContent className="pt-6 flex-1 space-y-4">
        {/* Icon + Title + Age */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="shrink-0 text-xs font-normal">
              <CalendarDays className="mr-1 h-3 w-3" />
              {persona.age}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {persona.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {persona.description}
          </p>
        </div>

        {/* Environment */}
        <div className="flex gap-2 text-xs text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="leading-snug">{persona.environment}</span>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5">
          {persona.traits.map((trait) => (
            <Badge key={trait} variant="outline" className="text-xs font-normal px-2 py-0.5">
              {trait}
            </Badge>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">可能的相關資源</p>
          <ul className="space-y-0.5">
            {persona.resources.map((resource) => (
              <li key={resource} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                {resource}
              </li>
            ))}
          </ul>
        </div>
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
