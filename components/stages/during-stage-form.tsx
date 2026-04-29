"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/currency-input";
import { RiskReminderCard } from "@/components/risk-reminder-card";
import { CalculationSummary } from "@/components/calculation-summary";
import { TimelineProgress } from "@/components/timeline-progress";
import { useCalculatorStore } from "@/lib/calculator-store";
import { duringRiskReminders, timelineStages } from "@/lib/event-data";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface DuringStageFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function DuringStageForm({ onNext, onBack }: DuringStageFormProps) {
  const { duringData, updateDuringData, getDuringCalculations } = useCalculatorStore();
  const calculations = getDuringCalculations();
  
  const stage = timelineStages[1];
  
  const getMessage = () => {
    if (calculations.riskLevel === "danger") {
      return "提醒：進修期間每月可能出現資金缺口，建議先規劃接案、補助、支出調整或縮短進修期間。";
    }
    if (calculations.riskLevel === "warning") {
      return "進修期間現金流較為緊張，建議預留額外緩衝資金或增加兼職收入。";
    }
    return "目前進修期間現金流較穩定，可以進一步檢查結訓後銜接期。";
  };

  return (
    <div className="space-y-6">
      <TimelineProgress currentStep={2} />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          事中進行期：我撐得過這幾個月嗎？
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {stage.explanation}
        </p>
      </div>

      <RiskReminderCard 
        title="這一階段常見壓力" 
        reminders={duringRiskReminders} 
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">估算進修期間的每月收支</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">預計進修月數</Label>
            <Input
              type="number"
              value={duringData.monthsOfStudy || ""}
              onChange={(e) => updateDuringData({ monthsOfStudy: Number(e.target.value) || 1 })}
              min={1}
              max={24}
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">預計需要進修的總月數</p>
          </div>
          
          <div className="border-t pt-4">
            <p className="mb-4 text-sm font-medium text-muted-foreground">每月收入來源</p>
            <div className="grid gap-4 md:grid-cols-2">
              <CurrencyInput
                label="每月固定收入"
                value={duringData.monthlyIncome}
                onChange={(v) => updateDuringData({ monthlyIncome: v })}
                hint="穩定的薪資或被動收入"
              />
              <CurrencyInput
                label="每月兼職或接案收入"
                value={duringData.monthlyFreelance}
                onChange={(v) => updateDuringData({ monthlyFreelance: v })}
                hint="預估可取得的額外收入"
              />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="mb-4 text-sm font-medium text-muted-foreground">每月固定支出</p>
            <div className="grid gap-4 md:grid-cols-2">
              <CurrencyInput
                label="每月房租或居住費"
                value={duringData.monthlyRent}
                onChange={(v) => updateDuringData({ monthlyRent: v })}
              />
              <CurrencyInput
                label="每月伙食費"
                value={duringData.monthlyFood}
                onChange={(v) => updateDuringData({ monthlyFood: v })}
              />
              <CurrencyInput
                label="每月交通費"
                value={duringData.monthlyTransport}
                onChange={(v) => updateDuringData({ monthlyTransport: v })}
              />
              <CurrencyInput
                label="每月貸款或卡費最低還款"
                value={duringData.monthlyLoanPayment}
                onChange={(v) => updateDuringData({ monthlyLoanPayment: v })}
              />
              <CurrencyInput
                label="每月保險、健保、國民年金"
                value={duringData.monthlyInsurance}
                onChange={(v) => updateDuringData({ monthlyInsurance: v })}
              />
              <CurrencyInput
                label="每月工具訂閱費"
                value={duringData.monthlySubscriptions}
                onChange={(v) => updateDuringData({ monthlySubscriptions: v })}
                hint="AI 工具、軟體、雲端空間"
              />
              <CurrencyInput
                label="每月其他家庭支出"
                value={duringData.monthlyOther}
                onChange={(v) => updateDuringData({ monthlyOther: v })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CalculationSummary
        items={[
          { label: "每月總收入", value: calculations.monthlyIncome, type: "positive" },
          { label: "每月總支出", value: calculations.monthlyExpenses, type: "negative" },
          { label: "每月現金流差額", value: calculations.monthlyGap, type: calculations.monthlyGap >= 0 ? "positive" : "negative" },
        ]}
        resultLabel={`進修${duringData.monthsOfStudy}個月總缺口/剩餘`}
        resultValue={calculations.totalGap}
        riskLevel={calculations.riskLevel}
        message={getMessage()}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          上一步
        </Button>
        <Button onClick={onNext}>
          下一步：結訓銜接
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
