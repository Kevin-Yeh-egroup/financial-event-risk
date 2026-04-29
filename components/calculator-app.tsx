"use client";

import { useState } from "react";
import { useCalculatorStore } from "@/lib/calculator-store";
import { HomePage } from "@/components/pages/home-page";
import { PersonaSelectionPage } from "@/components/pages/persona-selection-page";
import { TimelineOverviewPage } from "@/components/pages/timeline-overview-page";
import { BeforeStageForm } from "@/components/stages/before-stage-form";
import { DuringStageForm } from "@/components/stages/during-stage-form";
import { AfterStageForm } from "@/components/stages/after-stage-form";
import { FinalResult } from "@/components/stages/final-result";
import { ActionPlan } from "@/components/stages/action-plan";

type Page = 
  | "home" 
  | "persona-selection" 
  | "timeline-overview" 
  | "before" 
  | "during" 
  | "after" 
  | "result" 
  | "action";

export function CalculatorApp() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { 
    setSelectedCategory, 
    setSelectedPersona, 
    setCurrentStep,
    reset 
  } = useCalculatorStore();

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "skill-investment") {
      setCurrentPage("persona-selection");
    }
  };

  const handleSelectPersona = (personaId: string) => {
    setSelectedPersona(personaId);
    setCurrentPage("timeline-overview");
  };

  const handleStartCalculation = () => {
    setCurrentStep(1);
    setCurrentPage("before");
  };

  const handleReset = () => {
    reset();
    setCurrentPage("home");
  };

  const handleResetToBeforeStage = () => {
    setCurrentStep(1);
    setCurrentPage("before");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        {currentPage === "home" && (
          <HomePage onSelectCategory={handleSelectCategory} />
        )}
        
        {currentPage === "persona-selection" && (
          <PersonaSelectionPage 
            onSelectPersona={handleSelectPersona}
            onBack={() => setCurrentPage("home")}
          />
        )}
        
        {currentPage === "timeline-overview" && (
          <TimelineOverviewPage 
            onStart={handleStartCalculation}
            onBack={() => setCurrentPage("persona-selection")}
          />
        )}
        
        {currentPage === "before" && (
          <BeforeStageForm 
            onNext={() => {
              setCurrentStep(2);
              setCurrentPage("during");
            }}
            onBack={() => setCurrentPage("timeline-overview")}
          />
        )}
        
        {currentPage === "during" && (
          <DuringStageForm 
            onNext={() => {
              setCurrentStep(3);
              setCurrentPage("after");
            }}
            onBack={() => {
              setCurrentStep(1);
              setCurrentPage("before");
            }}
          />
        )}
        
        {currentPage === "after" && (
          <AfterStageForm 
            onNext={() => setCurrentPage("result")}
            onBack={() => {
              setCurrentStep(2);
              setCurrentPage("during");
            }}
          />
        )}
        
        {currentPage === "result" && (
          <FinalResult 
            onBack={() => setCurrentPage("after")}
            onReset={handleResetToBeforeStage}
            onAction={() => setCurrentPage("action")}
          />
        )}
        
        {currentPage === "action" && (
          <ActionPlan 
            onBack={() => setCurrentPage("result")}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
