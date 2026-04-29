"use client";

import { create } from "zustand";
import { type RiskLevel, getRiskLevel } from "./event-data";

export interface BeforeStageData {
  savings: number;
  tuitionFee: number;
  equipmentCost: number;
  certificationFee: number;
  expectedSubsidy: number;
  familySupport: number;
  otherResources: number;
}

export interface DuringStageData {
  monthsOfStudy: number;
  monthlyIncome: number;
  monthlyFreelance: number;
  monthlyRent: number;
  monthlyFood: number;
  monthlyTransport: number;
  monthlyLoanPayment: number;
  monthlyInsurance: number;
  monthlySubscriptions: number;
  monthlyOther: number;
}

export interface AfterStageData {
  transitionMonths: number;
  monthlyLivingCost: number;
  interviewTransport: number;
  professionalAttire: number;
  portfolioCost: number;
  resumingLoanPayment: number;
  otherTransitionCost: number;
}

export interface CalculatorState {
  selectedCategory: string | null;
  selectedPersona: string | null;
  currentStep: number;
  beforeData: BeforeStageData;
  duringData: DuringStageData;
  afterData: AfterStageData;
  
  // Actions
  setSelectedCategory: (category: string | null) => void;
  setSelectedPersona: (persona: string | null) => void;
  setCurrentStep: (step: number) => void;
  updateBeforeData: (data: Partial<BeforeStageData>) => void;
  updateDuringData: (data: Partial<DuringStageData>) => void;
  updateAfterData: (data: Partial<AfterStageData>) => void;
  reset: () => void;
  
  // Calculated values
  getBeforeCalculations: () => {
    totalResources: number;
    totalExpenses: number;
    remaining: number;
    riskLevel: RiskLevel;
  };
  getDuringCalculations: () => {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyGap: number;
    totalGap: number;
    riskLevel: RiskLevel;
  };
  getAfterCalculations: () => {
    totalTransitionCost: number;
    remainingAfterStudy: number;
    transitionGap: number;
    riskLevel: RiskLevel;
  };
  getOverallCalculations: () => {
    totalCost: number;
    totalResources: number;
    totalGap: number;
    supportableMonths: number;
    beforeRisk: RiskLevel;
    duringRisk: RiskLevel;
    afterRisk: RiskLevel;
    highestRiskStage: "before" | "during" | "after";
  };
}

const initialBeforeData: BeforeStageData = {
  savings: 0,
  tuitionFee: 0,
  equipmentCost: 0,
  certificationFee: 0,
  expectedSubsidy: 0,
  familySupport: 0,
  otherResources: 0,
};

const initialDuringData: DuringStageData = {
  monthsOfStudy: 3,
  monthlyIncome: 0,
  monthlyFreelance: 0,
  monthlyRent: 0,
  monthlyFood: 0,
  monthlyTransport: 0,
  monthlyLoanPayment: 0,
  monthlyInsurance: 0,
  monthlySubscriptions: 0,
  monthlyOther: 0,
};

const initialAfterData: AfterStageData = {
  transitionMonths: 2,
  monthlyLivingCost: 0,
  interviewTransport: 0,
  professionalAttire: 0,
  portfolioCost: 0,
  resumingLoanPayment: 0,
  otherTransitionCost: 0,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  selectedCategory: null,
  selectedPersona: null,
  currentStep: 1,
  beforeData: initialBeforeData,
  duringData: initialDuringData,
  afterData: initialAfterData,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateBeforeData: (data) => set((state) => ({
    beforeData: { ...state.beforeData, ...data }
  })),
  
  updateDuringData: (data) => set((state) => ({
    duringData: { ...state.duringData, ...data }
  })),
  
  updateAfterData: (data) => set((state) => ({
    afterData: { ...state.afterData, ...data }
  })),
  
  reset: () => set({
    selectedCategory: null,
    selectedPersona: null,
    currentStep: 1,
    beforeData: initialBeforeData,
    duringData: initialDuringData,
    afterData: initialAfterData,
  }),

  getBeforeCalculations: () => {
    const { beforeData } = get();
    const totalResources = 
      beforeData.savings + 
      beforeData.expectedSubsidy + 
      beforeData.familySupport + 
      beforeData.otherResources;
    const totalExpenses = 
      beforeData.tuitionFee + 
      beforeData.equipmentCost + 
      beforeData.certificationFee;
    const remaining = totalResources - totalExpenses;
    
    return {
      totalResources,
      totalExpenses,
      remaining,
      riskLevel: getRiskLevel(remaining),
    };
  },

  getDuringCalculations: () => {
    const { duringData, beforeData } = get();
    const beforeCalc = get().getBeforeCalculations();
    
    const monthlyIncome = duringData.monthlyIncome + duringData.monthlyFreelance;
    const monthlyExpenses = 
      duringData.monthlyRent + 
      duringData.monthlyFood + 
      duringData.monthlyTransport + 
      duringData.monthlyLoanPayment + 
      duringData.monthlyInsurance + 
      duringData.monthlySubscriptions + 
      duringData.monthlyOther;
    const monthlyGap = monthlyIncome - monthlyExpenses;
    const totalGap = monthlyGap * duringData.monthsOfStudy;
    
    // Consider remaining from before stage
    const adjustedGap = beforeCalc.remaining + totalGap;
    
    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyGap,
      totalGap,
      riskLevel: getRiskLevel(adjustedGap),
    };
  },

  getAfterCalculations: () => {
    const { afterData } = get();
    const duringCalc = get().getDuringCalculations();
    const beforeCalc = get().getBeforeCalculations();
    
    const totalTransitionCost = 
      (afterData.monthlyLivingCost * afterData.transitionMonths) +
      afterData.interviewTransport +
      afterData.professionalAttire +
      afterData.portfolioCost +
      (afterData.resumingLoanPayment * afterData.transitionMonths) +
      afterData.otherTransitionCost;
    
    const remainingAfterStudy = beforeCalc.remaining + duringCalc.totalGap;
    const transitionGap = remainingAfterStudy - totalTransitionCost;
    
    return {
      totalTransitionCost,
      remainingAfterStudy,
      transitionGap,
      riskLevel: getRiskLevel(transitionGap),
    };
  },

  getOverallCalculations: () => {
    const beforeCalc = get().getBeforeCalculations();
    const duringCalc = get().getDuringCalculations();
    const afterCalc = get().getAfterCalculations();
    
    const totalCost = 
      beforeCalc.totalExpenses + 
      Math.abs(duringCalc.totalGap < 0 ? duringCalc.totalGap : 0) + 
      afterCalc.totalTransitionCost;
    
    const totalResources = beforeCalc.totalResources;
    const totalGap = afterCalc.transitionGap;
    
    // Calculate supportable months
    const monthlyBurn = duringCalc.monthlyExpenses || 1;
    const supportableMonths = Math.max(0, Math.floor(totalResources / monthlyBurn));
    
    // Determine highest risk stage
    const riskScores = {
      before: beforeCalc.riskLevel === "danger" ? 3 : beforeCalc.riskLevel === "warning" ? 2 : 1,
      during: duringCalc.riskLevel === "danger" ? 3 : duringCalc.riskLevel === "warning" ? 2 : 1,
      after: afterCalc.riskLevel === "danger" ? 3 : afterCalc.riskLevel === "warning" ? 2 : 1,
    };
    
    const highestRiskStage = Object.entries(riskScores).reduce((a, b) => 
      b[1] > riskScores[a as keyof typeof riskScores] ? b[0] : a
    , "before") as "before" | "during" | "after";
    
    return {
      totalCost,
      totalResources,
      totalGap,
      supportableMonths,
      beforeRisk: beforeCalc.riskLevel,
      duringRisk: duringCalc.riskLevel,
      afterRisk: afterCalc.riskLevel,
      highestRiskStage,
    };
  },
}));
