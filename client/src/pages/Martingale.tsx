/*
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Interactive parameter simulator with real-time calculations
 * - Animated visualization of martingale strategy
 * - Clear risk warnings with professional styling
 */

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingDown, 
  AlertTriangle, 
  Calculator, 
  TrendingUp,
  DollarSign,
  Repeat,
  Target,
  Info
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";

export default function Martingale() {
  // Parameter state
  const [dropPercent, setDropPercent] = useState([3]);
  const [profitPercent, setProfitPercent] = useState([3]);
  const [multiplier, setMultiplier] = useState([1.5]);
  const [maxOrders, setMaxOrders] = useState([8]);
  const [firstOrderAmount, setFirstOrderAmount] = useState([100]);

  // Calculate martingale sequence
  const martingaleData = useMemo(() => {
    const data = [];
    let totalInvestment = 0;
    let totalCoins = 0;
    let currentPrice = 10000; // Starting price
    
    for (let i = 0; i < maxOrders[0]; i++) {
      const orderAmount = firstOrderAmount[0] * Math.pow(multiplier[0], i);
      totalInvestment += orderAmount;
      const coins = orderAmount / currentPrice;
      totalCoins += coins;
      const avgCost = totalInvestment / totalCoins;
      const breakEvenPrice = avgCost * (1 + profitPercent[0] / 100);
      
      data.push({
        order: i + 1,
        price: currentPrice,
        amount: orderAmount.toFixed(2),
        totalInvestment: totalInvestment.toFixed(2),
        avgCost: avgCost.toFixed(2),
        breakEvenPrice: breakEvenPrice.toFixed(2),
        coins: coins.toFixed(4),
        totalCoins: totalCoins.toFixed(4),
      });
      
      currentPrice = currentPrice * (1 - dropPercent[0] / 100);
    }
    
    return data;
  }, [dropPercent, profitPercent, multiplier, maxOrders, firstOrderAmount]);

  // Calculate price chart data
  const priceChartData = useMemo(() => {
    const data = [];
    let price = 10000;
    const avgCost = parseFloat(martingaleData[martingaleData.length - 1].avgCost);
    const breakEven = parseFloat(martingaleData[martingaleData.length - 1].breakEvenPrice);
    
    // Downtrend
    for (let i = 0; i <= maxOrders[0]; i++) {
      data.push({
        step: i,
        price: price,
        avgCost: i > 0 ? parseFloat(martingaleData[Math.min(i - 1, martingaleData.length - 1)].avgCost) : null,
        breakEven: i > 0 ? parseFloat(martingaleData[Math.min(i - 1, martingaleData.length - 1)].breakEvenPrice) : null,
      });
      if (i < maxOrders[0]) {
        price = price * (1 - dropPercent[0] / 100);
      }
    }
    
    // Recovery
    const recoverySteps = 15;
    const priceIncrement = (breakEven - price) / recoverySteps;
    for (let i = 1; i <= recoverySteps; i++) {
      data.push({
        step: maxOrders[0] + i,
        price: price + priceIncrement * i,
        avgCost: avgCost,
        breakEven: breakEven,
      });
    }
    
    return data;
  }, [martingaleData, dropPercent, maxOrders]);

  const totalCapitalNeeded = parseFloat(martingaleData[martingaleData.length - 1].totalInvestment);
  const avgCost = parseFloat(martingaleData[martingaleData.length - 1].avgCost);
  const breakEvenPrice = parseFloat(martingaleData[martingaleData.length - 1].breakEvenPrice);
  const maxDrawdown = ((10000 - avgCost) / 10000 * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-orange-500/10 via-background to-background border-b border-border">
          <div className="container py-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">馬丁格爾機器人</h1>
                  <Badge variant="destructive">高風險</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  逢低加倉策略，透過倍投攤平成本，適合看好長期趨勢的投資者
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
              <strong>風險警告：</strong>馬丁格爾策略在極端下跌行情中可能耗盡資金。請確保：
              (1) 選擇長期看漲的優質資產，(2) 預留充足資金應對極端情況，(3) 設定合理的止損線。
            </AlertDescription>
          </Alert>
        </section>

        <Tabs defaultValue="principle" className="container py-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="principle">運作原理</TabsTrigger>
            <TabsTrigger value="simulator">參數模擬器</TabsTrigger>
            <TabsTrigger value="parameters">參數詳解</TabsTrigger>
            <TabsTrigger value="cases">實戰案例</TabsTrigger>
          </TabsList>

          {/* Principle Tab */}
          <TabsContent value="principle" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">核心原理</CardTitle>
                <CardDescription>馬丁格爾策略如何運作？</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed">
                    馬丁格爾機器人是一種<strong>逢低加倉</strong>的交易策略。當價格下跌時，機器人會自動買入更多資產，
                    透過增加持倉量來<strong>攤平平均成本</strong>。當價格反彈超過平均成本加上目標利潤時，機器人會賣出所有持倉，
                    完成一輪套利。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-orange-500" />
                      價格下跌階段
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>首單買入後，價格每下跌設定百分比（如 3%）就觸發加倉</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>每次加倉金額是上一次的倍數（如 1.5 倍或 2 倍）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>持續加倉直到達到最大次數或價格反彈</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      價格反彈階段
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>計算所有持倉的平均成本</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>當價格超過平均成本 + 目標利潤（如 3%）時觸發止盈</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>賣出所有持倉，完成一輪交易，開始下一輪</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    計算範例
                  </h3>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground mb-1">首單：$10,000 買入 100 USDT</p>
                        <p className="text-muted-foreground mb-1">價格跌 3%：$9,700 買入 150 USDT</p>
                        <p className="text-muted-foreground mb-1">價格跌 3%：$9,409 買入 225 USDT</p>
                        <p className="text-muted-foreground">總投入：475 USDT</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">持倉量：0.0490 BTC</p>
                        <p className="text-muted-foreground mb-1">平均成本：$9,694</p>
                        <p className="text-muted-foreground mb-1">回本價格：$9,985（+3%）</p>
                        <p className="text-green-500 font-semibold">預期收益：+14.25 USDT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">價格走勢與加倉視覺化</CardTitle>
                <CardDescription>觀察馬丁格爾策略如何應對價格波動</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceChartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.60 0.20 250)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="oklch(0.60 0.20 250)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.015 250)" />
                      <XAxis 
                        dataKey="step" 
                        stroke="oklch(0.60 0.01 250)"
                        label={{ value: '時間步驟', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        stroke="oklch(0.60 0.01 250)"
                        label={{ value: '價格 (USDT)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'oklch(0.16 0.015 250)', 
                          border: '1px solid oklch(0.25 0.015 250)',
                          borderRadius: '8px'
                        }}
                      />
                      <ReferenceLine 
                        y={10000} 
                        stroke="oklch(0.60 0.01 250)" 
                        strokeDasharray="3 3" 
                        label="初始價格"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="oklch(0.60 0.20 250)" 
                        strokeWidth={2}
                        fill="url(#colorPrice)" 
                        name="價格"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avgCost" 
                        stroke="oklch(0.75 0.15 60)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="平均成本"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="breakEven" 
                        stroke="oklch(0.65 0.20 145)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="回本價格"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.60_0.20_250)]"></div>
                    <span className="text-muted-foreground">價格走勢</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.75_0.15_60)] border-dashed border-t-2"></div>
                    <span className="text-muted-foreground">平均成本</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.65_0.20_145)] border-dashed border-t-2"></div>
                    <span className="text-muted-foreground">回本價格（止盈點）</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-8 mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Parameter Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    參數調整器
                  </CardTitle>
                  <CardDescription>調整參數查看即時計算結果</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">跌多少加倉</label>
                      <span className="text-sm font-mono text-primary">{dropPercent[0]}%</span>
                    </div>
                    <Slider
                      value={dropPercent}
                      onValueChange={setDropPercent}
                      min={0.5}
                      max={10}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      價格每下跌此百分比就觸發一次加倉
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">賺多少止盈</label>
                      <span className="text-sm font-mono text-primary">{profitPercent[0]}%</span>
                    </div>
                    <Slider
                      value={profitPercent}
                      onValueChange={setProfitPercent}
                      min={0.5}
                      max={10}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      價格反彈超過平均成本此百分比就止盈
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">加倉倍投倍數</label>
                      <span className="text-sm font-mono text-primary">{multiplier[0]}x</span>
                    </div>
                    <Slider
                      value={multiplier}
                      onValueChange={setMultiplier}
                      min={1}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      每次加倉金額是上一次的多少倍
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">最大加倉次數</label>
                      <span className="text-sm font-mono text-primary">{maxOrders[0]} 次</span>
                    </div>
                    <Slider
                      value={maxOrders}
                      onValueChange={setMaxOrders}
                      min={3}
                      max={15}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      本輪最多分幾次來抄底
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">首單金額</label>
                      <span className="text-sm font-mono text-primary">{firstOrderAmount[0]} USDT</span>
                    </div>
                    <Slider
                      value={firstOrderAmount}
                      onValueChange={setFirstOrderAmount}
                      min={50}
                      max={1000}
                      step={50}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      第一次買入的金額
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">計算結果</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">總資金需求</span>
                      </div>
                      <span className="text-xl font-bold font-mono">{totalCapitalNeeded.toFixed(2)} USDT</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">平均成本</span>
                      </div>
                      <span className="text-xl font-bold font-mono">{avgCost.toFixed(2)} USDT</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-muted-foreground">回本價格</span>
                      </div>
                      <span className="text-xl font-bold font-mono">{breakEvenPrice.toFixed(2)} USDT</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-muted-foreground">最大回撤</span>
                      </div>
                      <span className="text-xl font-bold font-mono text-red-500">-{maxDrawdown}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">加倉明細</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {martingaleData.map((order, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                              {order.order}
                            </div>
                            <div>
                              <div className="font-medium">${order.price}</div>
                              <div className="text-xs text-muted-foreground">{order.amount} USDT</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xs text-muted-foreground">
                              累計: {order.totalInvestment} USDT
                            </div>
                            <div className="font-mono text-xs text-muted-foreground">
                              成本: ${order.avgCost}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Parameters Tab */}
          <TabsContent value="parameters" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">參數詳細說明</CardTitle>
                <CardDescription>深入了解每個參數的設定技巧</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {[
                  {
                    icon: TrendingDown,
                    title: "跌多少加倉（Price Drop Trigger）",
                    description: "每一輪中，首單買入後價格下跌多少時觸發加倉",
                    recommendations: [
                      { type: "保守型", value: "5%-10%", desc: "適合新手，降低資金消耗速度" },
                      { type: "均衡型", value: "2%-5%", desc: "適合一般投資者，平衡收益與風險" },
                      { type: "激進型", value: "0.5%-2%", desc: "需要大量資金，追求快速攤平成本" },
                    ],
                    tips: "波動大的山寨幣建議設定較大跌幅（5%-10%），主流幣可設定較小跌幅（1%-3%）"
                  },
                  {
                    icon: Target,
                    title: "賺多少止盈（Take Profit Percentage）",
                    description: "每輪分批抄底並反彈時，達到多少獲利比例就止盈賣出",
                    recommendations: [
                      { type: "保守型", value: "1%-2%", desc: "快速回本，降低風險" },
                      { type: "均衡型", value: "3%-5%", desc: "平衡收益與成交頻率" },
                      { type: "激進型", value: "5%-10%", desc: "追求更高收益，但可能等待較久" },
                    ],
                    tips: "震盪行情設定較低止盈（1%-3%），趨勢行情可設定較高止盈（5%-10%）"
                  },
                  {
                    icon: Repeat,
                    title: "加倉倍投倍數（Multiplier）",
                    description: "每次加倉時，投入金額是上一次的多少倍",
                    recommendations: [
                      { type: "1.0倍", value: "等額加倉", desc: "資金消耗慢，適合長期佈局" },
                      { type: "1.5倍", value: "中等倍投", desc: "平衡資金使用與降本效果" },
                      { type: "2.0倍", value: "標準馬丁", desc: "資金消耗快，降本效果最佳" },
                    ],
                    tips: "倍數越高，資金消耗越快，需確保有足夠資金支撐。新手建議從 1.5 倍開始"
                  },
                  {
                    icon: DollarSign,
                    title: "最大加倉次數（Max Orders）",
                    description: "本次運行時，最多分幾次來抄底",
                    recommendations: [
                      { type: "小資金", value: "3-5次", desc: "總資金 < 1000 USDT" },
                      { type: "中等資金", value: "5-8次", desc: "總資金 1000-5000 USDT" },
                      { type: "大資金", value: "8-15次", desc: "總資金 > 5000 USDT" },
                    ],
                    tips: "計算公式：總資金需求 = 首單金額 × (倍數^次數 - 1) / (倍數 - 1)"
                  },
                ].map((param, index) => {
                  const Icon = param.icon;
                  return (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{param.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{param.description}</p>
                          
                          <div className="grid md:grid-cols-3 gap-3 mb-4">
                            {param.recommendations.map((rec, recIndex) => (
                              <div key={recIndex} className="p-4 bg-muted/50 rounded-lg">
                                <div className="font-semibold text-sm mb-1">{rec.type}</div>
                                <div className="text-primary font-mono text-sm mb-2">{rec.value}</div>
                                <div className="text-xs text-muted-foreground">{rec.desc}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{param.tips}</p>
                          </div>
                        </div>
                      </div>
                      {index < 3 && <div className="border-t border-border" />}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">實戰案例分析</CardTitle>
                <CardDescription>真實場景下的參數設定與預期表現</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {[
                    {
                      title: "案例一：BTC 震盪下跌（保守型）",
                      scenario: "BTC 價格 $60,000，預期震盪下跌至 $50,000 後反彈",
                      params: {
                        "跌多少加倉": "5%",
                        "賺多少止盈": "3%",
                        "加倉倍投倍數": "1.5x",
                        "最大加倉次數": "6次",
                        "首單金額": "200 USDT",
                        "總資金需求": "約 2,300 USDT"
                      },
                      expected: {
                        "單次收益": "3%-8%",
                        "風險等級": "中",
                        "適用行情": "震盪下跌後反彈"
                      },
                      color: "border-blue-500/30 bg-blue-500/5"
                    },
                    {
                      title: "案例二：ETH 深度回調（均衡型）",
                      scenario: "ETH 價格 $3,000，預期回調至 $2,000 後築底反彈",
                      params: {
                        "跌多少加倉": "3%",
                        "賺多少止盈": "5%",
                        "加倉倍投倍數": "1.5x",
                        "最大加倉次數": "10次",
                        "首單金額": "150 USDT",
                        "總資金需求": "約 8,600 USDT"
                      },
                      expected: {
                        "單次收益": "5%-15%",
                        "風險等級": "中高",
                        "適用行情": "深度回調後反彈"
                      },
                      color: "border-purple-500/30 bg-purple-500/5"
                    },
                    {
                      title: "案例三：山寨幣抄底（激進型）",
                      scenario: "小市值幣種暴跌 50%，預期反彈 20%-30%",
                      params: {
                        "跌多少加倉": "8%",
                        "賺多少止盈": "10%",
                        "加倉倍投倍數": "2.0x",
                        "最大加倉次數": "5次",
                        "首單金額": "100 USDT",
                        "總資金需求": "約 3,100 USDT"
                      },
                      expected: {
                        "單次收益": "10%-30%",
                        "風險等級": "極高",
                        "適用行情": "暴跌後短期反彈"
                      },
                      color: "border-orange-500/30 bg-orange-500/5"
                    }
                  ].map((caseStudy, index) => (
                    <Card key={index} className={`${caseStudy.color} border`}>
                      <CardHeader>
                        <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                        <CardDescription>{caseStudy.scenario}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">參數設定</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {Object.entries(caseStudy.params).map(([key, value], paramIndex) => (
                              <div key={paramIndex} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <span className="text-sm text-muted-foreground">{key}</span>
                                <span className="text-sm font-semibold font-mono">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">預期表現</h4>
                          <div className="grid md:grid-cols-3 gap-3">
                            {Object.entries(caseStudy.expected).map(([key, value], expIndex) => (
                              <div key={expIndex} className="p-3 bg-background rounded-lg">
                                <div className="text-xs text-muted-foreground mb-1">{key}</div>
                                <div className="text-sm font-semibold">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Alert className="border-yellow-500/50 bg-yellow-500/5">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <AlertDescription className="ml-2">
                    <strong>重要提醒：</strong>以上案例僅供參考，實際收益受市場環境、執行時機等多種因素影響。
                    請根據自身風險承受能力調整參數，切勿盲目追求高收益。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
