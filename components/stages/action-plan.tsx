"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCalculatorStore } from "@/lib/calculator-store";
import { 
  ArrowLeft, 
  RefreshCcw, 
  Download, 
  ExternalLink,
  Wallet,
  TrendingUp,
  Calendar,
  Users,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionPlanProps {
  onBack: () => void;
  onReset: () => void;
}

interface ActionCard {
  icon: typeof Wallet;
  title: string;
  details: string;
  priority: "high" | "medium" | "low";
}

export function ActionPlan({ onBack, onReset }: ActionPlanProps) {
  const { getOverallCalculations } = useCalculatorStore();
  const overall = getOverallCalculations();
  
  const getActions = (): ActionCard[] => {
    const actions: ActionCard[] = [];
    
    // Before stage actions
    if (overall.beforeRisk === "danger" || overall.beforeRisk === "warning") {
      actions.push({
        icon: Wallet,
        title: "先降低啟動成本",
        details: "比較課程費、找免費或補助課程、先租借設備，不急著一次買齊。也可以考慮分期付款或尋找獎學金機會。",
        priority: overall.beforeRisk === "danger" ? "high" : "medium",
      });
    }
    
    // During stage actions
    if (overall.duringRisk === "danger" || overall.duringRisk === "warning") {
      actions.push({
        icon: TrendingUp,
        title: "建立進修期間現金流",
        details: "安排每週可負擔的兼職、接案或補助申請，避免完全依靠分期或借款。可以考慮線上接案、家教等彈性工作。",
        priority: overall.duringRisk === "danger" ? "high" : "medium",
      });
    }
    
    // After stage actions
    if (overall.afterRisk === "danger" || overall.afterRisk === "warning") {
      actions.push({
        icon: Calendar,
        title: "預留銜接期生活費",
        details: "至少準備 1–2 個月基本生活費，避免結訓後到第一份收入前出現斷裂。提早開始投履歷和準備面試。",
        priority: overall.afterRisk === "danger" ? "high" : "medium",
      });
    }
    
    // Universal action
    actions.push({
      icon: Users,
      title: "整理可用資源",
      details: "包含家人支持、政府補助、社福資源、就業服務、債務協商、財務諮詢。可以主動聯繫相關單位了解申請資格。",
      priority: "medium",
    });
    
    return actions;
  };
  
  const actions = getActions();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          接下來可以先做這幾件事
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          根據你的風險分析，我們建議你優先處理以下事項。
        </p>
      </div>

      {/* Action Cards */}
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className={cn(
                "transition-all hover:shadow-md",
                action.priority === "high" && "border-risk-danger/30 bg-risk-danger/5",
                action.priority === "medium" && "border-risk-warning/30 bg-risk-warning/5"
              )}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    action.priority === "high" && "bg-risk-danger/10 text-risk-danger",
                    action.priority === "medium" && "bg-risk-warning/10 text-risk-warning",
                    action.priority === "low" && "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {action.title}
                      </h3>
                      {action.priority === "high" && (
                        <span className="rounded-full bg-risk-danger/10 px-2 py-0.5 text-xs font-medium text-risk-danger">
                          優先處理
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-muted-foreground leading-relaxed">
                      {action.details}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="bg-accent/10 border-accent/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-5 w-5 text-accent-foreground" />
            小提醒
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              本工具提供初步財務風險盤點，不取代社工、法律、醫療或金融專業建議
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              實際費用可能因地區、課程、個人情況而有差異
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              建議定期更新數字，隨時調整計畫
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* CTA Buttons */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" onClick={onReset} className="w-full">
          <RefreshCcw className="mr-2 h-4 w-4" />
          重新調整我的數字
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          下載盤點摘要
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回結果頁
        </Button>
        <Button variant="secondary" className="flex-1">
          前往好理家在其他工具
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        <Button className="flex-1">
          預約線上財務諮詢
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
