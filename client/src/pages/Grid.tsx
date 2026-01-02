/*
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Interactive grid visualization with animated price movements
 * - Three grid types: Standard, Infinite, and Reverse
 * - Real-time profit calculation simulator
 */

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid3x3, 
  Info, 
  Calculator, 
  TrendingUp,
  DollarSign,
  Percent,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Scatter, ScatterChart, ZAxis } from "recharts";

export default function Grid() {
  // Standard Grid Parameters
  const [upperLimit, setUpperLimit] = useState([11000]);
  const [lowerLimit, setLowerLimit] = useState([9000]);
  const [gridNumber, setGridNumber] = useState([80]);
  const [investment, setInvestment] = useState([10000]);

  // Calculate grid data
  const gridData = useMemo(() => {
    const data = [];
    const priceRange = upperLimit[0] - lowerLimit[0];
    const gridSize = priceRange / gridNumber[0];
    const profitPerGrid = ((upperLimit[0] / lowerLimit[0]) ** (1 / gridNumber[0]) - 1) * 100;
    
    for (let i = 0; i <= gridNumber[0]; i++) {
      const price = lowerLimit[0] + gridSize * i;
      data.push({
        grid: i,
        price: price.toFixed(2),
        type: i === 0 ? "lower" : i === gridNumber[0] ? "upper" : "middle"
      });
    }
    
    return { grids: data, profitPerGrid: profitPerGrid.toFixed(3) };
  }, [upperLimit, lowerLimit, gridNumber]);

  // Simulate price movement and trades
  const simulationData = useMemo(() => {
    const data = [];
    let price = (upperLimit[0] + lowerLimit[0]) / 2; // Start at middle
    const volatility = (upperLimit[0] - lowerLimit[0]) * 0.05;
    let trades = 0;
    let profit = 0;
    
    for (let i = 0; i < 100; i++) {
      // Random walk
      const change = (Math.random() - 0.5) * volatility;
      price = Math.max(lowerLimit[0], Math.min(upperLimit[0], price + change));
      
      // Check if crossed a grid line
      const gridSize = (upperLimit[0] - lowerLimit[0]) / gridNumber[0];
      if (Math.abs(change) > gridSize * 0.5) {
        trades++;
        profit += investment[0] * parseFloat(gridData.profitPerGrid) / 100 / gridNumber[0];
      }
      
      data.push({
        time: i,
        price: price,
        trades: trades,
        profit: profit.toFixed(2),
        upper: upperLimit[0],
        lower: lowerLimit[0]
      });
    }
    
    return data;
  }, [upperLimit, lowerLimit, gridNumber, investment, gridData.profitPerGrid]);

  const finalTrades = simulationData[simulationData.length - 1].trades;
  const finalProfit = simulationData[simulationData.length - 1].profit;
  const roi = ((parseFloat(finalProfit) / investment[0]) * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-500/10 via-background to-background border-b border-border">
          <div className="container py-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Grid3x3 className="w-7 h-7 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">網格交易機器人</h1>
                  <Badge>中風險</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  低買高賣，自動套利，最適合震盪行情的交易策略
                </p>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="standard" className="container py-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="standard">標準網格</TabsTrigger>
            <TabsTrigger value="infinite">無限網格</TabsTrigger>
            <TabsTrigger value="reverse">反向網格</TabsTrigger>
          </TabsList>

          {/* Standard Grid Tab */}
          <TabsContent value="standard" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">標準網格原理</CardTitle>
                <CardDescription>在固定價格區間內低買高賣</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed">
                    標準網格是最經典的網格交易策略。在設定的<strong>價格區間</strong>內，機器人會自動劃分多個<strong>網格</strong>，
                    每當價格下穿網格線就<strong className="trading-green">買入</strong>，
                    上穿網格線就<strong className="trading-red">賣出</strong>，
                    透過頻繁的低買高賣來累積收益。
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ArrowUpDown className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">設定價格區間</h3>
                    <p className="text-sm text-muted-foreground">
                      根據技術分析設定上限和下限，覆蓋預期的波動範圍
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Grid3x3 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">劃分網格數量</h3>
                    <p className="text-sm text-muted-foreground">
                      將價格區間分成多個網格，每個網格都是一個交易機會
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Percent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">自動低買高賣</h3>
                    <p className="text-sm text-muted-foreground">
                      價格波動時自動執行交易，每次套利賺取固定百分比
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    計算範例
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">價格區間：$9,000 - $11,000</p>
                        <p className="text-muted-foreground">網格數量：80 個</p>
                        <p className="text-muted-foreground">每格價差：$25</p>
                        <p className="text-muted-foreground">每格利潤率：約 0.28%</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">投資金額：$10,000</p>
                        <p className="text-muted-foreground">預期交易次數：100 次/月</p>
                        <p className="text-muted-foreground">單次套利收益：$2.8</p>
                        <p className="text-green-500 font-semibold">月收益：約 $280（2.8%）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">網格視覺化</CardTitle>
                <CardDescription>觀察價格在網格間波動時的交易情況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.015 250)" />
                      <XAxis 
                        dataKey="time" 
                        stroke="oklch(0.60 0.01 250)"
                        label={{ value: '時間', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        stroke="oklch(0.60 0.01 250)"
                        domain={[lowerLimit[0] * 0.95, upperLimit[0] * 1.05]}
                        label={{ value: '價格 (USDT)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'oklch(0.16 0.015 250)', 
                          border: '1px solid oklch(0.25 0.015 250)',
                          borderRadius: '8px'
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'price') return [`$${parseFloat(value).toFixed(2)}`, '價格'];
                          if (name === 'trades') return [value, '交易次數'];
                          if (name === 'profit') return [`$${value}`, '累計收益'];
                          return [value, name];
                        }}
                      />
                      
                      {/* Grid lines */}
                      {gridData.grids.filter((_, i) => i % 10 === 0).map((grid, index) => (
                        <ReferenceLine 
                          key={index}
                          y={parseFloat(grid.price)} 
                          stroke="oklch(0.60 0.01 250 / 0.3)" 
                          strokeDasharray="3 3"
                        />
                      ))}
                      
                      <ReferenceLine 
                        y={upperLimit[0]} 
                        stroke="oklch(0.60 0.22 25)" 
                        strokeWidth={2}
                        label={{ value: '上限', position: 'right' }}
                      />
                      <ReferenceLine 
                        y={lowerLimit[0]} 
                        stroke="oklch(0.65 0.20 145)" 
                        strokeWidth={2}
                        label={{ value: '下限', position: 'right' }}
                      />
                      
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="oklch(0.60 0.20 250)" 
                        strokeWidth={2}
                        dot={false}
                        name="price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.60_0.20_250)]"></div>
                    <span className="text-muted-foreground">價格走勢</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.60_0.01_250_/_0.3)] border-dashed border-t-2"></div>
                    <span className="text-muted-foreground">網格線</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.60_0.22_25)]"></div>
                    <span className="text-muted-foreground">上限</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[oklch(0.65_0.20_145)]"></div>
                    <span className="text-muted-foreground">下限</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parameter Simulator */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    參數調整器
                  </CardTitle>
                  <CardDescription>調整參數查看預期收益</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">價格上限</label>
                      <span className="text-sm font-mono text-primary">${upperLimit[0]}</span>
                    </div>
                    <Slider
                      value={upperLimit}
                      onValueChange={setUpperLimit}
                      min={lowerLimit[0] + 1000}
                      max={15000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">價格下限</label>
                      <span className="text-sm font-mono text-primary">${lowerLimit[0]}</span>
                    </div>
                    <Slider
                      value={lowerLimit}
                      onValueChange={setLowerLimit}
                      min={5000}
                      max={upperLimit[0] - 1000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">網格數量</label>
                      <span className="text-sm font-mono text-primary">{gridNumber[0]} 個</span>
                    </div>
                    <Slider
                      value={gridNumber}
                      onValueChange={setGridNumber}
                      min={20}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      每格利潤率：{gridData.profitPerGrid}%
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">投資金額</label>
                      <span className="text-sm font-mono text-primary">${investment[0]}</span>
                    </div>
                    <Slider
                      value={investment}
                      onValueChange={setInvestment}
                      min={1000}
                      max={50000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">模擬結果</CardTitle>
                    <CardDescription>基於隨機價格波動的模擬</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <Percent className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">每格利潤率</span>
                      </div>
                      <span className="text-xl font-bold font-mono">{gridData.profitPerGrid}%</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <ArrowUpDown className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-muted-foreground">交易次數</span>
                      </div>
                      <span className="text-xl font-bold font-mono">{finalTrades} 次</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-muted-foreground">累計收益</span>
                      </div>
                      <span className="text-xl font-bold font-mono text-green-500">${finalProfit}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-muted-foreground">投資回報率</span>
                      </div>
                      <span className="text-xl font-bold font-mono text-green-500">+{roi}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="ml-2 text-sm">
                    模擬結果僅供參考，實際收益受市場波動性、交易頻率、手續費等因素影響
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">參數設定建議</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      價格區間設定
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>保守型：</strong>當前價格 ±20%（適合主流幣）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>均衡型：</strong>當前價格 ±30-40%（推薦）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>激進型：</strong>當前價格 ±50%以上（高波動幣）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>參考技術分析的支撐位和阻力位</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      網格數量設定
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>小區間（{'<'}20%）：</strong>20-50 個網格</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>中區間（20%-50%）：</strong>50-100 個網格</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>大區間（{'>'}50%）：</strong>100-200 個網格</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>建議每格利潤率：主流幣 0.3%-0.5%，山寨幣 1%-2%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infinite Grid Tab */}
          <TabsContent value="infinite" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">無限網格原理</CardTitle>
                <CardDescription>適合單邊上漲行情的網格策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed">
                    無限網格是標準網格的變體，<strong>沒有價格上限</strong>，只設定下限。
                    適合<strong>長期看漲</strong>的資產，當價格持續上漲時，機器人會不斷賣出部分持倉獲利，
                    但<strong>總價值保持恆定</strong>，實現「賺幣不賺錢」的效果。
                  </p>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">核心特點</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-500">✓ 無上限設計</h4>
                      <p className="text-sm text-muted-foreground">
                        價格可以無限上漲，不會錯過牛市行情
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-500">✓ 價值恆定</h4>
                      <p className="text-sm text-muted-foreground">
                        持幣數量減少，但總價值（幣+現金）保持不變
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-500">✓ 持續獲利</h4>
                      <p className="text-sm text-muted-foreground">
                        每次價格上漲都會觸發賣出，累積現金收益
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-500">✓ 風險較低</h4>
                      <p className="text-sm text-muted-foreground">
                        只要價格不跌破下限，就不會虧損
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">運作範例</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong>初始狀態：</strong>BTC 價格 $60,000，投入 1 BTC（價值 $60,000）
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">價格 $66,000</div>
                        <div className="font-semibold">賣出 0.1 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          持有：0.9 BTC + $6,600<br/>
                          總價值：$66,000
                        </div>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">價格 $72,000</div>
                        <div className="font-semibold">賣出 0.1 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          持有：0.8 BTC + $13,800<br/>
                          總價值：$71,400
                        </div>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">價格 $80,000</div>
                        <div className="font-semibold">賣出 0.1 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          持有：0.7 BTC + $22,800<br/>
                          總價值：$78,800
                        </div>
                      </div>
                    </div>
                    <p className="text-green-500 font-semibold mt-4">
                      結論：持幣減少但總價值持續增長，同時累積了現金收益
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">參數設定指南</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">1. 單網格利潤率</h3>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold text-sm mb-1">主流幣</div>
                        <div className="text-primary font-mono">0.5%-1%</div>
                        <div className="text-xs text-muted-foreground mt-2">BTC、ETH 等</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold text-sm mb-1">中型幣</div>
                        <div className="text-primary font-mono">1%-2%</div>
                        <div className="text-xs text-muted-foreground mt-2">SOL、AVAX 等</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold text-sm mb-1">高波動幣</div>
                        <div className="text-primary font-mono">2%-3%</div>
                        <div className="text-xs text-muted-foreground mt-2">小市值幣種</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">2. 價格下限設定</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>設定在歷史低點附近，預留 20%-30% 安全邊際</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>範例：BTC 當前 $60,000，歷史低點 $15,000，建議下限 $12,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>考慮極端行情的可能性，寧可保守</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">3. 資金配置</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold text-sm mb-2">看漲行情</div>
                        <div className="text-sm text-muted-foreground">
                          初始持幣：50%-60%<br/>
                          網格買入預留：40%-50%
                        </div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold text-sm mb-2">震盪行情</div>
                        <div className="text-sm text-muted-foreground">
                          初始持幣：30%-40%<br/>
                          網格買入預留：60%-70%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reverse Grid Tab */}
          <TabsContent value="reverse" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">反向網格原理</CardTitle>
                <CardDescription>適合下跌行情的囤幣策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed">
                    反向網格是<strong>做空式網格</strong>，與標準網格相反。
                    當價格<strong>上漲時賣出</strong>，<strong>下跌時買入</strong>，
                    目標是在價格下跌過程中<strong>增加持幣數量</strong>，
                    適合看好長期但預期短期下跌的情況。
                  </p>
                </div>

                <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">運作邏輯</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-500 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">高位開倉</h4>
                        <p className="text-sm text-muted-foreground">
                          在相對高點賣出持有的幣種，獲得 USDT
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-500 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">下跌買入</h4>
                        <p className="text-sm text-muted-foreground">
                          價格每下跌一個網格，就用 USDT 買入更多幣
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-500 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">增加持倉</h4>
                        <p className="text-sm text-muted-foreground">
                          最終持幣數量增加，平均成本降低
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">實戰範例</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong>初始狀態：</strong>持有 1 BTC，當前價格 $60,000，預期下跌至 $40,000
                    </p>
                    <div className="grid md:grid-cols-4 gap-3 mt-4">
                      <div className="p-3 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">$60,000</div>
                        <div className="font-semibold text-sm trading-red">賣出 0.2 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          獲得 $12,000
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">$54,000</div>
                        <div className="font-semibold text-sm trading-green">買入 0.22 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          花費 $12,000
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">$48,000</div>
                        <div className="font-semibold text-sm trading-green">買入 0.25 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          額外投入
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">結果</div>
                        <div className="font-semibold text-sm text-green-500">持有 1.27 BTC</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          增加 27%
                        </div>
                      </div>
                    </div>
                    <p className="text-green-500 font-semibold mt-4">
                      結論：透過高賣低買，成功增加持幣數量，降低平均成本
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">參數設定與風險</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">參數建議</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">價格區間</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span><strong>上限：</strong>當前價格 × 1.2-1.5（進場價）</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span><strong>下限：</strong>當前價格 × 0.5-0.7（目標價）</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">網格數量</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span><strong>保守：</strong>30-50 個（每格 2%-3%）</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span><strong>激進：</strong>100-150 個（每格 0.5%-1%）</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Alert className="border-yellow-500/50 bg-yellow-500/5">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <AlertDescription className="ml-2">
                      <strong>風險提示：</strong>反向網格的最大風險是<strong>價格持續上漲</strong>。
                      如果價格突破上限繼續上漲，會導致持幣數量減少，錯失上漲收益。
                      建議設定自動止損價格，避免持幣數減少過多。
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="font-semibold mb-3">適用場景</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-green-500 mb-2">✓ 適合使用</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 牛市回調期，預期短期下跌</li>
                          <li>• 長期看好，想趁低點增加持倉</li>
                          <li>• 價格在相對高位，有下跌空間</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-red-500 mb-2">✗ 不適合使用</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 單邊上漲行情</li>
                          <li>• 突破關鍵阻力位後</li>
                          <li>• 市場 FOMO 情緒濃厚時</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
