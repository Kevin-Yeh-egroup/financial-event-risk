import type { BeforeStageData, DuringStageData, AfterStageData } from "./calculator-store";

export interface SampleScenario {
  personaId: string;
  label: string;
  description: string;
  before: BeforeStageData;
  during: DuringStageData;
  after: AfterStageData;
}

/**
 * 中年轉職 — 陳先生，45 歲
 *
 * 背景：傳統製造業業務主管，主動辭職後準備轉入數位行銷領域。
 * 月收入歸零，但前公司老客戶偶爾委託接案。
 * 有一名國小子女，配偶為主要家庭收入來源。
 *
 * 事前：資源看似充裕（40 萬餘）→ 穩定
 * 事中：8 個月後幾乎燒光緩衝（剩 2.4 萬）→ 穩定（但非常緊繃）
 * 事後：銜接 3 個月缺口高達 21.3 萬 → 需優先處理
 */
export const midCareerSample: SampleScenario = {
  personaId: "mid-career",
  label: "中年轉職範例",
  description: "45 歲業務主管轉型數位行銷，8 個月全職進修",
  before: {
    savings: 450000,       // 個人積蓄
    tuitionFee: 95000,     // 6 個月數位行銷課程（分兩期繳）
    equipmentCost: 42000,  // 新筆電 + 周邊設備
    certificationFee: 8000, // Google Analytics、Meta Blueprint 認證費
    expectedSubsidy: 65000, // 職訓局課程補助
    familySupport: 30000,   // 配偶提供一次性啟動支援
    otherResources: 0,
  },
  during: {
    monthsOfStudy: 8,
    monthlyIncome: 0,       // 全職進修，無薪水
    monthlyFreelance: 20000, // 前公司老客戶偶爾委託接案
    monthlyRent: 22000,     // 租屋（含管理費）
    monthlyFood: 15000,     // 家庭餐費
    monthlyTransport: 4000, // 交通（接送小孩 + 通勤）
    monthlyLoanPayment: 12000, // 信用貸款月繳
    monthlyInsurance: 6000, // 人壽 + 醫療保險
    monthlySubscriptions: 1200, // 學習平台、雲端工具訂閱
    monthlyOther: 6800,    // 子女才藝費、水電雜支
  },
  after: {
    transitionMonths: 3,
    monthlyLivingCost: 55000, // 房租 + 餐費 + 交通 + 保險 + 訂閱 + 雜支（不含貸款）
    interviewTransport: 8000, // 三個月面試車資、停車費
    professionalAttire: 20000, // 重新備置數位業界職場服裝
    portfolioCost: 5000,    // 個人作品集網站建置
    resumingLoanPayment: 12000, // 信貸每月恢復全額繳款
    otherTransitionCost: 3000, // 健身房會員（維持體力）、名片印刷等
  },
};

/**
 * 未來可擴充其他角色的模擬情境
 */
export const sampleScenarios: Record<string, SampleScenario> = {
  "mid-career": midCareerSample,
};
