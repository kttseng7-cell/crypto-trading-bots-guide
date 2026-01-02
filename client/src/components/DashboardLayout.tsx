/* 
 * Design Philosophy: FinTech Aesthetics - 科技金融美學
 * - Clean sidebar navigation with clear hierarchy
 * - Professional dark theme for financial applications
 * - Smooth transitions and micro-interactions
 */

import { Bot, Home, TrendingUp, Grid3x3, Repeat, DollarSign, Target, BookOpen } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "首頁", href: "/", icon: Home },
  { name: "機器人總覽", href: "/overview", icon: Bot },
  { 
    name: "馬丁格爾", 
    href: "/martingale", 
    icon: TrendingUp,
    description: "逢低加倉策略"
  },
  { 
    name: "網格交易", 
    href: "/grid", 
    icon: Grid3x3,
    description: "震盪套利策略"
  },
  { 
    name: "期現套利", 
    href: "/arbitrage", 
    icon: Repeat,
    description: "資金費率套利"
  },
  { 
    name: "定投機器人", 
    href: "/dca", 
    icon: DollarSign,
    description: "定期定額投資"
  },
  { 
    name: "波段追蹤", 
    href: "/trailing", 
    icon: Target,
    description: "趨勢追蹤策略"
  },
  { 
    name: "學習指南", 
    href: "/guide", 
    icon: BookOpen,
    description: "新手教學"
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 mb-8 cursor-pointer group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  交易機器人
                </h1>
                <p className="text-xs text-muted-foreground">完全指南</p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0 mt-0.5",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "text-sm font-medium",
                        isActive ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {item.name}
                      </div>
                      {item.description && (
                        <div className={cn(
                          "text-xs mt-0.5",
                          isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border mt-auto">
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">© 2026 交易機器人指南</p>
            <p>專為新手打造的學習平台</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
