
import React from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Legend 
} from "recharts";

export const ResourcesOverviewChart = () => {
  const { historyData } = useResources();
  const { t, isRtl } = useLanguage();
  
  // Transform data for the chart
  const chartData = historyData.labels.map((label, index) => ({
    name: label,
    gold: historyData.gold[index],
    mana: historyData.mana[index],
    net: historyData.net[index]
  }));
  
  return (
    <div className="w-full h-64 mt-4">
      <ChartContainer
        config={{
          gold: { color: "#F59E0B" }, // Amber
          mana: { color: "#3B82F6" }, // Blue
          net: { color: "#10B981" }, // Green
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: isRtl ? 10 : 0, bottom: 20 }}
            layout={isRtl ? "vertical" : "horizontal"}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={!isRtl} horizontal={isRtl} />
            {isRtl ? (
              <>
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 10 }} 
                  width={40} 
                />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 10 }}
                  orientation="top"
                />
              </>
            ) : (
              <>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                />
              </>
            )}
            <ChartTooltip
              cursor={{ fill: "var(--background)", opacity: 0.2 }}
              content={<ChartTooltipContent />}
            />
            <ReferenceLine y={0} stroke="#666" />
            <Bar
              dataKey="gold"
              name={t('gold')}
              stackId="a"
              fill="var(--color-gold)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="mana"
              name={t('mana')}
              stackId="a"
              fill="var(--color-mana)"
              radius={[4, 4, 0, 0]}
            />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
