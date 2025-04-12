
import React from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend
} from "recharts";

export const ExpenseBreakdownChart = () => {
  const { categoryBreakdown } = useResources();
  const { t } = useLanguage();
  
  // Skip the chart if there's no data
  if (categoryBreakdown.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
        <p>{t('noResourceEntries')}</p>
      </div>
    );
  }
  
  // Colors for different categories
  const COLORS = [
    "#3B82F6", // Blue - housing
    "#EF4444", // Red - food
    "#F59E0B", // Amber - transportation
    "#8B5CF6", // Purple - entertainment
    "#10B981", // Green - utilities
    "#6B7280", // Gray - other
  ];
  
  // Map category names to display names
  const getCategoryName = (category: string): string => {
    // Extract the base category without the type suffix
    const baseCategoryName = category.split('_')[0];
    
    // Make sure we only use valid translation keys
    if (baseCategoryName === 'other') {
      return t('other');
    }
    
    return t(baseCategoryName as any); // Using 'as any' as a temporary workaround
  };
  
  // Transform data for the chart
  const chartData = categoryBreakdown.map(item => ({
    name: getCategoryName(item.category),
    value: item.amount,
    percentage: item.percentage.toFixed(1)
  }));
  
  return (
    <div className="w-full h-64 mt-4">
      <ChartContainer
        config={{
          expenses: { color: "#3B82F6" },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
