/*
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Comprehensive comparison table with interactive elements
 * - Market condition matrix with visual indicators
 * - Clean data presentation with proper spacing
 */

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Grid3x3, 
  Repeat, 
  DollarSign, 
  Target,
  Check,
  X,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const bots = [
  {
    name: "馬丁格爾",
    icon: TrendingDown,
    risk: 5,
    reward: 4,
    difficulty: 3,
    capital: 5,
    bestMarket: "震盪下跌",
    yearlyReturn: "10-30%",
    href: "/martingale",
    color: "text-orange-500",
  },
  {
    name: "標準網格",
    icon: Grid3x3,
    risk: 3,
    reward: 3,
    difficulty: 2,
    capital: 3,
    bestMarket: "震盪向上",
    yearlyReturn: "20-40%",
    href: "/grid",
    color: "text-blue-500",
  },
  {
    name: "無限網格",
    icon: Grid3x3,
    risk: 2,
    reward: 3,
    difficulty: 2,
    capital: 3,
    bestMarket: "單邊上漲",
    yearlyReturn: "20-40%",
    href: "/grid#infinite",
    color: "text-blue-600",
  },
  {
    name: "反向網格",
    icon: Grid3x3,
    risk: 3,
    reward: 3,
    difficulty: 3,
    capital: 4,
    bestMarket: "震盪下跌",
    yearlyReturn: "15-35%",
    href: "/grid#reverse",
    color: "text-blue-700",
  },
  {
    name: "期現套利",
    icon: Repeat,
    risk: 2,
    reward: 3,
    difficulty: 3,
    capital: 3,
    bestMarket: "任何行情",
    yearlyReturn: "10-50%",
    href: "/arbitrage",
    color: "text-green-500",
  },
  {
    name: "定投 DCA",
    icon: DollarSign,
    risk: 2,
    reward: 3,
    difficulty: 1,
    capital: 2,
    bestMarket: "長期投資",
    yearlyReturn: "30-50%",
    href: "/dca",
    color: "text-purple-500",
  },
  {
    name: "波段追蹤",
    icon: Target,
    risk: 3,
    reward: 4,
    difficulty: 3,
    capital: 3,
    bestMarket: "單邊趨勢",
    yearlyReturn: "20-60%",
    href: "/trailing",
    color: "text-pink-500",
  },
];

const marketConditions = [
  { name: "震盪上漲", martingale: "warning", grid: "good", infinite: "good", reverse: "warning", arbitrage: "good", dca: "good", trailing: "warning" },
  { name: "單邊上漲", martingale: "bad", grid: "warning", infinite: "good", reverse: "bad", arbitrage: "good", dca: "warning", trailing: "good" },
  { name: "震盪下跌", martingale: "good", grid: "warning", infinite: "bad", reverse: "good", arbitrage: "good", dca: "good", trailing: "warning" },
  { name: "單邊下跌", martingale: "warning", grid: "bad", infinite: "bad", reverse: "good", arbitrage: "good", dca: "warning", trailing: "bad" },
  { name: "橫盤震盪", martingale: "warning", grid: "good", infinite: "warning", reverse: "warning", arbitrage: "good", dca: "good", trailing: "bad" },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-2 h-2 rounded-full ${
            star <= rating ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

function MarketFitIndicator({ status }: { status: string }) {
  if (status === "good") {
    return (
      <div className="flex items-center justify-center">
        <Check className="w-5 h-5 text-green-500" />
      </div>
    );
  }
  if (status === "warning") {
    return (
      <div className="flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <X className="w-5 h-5 text-red-500" />
    </div>
  );
}

export default function Overview() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
          <div className="container py-12">
            <h1 className="text-4xl font-bold mb-4">機器人總覽</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              全面比較各類交易機器人的特性、風險與收益，幫助你選擇最適合的策略
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="container py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">機器人特性比較</CardTitle>
              <CardDescription>
                從風險、收益、難度、資金需求等多個維度評估各類機器人
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">機器人類型</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">風險等級</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">收益潛力</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">操作難度</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">資金需求</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">適用行情</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">年化收益</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bots.map((bot, index) => {
                      const Icon = bot.icon;
                      return (
                        <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${bot.color}`} />
                              <span className="font-medium">{bot.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <RatingStars rating={bot.risk} />
                          </td>
                          <td className="py-4 px-4">
                            <RatingStars rating={bot.reward} />
                          </td>
                          <td className="py-4 px-4">
                            <RatingStars rating={bot.difficulty} />
                          </td>
                          <td className="py-4 px-4">
                            <RatingStars rating={bot.capital} />
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{bot.bestMarket}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm">{bot.yearlyReturn}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Link href={bot.href}>
                              <Button size="sm" variant="ghost" className="gap-1">
                                詳情
                                <ArrowRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  評級僅供參考，實際表現受市場環境、參數設定、幣種選擇等多種因素影響
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Market Condition Matrix */}
        <section className="container py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">行情適配矩陣</CardTitle>
              <CardDescription>
                不同市場環境下各類機器人的適用程度
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">市場環境</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">馬丁格爾</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">標準網格</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">無限網格</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">反向網格</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">期現套利</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">定投 DCA</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">波段追蹤</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketConditions.map((condition, index) => (
                      <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="py-4 px-4 font-medium">{condition.name}</td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.martingale} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.grid} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.infinite} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.reverse} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.arbitrage} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.dca} />
                        </td>
                        <td className="py-4 px-4">
                          <MarketFitIndicator status={condition.trailing} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">非常適合</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-muted-foreground">可以使用</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">不建議</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Decision Guide */}
        <section className="container py-12 pb-20">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">如何選擇適合的機器人？</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      根據市場環境
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      觀察當前市場是震盪、上漲還是下跌，選擇對應的機器人類型
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      評估資金規模
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      馬丁格爾需要較大資金，定投和網格適合小資金起步
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      明確投資目標
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      追求穩定收益選期現套利，追求高收益可選馬丁格爾或波段追蹤
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      了解風險承受度
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      風險承受度低選期現套利或定投，高風險承受度可選馬丁格爾
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
