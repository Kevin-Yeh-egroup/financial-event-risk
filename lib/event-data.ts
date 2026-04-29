import { 
  Briefcase, 
  GraduationCap, 
  Home, 
  AlertTriangle, 
  CreditCard, 
  Compass,
  type LucideIcon 
} from "lucide-react";

export type RiskLevel = "safe" | "warning" | "danger";

export interface EventCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  available: boolean;
}

export interface Persona {
  id: string;
  title: string;
  description: string;
}

export interface TimelineStage {
  id: "before" | "during" | "after";
  title: string;
  question: string;
  explanation: string;
}

export const eventCategories: EventCategory[] = [
  {
    id: "income-change",
    title: "收入變動",
    description: "失業、工時減少、轉職、接案不穩",
    icon: Briefcase,
    available: false,
  },
  {
    id: "skill-investment",
    title: "能力投資",
    description: "進修、考證照、學新技能、準備轉換職涯",
    icon: GraduationCap,
    available: true,
  },
  {
    id: "family-responsibility",
    title: "家庭責任變動",
    description: "育兒、照顧長輩、單親、家庭支持責任增加",
    icon: Home,
    available: false,
  },
  {
    id: "sudden-risk",
    title: "突發風險事件",
    description: "生病、意外、詐騙、法律或金錢糾紛",
    icon: AlertTriangle,
    available: false,
  },
  {
    id: "debt-pressure",
    title: "債務與信用壓力",
    description: "卡費、貸款、分期、保證人、民間借款",
    icon: CreditCard,
    available: false,
  },
  {
    id: "lifestyle-transition",
    title: "生活型態轉換",
    description: "創業、斜槓、副業、退休後再就業",
    icon: Compass,
    available: false,
  },
];

export const skillInvestmentPersonas: Persona[] = [
  {
    id: "fresh-graduate",
    title: "畢業新鮮人",
    description: "剛離開校園，可能有學貸、低存款，但希望透過進修提升未來收入。",
  },
  {
    id: "mid-career",
    title: "中年轉職",
    description: "原工作中斷或收入不穩，需要透過進修重新銜接職涯與家庭生計。",
  },
  {
    id: "parental-return",
    title: "婚育復職",
    description: "離開職場一段時間後，想透過進修回到工作市場，但需兼顧托育與家庭支出。",
  },
  {
    id: "stressed-side-hustle",
    title: "高壓斜槓",
    description: "想透過進修發展副業或第二收入，但原本生活與家庭責任已經很吃緊。",
  },
  {
    id: "digital-migrant",
    title: "數位移民",
    description: "已有職涯資歷，但面對AI與數位轉型壓力，需要重新補強能力。",
  },
  {
    id: "senior-reemployment",
    title: "老年再就業",
    description: "年長後仍有工作或收入需求，希望從體力型工作轉向較適合的數位或行政工作。",
  },
];

export const timelineStages: TimelineStage[] = [
  {
    id: "before",
    title: "事前｜準備期",
    question: "要不要開始？",
    explanation: "開始進修前，不只要看學費，也要看你是否有足夠資源承接啟動成本。若一開始就把存款用光，後面容易被迫中斷。",
  },
  {
    id: "during",
    title: "事中｜進行期",
    question: "能不能撐過？",
    explanation: "進修期間最大的壓力通常不是單筆學費，而是每個月持續發生的生活支出。如果收入減少，現金流會比想像中更快吃緊。",
  },
  {
    id: "after",
    title: "事後｜銜接期",
    question: "能不能接上收入？",
    explanation: "很多人以為結訓就是壓力結束，但真正容易卡住的是結訓後到第一份收入進來之前。這段時間需要生活費、面試費、交通費，也可能開始面對債務還款。",
  },
];

export const beforeRiskReminders = [
  "只算課程費，沒有算設備、證照與交通",
  "還沒確認補助或家人支持，就先刷卡或分期",
  "沒有預留第一個月生活費",
  "低估學貸、保費、房租等固定支出",
];

export const duringRiskReminders = [
  "收入減少，但房租、餐費、交通與貸款仍持續",
  "為了買設備或撐生活，開始依賴分期或先買後付",
  "AI工具、軟體、網路、社群費用逐月增加",
  "補助或津貼核撥有時間差",
  "臨時醫療、交通或家庭支出打亂原本預算",
];

export const afterRiskReminders = [
  "結訓後不一定立刻找到工作",
  "找到工作後，也可能要等一個月才領到完整薪水",
  "面試、治裝、交通、作品集都需要成本",
  "進修期間延後的卡費、學貸或分期開始累積壓力",
  "若收入提高，也可能影響部分補助資格",
];

export function getRiskLevel(value: number): RiskLevel {
  if (value >= 0) return "safe";
  if (value >= -10000) return "warning";
  return "danger";
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "safe":
      return "bg-risk-safe text-white";
    case "warning":
      return "bg-risk-warning text-foreground";
    case "danger":
      return "bg-risk-danger text-white";
  }
}

export function getRiskLabel(level: RiskLevel): string {
  switch (level) {
    case "safe":
      return "穩定";
    case "warning":
      return "需留意";
    case "danger":
      return "需優先處理";
  }
}
