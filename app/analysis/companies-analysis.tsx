"use client"

import { useState } from "react";
import { Construction, Settings } from "lucide-react";
import { motion } from "framer-motion";
import AppSidebar, { ViewType } from "@/components/dashboard/AppSidebar";
import TopBar from "@/components/dashboard/TopBar";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import StartupDirectory from "@/components/dashboard/StartupDirectory";
import CompanyProfile from "@/components/dashboard/CompanyProfile";
import { Company } from "@/data/companies";

const PlaceholderView = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center h-[60vh] text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
      <Icon className="w-10 h-10 text-primary" />
    </div>
    <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground max-w-md">
      This section is under development. Check back soon for updates.
    </p>
  </motion.div>
);

const Analysis = () => {
  const [currentView, setCurrentView] = useState<ViewType>("overview");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleBackToDirectory = () => {
    setSelectedCompany(null);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSelectedCompany(null);
  };

  const renderContent = () => {
    if (selectedCompany) {
      return <CompanyProfile company={selectedCompany} onBack={handleBackToDirectory} />;
    }

    switch (currentView) {
      case "overview":
        return <OverviewDashboard onSelectCompany={handleSelectCompany} />;
      case "directory":
        return <StartupDirectory onSelectCompany={handleSelectCompany} />;
      case "market-maps":
        return <PlaceholderView title="Market Maps" icon={Construction} />;
      case "settings":
        return <PlaceholderView title="Settings" icon={Settings} />;
      default:
        return <OverviewDashboard onSelectCompany={handleSelectCompany} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dot pattern background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Sidebar */}
      <AppSidebar currentView={currentView} onViewChange={handleViewChange} />

      {/* Main content area */}
      <div className="ml-62.5">
        {/* Top Bar */}
        <TopBar />

        {/* Page content */}
        <main className="p-8 pt-24">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 px-6 py-4 mt-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 GreenCircle. Ethiopian Ecosystem Intelligence Platform.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Analysis;
