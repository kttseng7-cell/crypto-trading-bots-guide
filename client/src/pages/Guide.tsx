/*
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Step-by-step guide with clear visual hierarchy
 * - Decision tree for bot selection
 * - Risk management best practices
 */

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Shield,
  Target,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    number: 1,
    title: "了解市場環境",
    description: "判斷當前是牛市、熊市還是震盪市",
    icon: TrendingUp,
    tips: [
      "觀察主流幣（BTC、ETH）的趨勢",
      "查看市場情緒指標（恐懼貪婪指數）",
      "分析技術指標（MA、RSI、MACD）",
      "關注重大新聞事件"
    ]
  },
  {
    number: 2,
    title: "選擇合適的機器人",
    description: "根據市場環境和風險承受度選擇策略",
    icon: Target,
    tips: [
      "震盪行情 → 標準網格",
      "單邊上漲 → 無限網格",
      "震盪下跌 → 馬丁格爾或反向網格",
      "任何行情 → 期現套利（穩健）",
      "長期投資 → 定投 DCA"
    ]
  },
  {
    number: 3,
    title: "設定合理參數",
    description: "根據資金規模和風險偏好調整參數",
    icon: Lightbulb,
    tips: [
      "新手建議從保守參數開始",
      "小資金避免使用馬丁格爾",
      "參考歷史數據設定價格區間",
      "預留充足資金應對極端行情"
    ]
  },
  {
    number: 4,
    title: "風險管理",
    description: "設定止損止盈，分散投資",
    icon: Shield,
    tips: [
      "單一機器人投入不超過總資金 20%",
      "設定最大虧損閾值",
      "定期檢視並調整參數",
      "記錄每次交易的收益與經驗"
    ]
  }
];

const decisionTree = [
  {
    question: "你的風險承受度如何？",
    options: [
      { answer: "低風險，追求穩定", recommendation: "期現套利", href: "/arbitrage" },
      { answer: "中等風險，平衡收益", recommendation: "網格交易", href: "/grid" },
      { answer: "高風險，追求高收益", recommendation: "馬丁格爾", href: "/martingale" }
    ]
  },
  {
    question: "你的資金規模？",
    options: [
      { answer: "小資金（< 1000 USDT）", recommendation: "定投 DCA", href: "/dca" },
      { answer: "中等資金（1000-5000 USDT）", recommendation: "標準網格", href: "/grid" },
      { answer: "大資金（> 5000 USDT）", recommendation: "多策略組合", href: "/overview" }
    ]
  },
  {
    question: "當前市場環境？",
    options: [
      { answer: "震盪行情", recommendation: "標準網格", href: "/grid" },
      { answer: "單邊上漲", recommendation: "無限網格", href: "/grid#infinite" },
      { answer: "震盪下跌", recommendation: "馬丁格爾", href: "/martingale" }
    ]
  }
];

const riskManagement = [
  {
    title: "資金配置原則",
    icon: Shield,
    items: [
      "低風險策略（期現套利、定投）：50%",
      "中風險策略（標準網格、無限網格）：30%",
      "高風險策略（馬丁格爾、合約網格）：20%",
      "保留 10%-20% 現金應對機會"
    ]
  },
  {
    title: "風險控制檢查清單",
    icon: CheckCircle2,
    items: [
      "✓ 單一機器人投入不超過總資金 20%",
      "✓ 高風險策略總計不超過 30%",
      "✓ 設定每個機器人的止損線",
      "✓ 定期檢視並調整參數",
      "✓ 記錄每次交易的收益與經驗"
    ]
  },
  {
    title: "常見錯誤避免",
    icon: AlertTriangle,
    items: [
      "✗ 頻繁調整參數（至少運行 1 週再調整）",
      "✗ 追逐熱點（盲目跟風高收益幣種）",
      "✗ 過度槓桿（超過 3x 槓桿風險劇增）",
      "✗ 忽視風險（不設止損）",
      "✗ 全倉單一策略（缺乏分散）"
    ]
  }
];

export default function Guide() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-purple-500/10 via-background to-background border-b border-border">
          <div className="container py-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">新手學習指南</h1>
                  <Badge variant="secondary">入門必讀</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  從零開始，一步步學會使用交易機器人
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className="container py-8">
          <Alert className="border-destructive/50 bg-destructive/5">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-base ml-2">
              <strong>重要提醒：</strong>虛擬貨幣交易具有高風險性，可能導致本金損失。
              使用交易機器人前請充分了解其運作原理與風險，僅投入可承受損失的資金。
              本網站僅提供教育性內容，不構成投資建議。
            </AlertDescription>
          </Alert>
        </section>

        {/* Step-by-Step Guide */}
        <section className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">四步驟開始使用</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">步驟 {step.number}</Badge>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Decision Tree */}
        <section className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">如何選擇機器人？</h2>
          <div className="space-y-6">
            {decisionTree.map((node, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{node.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {node.options.map((option, optionIndex) => (
                      <Link key={optionIndex} href={option.href}>
                        <div className="p-4 bg-muted/50 rounded-lg hover:bg-primary/10 hover:border-primary/50 border border-transparent transition-all cursor-pointer group">
                          <div className="text-sm text-muted-foreground mb-2">{option.answer}</div>
                          <div className="font-semibold text-primary group-hover:text-primary flex items-center gap-2">
                            {option.recommendation}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risk Management */}
        <section className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">風險管理與資金配置</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {riskManagement.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Start */}
        <section className="container py-12 pb-20">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">準備好開始了嗎？</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                選擇一個適合你的機器人，開始你的自動化交易之旅
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/overview">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    查看所有機器人
                  </button>
                </Link>
                <Link href="/grid">
                  <button className="px-6 py-3 bg-background border border-border rounded-lg font-semibold hover:bg-accent transition-colors">
                    從網格交易開始
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
