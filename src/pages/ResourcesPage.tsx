
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ResourceEntryForm } from "@/components/resources/ResourceEntryForm";
import { OverviewTab } from "@/components/resources/tabs/OverviewTab";
import { HistoryTab } from "@/components/resources/tabs/HistoryTab";
import { ArtifactsTab } from "@/components/resources/tabs/ArtifactsTab";
import { BuffsTab } from "@/components/resources/tabs/BuffsTab";

const ResourcesPage = () => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('resourceModule')}</h1>
        
        <Button 
          onClick={() => setIsEntryFormOpen(true)}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          {t('addEntry')}
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="glass-card rounded-lg p-4"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">{t('overviewTab')}</TabsTrigger>
          <TabsTrigger value="history">{t('historyTab')}</TabsTrigger>
          <TabsTrigger value="artifacts">{t('artifactsTab')}</TabsTrigger>
          <TabsTrigger value="buffs">{t('buffsTab')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <HistoryTab />
        </TabsContent>
        
        <TabsContent value="artifacts" className="mt-0">
          <ArtifactsTab />
        </TabsContent>
        
        <TabsContent value="buffs" className="mt-0">
          <BuffsTab />
        </TabsContent>
      </Tabs>
      
      <ResourceEntryForm 
        isOpen={isEntryFormOpen}
        onClose={() => setIsEntryFormOpen(false)}
      />
    </div>
  );
};

export default ResourcesPage;
