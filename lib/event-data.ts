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

export interface PersonaTimeline {
  beforeTitle: string;
  before: string;
  duringTitle: string;
  during: string;
  afterTitle: string;
  after: string;
}

export interface Persona {
  id: string;
  title: string;
  description: string;
  age: string;
  traits: string[];
  environment: string;
  resources: string[];
  timeline: PersonaTimeline;
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
    age: "22–26 歲",
    traits: ["收入起步期", "可能有學貸", "存款薄弱", "財務管理經驗少"],
    environment: "與家人同住或剛開始獨立租屋，工作年資淺，職場人脈尚在建立中",
    resources: ["政府青年就業補助", "學校就業輔導資源", "家庭支援（視家庭狀況）"],
    timeline: {
      beforeTitle: "事前：補助資格先確認",
      before: "存款薄弱是最大門檻，加上學貸可能已在身上，啟動資金壓力很實際。建議優先查清楚政府青年就業補助的申請資格，並與家人確認是否有緊急支援空間，再決定是否啟動。",
      duringTitle: "事中：兼職收入的波動風險",
      during: "兼職是常見的補貼方式，但收入不穩定，一旦出現設備損壞、突發醫療或交通費，很容易讓預算缺口瞬間擴大。進修期間幾乎沒有存款緩衝，需要特別謹慎。",
      afterTitle: "事後：人脈從零、時間要留夠",
      after: "沒有職場人脈與實戰履歷，第一份工作的求職往往比想像久。建議不要假設「結訓後馬上有工作」，至少多預留 2–3 個月的生活費，讓自己不必在最需要靜下來找工作的時候焦慮現金。",
    },
  },
  {
    id: "mid-career",
    title: "中年轉職",
    description: "原工作中斷或收入不穩，需要透過進修重新銜接職涯與家庭生計。",
    age: "35–50 歲",
    traits: ["有家庭責任", "職場資歷豐富", "對不確定性承受度較低", "心理壓力大"],
    environment: "多數已成家，有房貸或長期租約，子女教育費用同步發生，伴侶可能共同撐起家庭",
    resources: ["資遣費或個人積蓄", "政府失業給付", "伴侶薪資（若有）"],
    timeline: {
      beforeTitle: "事前：資金能撐完整個週期嗎？",
      before: "手頭資金（資遣費＋積蓄）能否撐完「進修期 + 銜接空窗期」是最關鍵的問題。家庭的固定支出——房貸、保費、孩子費用——一天都不會停，這才是真正的燒錢速度基準。",
      duringTitle: "事中：家庭固定支出是最大壓力源",
      during: "即使收入歸零，房貸、子女費用、保險等帳單仍每月如期發生。進修時間越長，資金消耗越快，任何「多讀一個月」的決定都需要重新盤點還有多少資金可用。",
      afterTitle: "事後：薪資期望與市場現實的落差",
      after: "年資豐富不代表薪資要求會被市場接受，年齡因素也可能讓部分職缺受限。這段時間需要主動建立新領域的人脈，並且準備好一套說明「過往經驗如何在新方向發揮」的敘事。",
    },
  },
  {
    id: "parental-return",
    title: "婚育復職",
    description: "離開職場一段時間後，想透過進修回到工作市場，但需兼顧托育與家庭支出。",
    age: "28–38 歲",
    traits: ["照顧者角色為主", "時間碎片化", "技能有空窗感", "需要彈性工作安排"],
    environment: "家中有幼兒或學齡兒童，通常由伴侶支撐家庭主要收入，居住穩定但可動用資金有限",
    resources: ["伴侶薪資", "政府育兒補助", "家人協助托育（若有）", "婦女就業相關補助"],
    timeline: {
      beforeTitle: "事前：托育安排是進修的前提",
      before: "進修能不能開始，取決於托育有沒有著落。托育費用是額外增加的固定支出，必須在試算學費之前就先計入，否則啟動後才發現資金不夠，退出的代價更大。",
      duringTitle: "事中：兩份帳單、一個人的時間",
      during: "托育費與進修費同時並行，加上孩子的作息讓學習時間被切成碎片，很難維持高效率。進修時程可能需要比預期拉長，資金計畫也要跟著調整。",
      afterTitle: "事後：彈性條件縮小了求職範圍",
      after: "重回職場的條件往往附帶「需要彈性工時」或「不能太常加班」，這些要求會篩掉部分職缺。求職期間可能拉長，過渡生活費需要多留，不能只算「找到工作就好」。",
    },
  },
  {
    id: "stressed-side-hustle",
    title: "高壓斜槓",
    description: "想透過進修發展副業或第二收入，但原本生活與家庭責任已經很吃緊。",
    age: "28–40 歲",
    traits: ["高效率主動型", "容易過勞", "生活已全速運轉", "儲蓄空間有限"],
    environment: "有正職工作但薪資成長停滯，可能已有家庭責任，每月生活費幾乎消耗殆盡",
    resources: ["主業穩定薪資", "有限積蓄", "偶爾接案收入"],
    timeline: {
      beforeTitle: "事前：學費從哪裡來？",
      before: "不需要放棄主業，這是優勢，但學費只能從本就緊繃的生活費中擠出，預備金幾乎為零。若啟動後遇到家電壞掉、突發醫療，財務餘裕幾乎沒有，需要在開始前想清楚。",
      duringTitle: "事中：三線並行，哪一條先斷？",
      during: "正職、進修、日常生活三條線同時在跑，身心消耗比想像中大。一旦碰上工作加班旺季或家庭突發狀況，進修幾乎是第一個被犧牲的。這個脆弱點要提前想好如何應對。",
      afterTitle: "事後：副業有沒有真的起飛？",
      after: "副業收入能否穩定落地，才是整場投資值不值得的驗證點。如果沒有達到預期，損失不只是學費，而是這段時間省吃儉用的生活品質，以及沒有存下來的儲蓄。",
    },
  },
  {
    id: "digital-migrant",
    title: "數位移民",
    description: "已有職涯資歷，但面對AI與數位轉型壓力，需要重新補強能力。",
    age: "40–55 歲",
    traits: ["傳統產業資歷豐厚", "學習曲線較陡", "求穩心態為主", "對數位工具有適應壓力"],
    environment: "目前仍在職，薪資穩定但感受到 AI 與數位化帶來的職涯威脅，可能仍有房貸或子女學費支出",
    resources: ["穩定薪資", "相對豐厚的個人積蓄", "公司可能提供部分培訓補助"],
    timeline: {
      beforeTitle: "事前：選對技能，才是真正的投資",
      before: "資金通常不是最大問題，但方向錯了才是真正的浪費。在決定課程前，建議先研究職缺市場的需求趨勢，確認所學技能有對應的工作出口，而不是只看「AI很夯」就跟風。",
      duringTitle: "事中：在職學習，進度比想像慢",
      during: "不需要辭職，生活壓力較小，但在職進修的學習效率往往被高估。工作疲勞、長期沒有學習習慣、課程跟不上——這些都是真實障礙。選課程時難度要適中，留好中途調整的空間。",
      afterTitle: "事後：技能有沒有真正落地才是重點",
      after: "結訓只是開始，能否真正把新技能整合進現有工作、或應徵到對應職位，才是衡量這場投資值不值得的關鍵。一張結訓證書本身不等於職涯改變，需要主動創造應用的機會。",
    },
  },
  {
    id: "senior-reemployment",
    title: "老年再就業",
    description: "年長後仍有工作或收入需求，希望從體力型工作轉向較適合的數位或行政工作。",
    age: "55–65 歲",
    traits: ["體力逐漸下降", "重視工作環境友善度", "對收入期望務實", "希望工作穩定輕鬆"],
    environment: "子女多已獨立，房貸可能已還清，但健康醫療支出逐漸增加，退休金仍在累積規劃中",
    resources: ["勞保退休金規劃", "個人積蓄", "政府銀髮就業輔導計畫"],
    timeline: {
      beforeTitle: "事前：量力選課，健康也是成本",
      before: "在決定進修之前，需要誠實評估自身健康狀況與目前的學習能力。選擇難度合理的課程，並預留一筆醫療彈性資金——若進修期間健康出狀況，這筆錢會比學費更關鍵。",
      duringTitle: "事中：慢一點沒關係，放棄才貴",
      during: "學習速度比年輕時慢是正常的，需要更多反覆練習才能熟悉。不要選強度或進度過快的課程，因為一旦跟不上而中途放棄，之前投入的學費與時間就全部歸零了。",
      afterTitle: "事後：務實調整期望，善用現有資源",
      after: "年齡有時會讓求職機會受限，薪資水準也需要務實面對——這不是失敗，而是現實盤點。建議優先善用政府銀髮就業媒合計畫，以及過去累積的人脈與口碑介紹，這是最有效的管道。",
    },
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
