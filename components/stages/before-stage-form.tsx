"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/currency-input";
import { RiskReminderCard } from "@/components/risk-reminder-card";
import { CalculationSummary } from "@/components/calculation-summary";
import { TimelineProgress } from "@/components/timeline-progress";
import { useCalculatorStore } from "@/lib/calculator-store";
import { beforeRiskReminders, timelineStages } from "@/lib/event-data";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface BeforeStageFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function BeforeStageForm({ onNext, onBack }: BeforeStageFormProps) {
  const { beforeData, updateBeforeData, getBeforeCalculations } = useCalculatorStore();
  const calculations = getBeforeCalculations();
  
  const stage = timelineStages[0];
  
  const getMessage = () => {
    if (calculations.riskLevel === "danger") {
      return "提醒：你可能可以開始，但需要先確認補助、降低設備成本，或延後部分支出。";
    }
    if (calculations.riskLevel === "warning") {
      return "目前資金較為緊張，建議先增加可用資源或降低預估支出再開始。";
    }
    return "目前看起來可以進入下一階段，但仍要確認進修期間的每月現金流。";
  };

  return (
    <div className="space-y-6">
      <TimelineProgress currentStep={1} />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          事前準備期：我現在適合開始嗎？
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {stage.explanation}
        </p>
      </div>

      <RiskReminderCard 
        title="這一階段常被忽略的風險" 
        reminders={beforeRiskReminders} 
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">先盤點你手上的資源</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <CurrencyInput
              label="目前可動用存款"
              value={beforeData.savings}
              onChange={(v) => updateBeforeData({ savings: v })}
              hint="包含活存、定存等可快速動用的資金"
            />
            <CurrencyInput
              label="預計可取得的補助"
              value={beforeData.expectedSubsidy}
              onChange={(v) => updateBeforeData({ expectedSubsidy: v })}
              hint="政府補助、學校獎學金等"
            />
            <CurrencyInput
              label="家人或伴侶可支持金額"
              value={beforeData.familySupport}
              onChange={(v) => updateBeforeData({ familySupport: v })}
              hint="已確認的家人支持金額"
            />
            <CurrencyInput
              label="其他可用資源"
              value={beforeData.otherResources}
              onChange={(v) => updateBeforeData({ otherResources: v })}
              hint="其他可動用的資源或資金"
            />
          </div>
          
          <div className="border-t pt-4">
            <p className="mb-4 text-sm font-medium text-muted-foreground">預估一次性支出</p>
            <div className="grid gap-4 md:grid-cols-2">
              <CurrencyInput
                label="預計一次性學費或報名費"
                value={beforeData.tuitionFee}
                onChange={(v) => updateBeforeData({ tuitionFee: v })}
              />
              <CurrencyInput
                label="設備費（筆電、軟體、網路）"
                value={beforeData.equipmentCost}
                onChange={(v) => updateBeforeData({ equipmentCost: v })}
              />
              <CurrencyInput
                label="考照或檢定費"
                value={beforeData.certificationFee}
                onChange={(v) => updateBeforeData({ certificationFee: v })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CalculationSummary
        items={[
          { label: "事前可用資源", value: calculations.totalResources, type: "positive" },
          { label: "事前預估支出", value: calculations.totalExpenses, type: "negative" },
        ]}
        resultLabel="事前剩餘資金"
        resultValue={calculations.remaining}
        riskLevel={calculations.riskLevel}
        message={getMessage()}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回時間軸
        </Button>
        <Button onClick={onNext}>
          下一步：進修期間
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
