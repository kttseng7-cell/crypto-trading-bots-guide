/*
 * Placeholder page for bot types with basic information
 */

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Repeat, DollarSign, Target } from "lucide-react";

interface PlaceholderProps {
  type: "arbitrage" | "dca" | "trailing";
}

const botInfo = {
  arbitrage: {
    name: "期現套利機器人",
    icon: Repeat,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    risk: "低",
    description: "透過同時持有現貨和做空合約，賺取資金費率收益，適合追求穩定收益的保守投資者",
    features: [
      "低風險穩定收益",
      "年化收益 10%-50%",
      "適合任何行情",
      "需要理解合約交易"
    ]
  },
  dca: {
    name: "定投機器人 (DCA)",
    icon: DollarSign,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    risk: "低",
    description: "定期定額投資，平滑成本波動，最適合長期持有優質資產的投資策略",
    features: [
      "簡單易懂，適合新手",
      "平滑價格波動",
      "長期收益可觀",
      "適合定期投入"
    ]
  },
  trailing: {
    name: "波段追蹤機器人",
    icon: Target,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    risk: "中",
    description: "追蹤價格趨勢，自動買入賣出，適合捕捉單邊行情的波段收益",
    features: [
      "自動追蹤最高/最低點",
      "適合趨勢行情",
      "收益潛力高",
      "需要判斷趨勢"
    ]
  }
};

export default function Placeholder({ type }: PlaceholderProps) {
  const info = botInfo[type];
  const Icon = info.icon;

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className={`bg-gradient-to-br from-${info.color.split('-')[1]}-500/10 via-background to-background border-b border-border`}>
          <div className="container py-12">
            <Link href="/overview">
              <Button variant="ghost" className="mb-4 gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回總覽
              </Button>
            </Link>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-7 h-7 ${info.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{info.name}</h1>
                  <Badge variant={info.risk === "低" ? "secondary" : "default"}>{info.risk}風險</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {info.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">核心特點</CardTitle>
              <CardDescription>了解這個機器人的主要優勢</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {info.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              詳細的參數設定、模擬器和實戰案例正在準備中...
            </p>
            <Link href="/overview">
              <Button>
                查看其他機器人
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
