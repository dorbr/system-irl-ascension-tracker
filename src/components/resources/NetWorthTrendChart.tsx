
import React from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

export const NetWorthTrendChart = () => {
  const { historyData } = useResources();
  const { t, isRtl } = useLanguage();
  
  // Transform data for the chart
  const chartData = historyData.labels.map((label, index) => ({
    name: label,
    net: historyData.net[index]
  }));
  
  return (
    <div className="w-full h-64 mt-4">
      <ChartContainer
        config={{
          net: { color: "#10B981" }, // Green
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 10, left: isRtl ? 10 : 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }} 
              reversed={isRtl}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              orientation={isRtl ? "right" : "left"}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="net"
              name={t('net')}
              fill="var(--color-net)"
              stroke="var(--color-net)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
