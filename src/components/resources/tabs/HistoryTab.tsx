
import React from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { ResourceEntry } from "@/types/resources";
import { Coins, Droplet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const HistoryTab = () => {
  const { resourceEntries, deleteResourceEntry } = useResources();
  const { t } = useLanguage();
  
  // Sort entries by date (newest first)
  const sortedEntries = [...resourceEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Format amount as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Format date as relative time
  const formatRelativeDate = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };
  
  // Get category display name
  const getCategoryName = (category: string): string => {
    // Extract the base category name without type suffix
    const baseCategoryName = category.split('_')[0];
    // Cast to any as a workaround since we know these are valid keys
    return t(baseCategoryName as any);
  };
  
  if (sortedEntries.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">{t('noResourceEntries')}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {sortedEntries.map(entry => (
        <ResourceEntryCard 
          key={entry.id} 
          entry={entry} 
          onDelete={deleteResourceEntry}
          formatCurrency={formatCurrency}
          formatRelativeDate={formatRelativeDate}
          getCategoryName={getCategoryName}
        />
      ))}
    </div>
  );
};

interface ResourceEntryCardProps {
  entry: ResourceEntry;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
  formatRelativeDate: (dateString: string) => string;
  getCategoryName: (category: string) => string;
}

const ResourceEntryCard: React.FC<ResourceEntryCardProps> = ({
  entry,
  onDelete,
  formatCurrency,
  formatRelativeDate,
  getCategoryName
}) => {
  return (
    <Card className="glass-card">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            entry.type === "gold" ? "bg-yellow-500/20" : "bg-blue-500/20"
          }`}>
            {entry.type === "gold" ? (
              <Coins className="h-5 w-5 text-yellow-500" />
            ) : (
              <Droplet className="h-5 w-5 text-blue-500" />
            )}
          </div>
          
          <div className="ml-3">
            <div className="font-medium">
              {getCategoryName(entry.category)}
              {entry.notes && (
                <span className="text-muted-foreground ml-2 text-xs">
                  {entry.notes}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatRelativeDate(entry.date)}
              {entry.tags && entry.tags.length > 0 && (
                <span className="ml-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="bg-secondary/50 px-1.5 py-0.5 rounded-sm text-xs mr-1">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`font-bold ${
            entry.type === "gold" ? "text-yellow-500" : "text-blue-500"
          }`}>
            {entry.type === "gold" ? "+" : "-"}{formatCurrency(entry.amount)}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(entry.id)}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
