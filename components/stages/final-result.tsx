"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskIndicator } from "@/components/risk-indicator";
import { useCalculatorStore } from "@/lib/calculator-store";
import { getRiskLabel } from "@/lib/event-data";
import { 
  ArrowLeft, 
  RefreshCcw, 
  Download, 
  Calendar,
  Wallet,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FinalResultProps {
  onBack: () => void;
  onReset: () => void;
  onAction: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function FinalResult({ onBack, onReset, onAction }: FinalResultProps) {
  const { getOverallCalculations, duringData } = useCalculatorStore();
  const overall = getOverallCalculations();
  
  const getStageLabel = (stage: "before" | "during" | "after") => {
    switch (stage) {
      case "before": return "事前準備期";
      case "during": return "事中進行期";
      case "after": return "事後銜接期";
    }
  };
  
  const getOverallStatus = () => {
    const dangerCount = [overall.beforeRisk, overall.duringRisk, overall.afterRisk].filter(r => r === "danger").length;
    const warningCount = [overall.beforeRisk, overall.duringRisk, overall.afterRisk].filter(r => r === "warning").length;
    
    if (dangerCount >= 2) return "danger";
    if (dangerCount >= 1 || warningCount >= 2) return "warning";
    return "safe";
  };
  
  const overallStatus = getOverallStatus();
  
  const getInterpretation = () => {
    if (overallStatus === "danger") {
      return {
        icon: AlertTriangle,
        title: "目前不建議直接開始，建議先補強安全墊",
        content: "你可能在完成進修前就出現現金流中斷。建議先降低一次性成本、確認補助、增加短期收入，或延後進修時間。",
        color: "text-risk-danger",
        bg: "bg-risk-danger/10",
      };
    }
    if (overallStatus === "warning") {
      return {
        icon: Info,
        title: "可以開始規劃，但需要先處理關鍵缺口",
        content: "你的計畫有機會執行，但某一階段會出現壓力。建議針對最高風險階段做調整。",
        color: "text-risk-warning",
        bg: "bg-risk-warning/10",
      };
    }
    return {
      icon: CheckCircle,
      title: "目前具備較穩定的承接能力",
      content: "你已經具備較完整的資源與緩衝，可以進一步規劃進修後的收入提升與回本期。",
      color: "text-risk-safe",
      bg: "bg-risk-safe/10",
    };
  };
  
  const interpretation = getInterpretation();
  const InterpretationIcon = interpretation.icon;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          你的財務風險集中在哪一段？
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          以下結果根據你填寫的事前、事中、事後資料進行初步估算。
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">進修總成本</p>
                <p className="text-lg font-bold">{formatCurrency(overall.totalCost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-risk-safe/10 text-risk-safe">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">可動用資源</p>
                <p className="text-lg font-bold">{formatCurrency(overall.totalResources)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                overall.totalGap >= 0 ? "bg-risk-safe/10 text-risk-safe" : "bg-risk-danger/10 text-risk-danger"
              )}>
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">預估資金缺口</p>
                <p className={cn(
                  "text-lg font-bold",
                  overall.totalGap >= 0 ? "text-risk-safe" : "text-risk-danger"
                )}>
                  {formatCurrency(Math.abs(overall.totalGap))}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {overall.totalGap >= 0 ? "餘" : "缺"}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30 text-accent-foreground">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">預估可支撐月數</p>
                <p className="text-lg font-bold">{overall.supportableMonths} 個月</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">時間軸風險分布</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <RiskIndicator label="事前準備期" level={overall.beforeRisk} />
          <RiskIndicator label="事中進行期" level={overall.duringRisk} />
          <RiskIndicator label="事後銜接期" level={overall.afterRisk} />
          
          <div className="mt-4 rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium text-foreground">
              最大風險階段：
              <span className={cn(
                "ml-1",
                overall[`${overall.highestRiskStage}Risk`] === "danger" && "text-risk-danger",
                overall[`${overall.highestRiskStage}Risk`] === "warning" && "text-risk-warning",
                overall[`${overall.highestRiskStage}Risk`] === "safe" && "text-risk-safe"
              )}>
                {getStageLabel(overall.highestRiskStage)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">現金流時間線</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {["開始", "第1個月", `第${Math.floor(duringData.monthsOfStudy/2)}個月`, "結訓", "第一份收入前"].map((label, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px]">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  index === 0 && "bg-primary",
                  index > 0 && index < 4 && "bg-risk-warning",
                  index === 4 && "bg-risk-safe"
                )} />
                <div className="mt-1 h-8 w-px bg-border" />
                <p className="text-xs text-muted-foreground text-center">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="flex h-full">
              <div className="h-full bg-primary" style={{ width: "20%" }} />
              <div className="h-full bg-risk-warning" style={{ width: "50%" }} />
              <div className="h-full bg-risk-safe" style={{ width: "30%" }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card className={cn("border-2", interpretation.bg)}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", interpretation.bg)}>
              <InterpretationIcon className={cn("h-6 w-6", interpretation.color)} />
            </div>
            <div>
              <h3 className={cn("text-lg font-semibold", interpretation.color)}>
                {interpretation.title}
              </h3>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                {interpretation.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回上一步
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          重新調整數字
        </Button>
        <Button onClick={onAction}>
          查看下一步建議
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
}
