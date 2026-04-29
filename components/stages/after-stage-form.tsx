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
import { afterRiskReminders, timelineStages } from "@/lib/event-data";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface AfterStageFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function AfterStageForm({ onNext, onBack }: AfterStageFormProps) {
  const { afterData, updateAfterData, getAfterCalculations } = useCalculatorStore();
  const calculations = getAfterCalculations();
  
  const stage = timelineStages[2];
  
  const getMessage = () => {
    if (calculations.riskLevel === "danger") {
      return "提醒：你的主要風險可能不是進修本身，而是結訓後的收入空窗。建議預留至少 1–2 個月生活費。";
    }
    if (calculations.riskLevel === "warning") {
      return "銜接期資金較為緊張，建議提早規劃面試與求職準備，縮短空窗期。";
    }
    return "你已預留銜接期資金，較有機會順利完成進修並接上收入。";
  };

  return (
    <div className="space-y-6">
      <TimelineProgress currentStep={3} />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          事後銜接期：我能順利接上收入嗎？
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {stage.explanation}
        </p>
      </div>

      <RiskReminderCard 
        title="這一階段常被低估" 
        reminders={afterRiskReminders} 
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">估算銜接期所需資金</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">預估找工作或轉銜空窗月數</Label>
            <Input
              type="number"
              value={afterData.transitionMonths || ""}
              onChange={(e) => updateAfterData({ transitionMonths: Number(e.target.value) || 1 })}
              min={1}
              max={12}
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">結訓到第一份薪水入帳的預估月數</p>
          </div>
          
          <div className="border-t pt-4">
            <p className="mb-4 text-sm font-medium text-muted-foreground">銜接期支出</p>
            <div className="grid gap-4 md:grid-cols-2">
              <CurrencyInput
                label="每月基本生活費"
                value={afterData.monthlyLivingCost}
                onChange={(v) => updateAfterData({ monthlyLivingCost: v })}
                hint="空窗期每月最低生活開銷"
              />
              <CurrencyInput
                label="面試交通費"
                value={afterData.interviewTransport}
                onChange={(v) => updateAfterData({ interviewTransport: v })}
                hint="預估總面試交通費用"
              />
              <CurrencyInput
                label="治裝或工作用品費"
                value={afterData.professionalAttire}
                onChange={(v) => updateAfterData({ professionalAttire: v })}
                hint="面試服裝、工作所需用品"
              />
              <CurrencyInput
                label="履歷、作品集或諮詢費"
                value={afterData.portfolioCost}
                onChange={(v) => updateAfterData({ portfolioCost: v })}
                hint="履歷健檢、作品集製作、職涯諮詢"
              />
              <CurrencyInput
                label="預計開始恢復的每月貸款或卡費"
                value={afterData.resumingLoanPayment}
                onChange={(v) => updateAfterData({ resumingLoanPayment: v })}
                hint="進修期間暫緩的債務還款"
              />
              <CurrencyInput
                label="其他銜接期支出"
                value={afterData.otherTransitionCost}
                onChange={(v) => updateAfterData({ otherTransitionCost: v })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CalculationSummary
        items={[
          { label: "銜接期總支出", value: calculations.totalTransitionCost, type: "negative" },
          { label: "完成進修後剩餘資金", value: calculations.remainingAfterStudy, type: calculations.remainingAfterStudy >= 0 ? "positive" : "negative" },
        ]}
        resultLabel="銜接期資金缺口/剩餘"
        resultValue={calculations.transitionGap}
        riskLevel={calculations.riskLevel}
        message={getMessage()}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          上一步
        </Button>
        <Button onClick={onNext}>
          查看整體結果
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
