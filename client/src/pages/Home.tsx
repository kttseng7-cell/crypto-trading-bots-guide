/* 
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Hero section with gradient text and modern layout
 * - Bot cards with hover effects and clear visual hierarchy
 * - Professional color scheme with tech blue accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Grid3x3, 
  Repeat, 
  DollarSign, 
  Target, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Activity
} from "lucide-react";
import { Link } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

const bots = [
  {
    name: "馬丁格爾機器人",
    description: "逢低加倉，攤平成本，適合看好長期趨勢的投資者",
    icon: TrendingDown,
    href: "/martingale",
    risk: "高",
    reward: "高",
    difficulty: "中",
    bestFor: "震盪下跌",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "網格交易機器人",
    description: "低買高賣，自動套利，最適合震盪行情的策略",
    icon: Grid3x3,
    href: "/grid",
    risk: "中",
    reward: "中",
    difficulty: "低",
    bestFor: "橫盤震盪",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "期現套利機器人",
    description: "賺取資金費率，低風險穩定收益，適合保守投資者",
    icon: Repeat,
    href: "/arbitrage",
    risk: "低",
    reward: "中",
    difficulty: "中",
    bestFor: "任何行情",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    name: "定投機器人 (DCA)",
    description: "定期定額投資，平滑成本，最適合長期持有",
    icon: DollarSign,
    href: "/dca",
    risk: "低",
    reward: "中",
    difficulty: "低",
    bestFor: "長期投資",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "波段追蹤機器人",
    description: "追蹤趨勢，自動買賣，適合單邊行情",
    icon: Target,
    href: "/trailing",
    risk: "中",
    reward: "高",
    difficulty: "中",
    bestFor: "單邊趨勢",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const features = [
  {
    icon: Activity,
    title: "24/7 自動交易",
    description: "機器人全天候運作，不錯過任何交易機會"
  },
  {
    icon: CheckCircle2,
    title: "克服人性弱點",
    description: "嚴格執行策略，避免情緒化決策"
  },
  {
    icon: TrendingUp,
    title: "多樣化策略",
    description: "針對不同行情選擇最適合的交易策略"
  },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-20 lg:py-28">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                新手友善 · 深入淺出
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                虛擬貨幣交易機器人
                <span className="block text-gradient mt-2">完全指南</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                從原理到實戰，深入解析各類交易機器人的運作方式、參數設定與適用行情。
                提供互動式模擬器，讓新手也能輕鬆上手自動化交易。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/overview">
                  <Button size="lg" className="gap-2">
                    開始學習
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/guide">
                  <Button size="lg" variant="outline" className="gap-2">
                    新手指南
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">為什麼使用交易機器人？</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bots Grid Section */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">探索交易機器人類型</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              每種機器人都有其獨特的運作原理和適用場景，選擇最適合你的策略
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot, index) => {
              const Icon = bot.icon;
              return (
                <Link key={index} href={bot.href}>
                  <Card className="h-full border-border hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className={`w-14 h-14 ${bot.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-7 h-7 ${bot.color}`} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {bot.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {bot.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">風險等級</span>
                          <Badge variant={bot.risk === "高" ? "destructive" : bot.risk === "中" ? "default" : "secondary"}>
                            {bot.risk}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">收益潛力</span>
                          <Badge variant={bot.reward === "高" ? "default" : "secondary"}>
                            {bot.reward}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">適用行情</span>
                          <span className="font-medium text-foreground">{bot.bestFor}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        了解詳情
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">風險提示</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                虛擬貨幣交易具有高風險性，使用交易機器人前請充分了解其運作原理與風險。
                本網站僅提供教育性內容，不構成投資建議。請謹慎評估自身風險承受能力。
              </p>
              <Link href="/guide">
                <Button size="lg" variant="outline">
                  閱讀新手指南
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
