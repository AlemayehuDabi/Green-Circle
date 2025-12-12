import { motion } from "framer-motion";
import { Building2, DollarSign, Users, Layers } from "lucide-react";
import KPICard from "./KPIcard";
import GrowthChart from "./GrowthChart";
import SectorChart from "./SectorChart";
import VerifiedRegistry from "./VerifiedRegistry";
import { Company } from "@/data/companies";

interface OverviewDashboardProps {
  onSelectCompany: (company: Company) => void;
}

const OverviewDashboard = ({ onSelectCompany }: OverviewDashboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-foreground tracking-tight"
        >
          Ethiopian Innovation Monitor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground mt-2"
        >
          Real-time verification and ecosystem intelligence
        </motion.p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Verified Startups"
          value="1,240"
          change="+12.5%"
          trend="up"
          icon={Building2}
          delay={0.1}
        />
        <KPICard
          title="Total Capital Deployed"
          value="$45M"
          change="+28.3%"
          trend="up"
          icon={DollarSign}
          delay={0.2}
        />
        <KPICard
          title="Jobs Created"
          value="5,300"
          change="+18.7%"
          trend="up"
          icon={Users}
          delay={0.3}
        />
        <KPICard
          title="Active Sectors"
          value="12"
          change="+2"
          trend="up"
          icon={Layers}
          delay={0.4}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <div>
          <SectorChart />
        </div>
      </div>

      {/* Verified Registry */}
      <VerifiedRegistry onSelectCompany={onSelectCompany} />
    </motion.div>
  );
};

export default OverviewDashboard;
