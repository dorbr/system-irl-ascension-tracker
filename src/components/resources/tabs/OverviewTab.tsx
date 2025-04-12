
import React from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourcesOverviewChart } from "@/components/resources/ResourcesOverviewChart";
import { ExpenseBreakdownChart } from "@/components/resources/ExpenseBreakdownChart";
import { NetWorthTrendChart } from "@/components/resources/NetWorthTrendChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Droplet, PiggyBank, Zap } from "lucide-react";

export const OverviewTab = () => {
  const { summary, setTimeRange, timeRange } = useResources();
  const { t, isRtl } = useLanguage();
  
  // Format values as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <Tabs 
        defaultValue={timeRange} 
        value={timeRange} 
        onValueChange={(value) => setTimeRange(value as any)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
          <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
          <TabsTrigger value="allTime">{t('allTime')}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-card bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <Coins className="h-8 w-8 text-yellow-500 mb-1" />
              <h3 className="text-xs text-muted-foreground">{t('totalGold')}</h3>
              <p className="text-xl font-bold text-yellow-500">{formatCurrency(summary.totalGold)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <Droplet className="h-8 w-8 text-blue-500 mb-1" />
              <h3 className="text-xs text-muted-foreground">{t('totalMana')}</h3>
              <p className="text-xl font-bold text-blue-500">{formatCurrency(summary.totalMana)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <PiggyBank className="h-8 w-8 text-green-500 mb-1" />
              <h3 className="text-xs text-muted-foreground">{t('totalNet')}</h3>
              <p className={`text-xl font-bold ${summary.netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(summary.netWorth)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <Zap className="h-8 w-8 text-purple-500 mb-1" />
              <h3 className="text-xs text-muted-foreground">{t('passiveBuffs')}</h3>
              <p className="text-xl font-bold text-purple-500">{formatCurrency(summary.totalPassiveBuffs)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t('overviewTab')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourcesOverviewChart />
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t('expenseBreakdown')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseBreakdownChart />
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t('netWorthTrend')}</CardTitle>
        </CardHeader>
        <CardContent>
          <NetWorthTrendChart />
        </CardContent>
      </Card>
    </div>
  );
};
