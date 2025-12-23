import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  PieChart, 
  Flame,
  CheckCircle2,
  FileText,
  UserCircle
} from "lucide-react";
import { Company } from "@/data/companies";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CompanyProfileProps {
  company: Company;
  onBack: () => void;
}

const CompanyProfile = ({ company, onBack }: CompanyProfileProps) => {
  const kpiCards = [
    {
      title: "Est. Annual Revenue",
      value: company.kpis.annualRevenue,
      icon: DollarSign,
      trend: "up" as const,
      change: "+24.5%",
    },
    {
      title: "Employee Count",
      value: company.kpis.employeeCount.toString(),
      icon: Users,
      trend: company.kpis.employeeTrend,
      change: company.kpis.employeeTrend === "up" ? "+18" : company.kpis.employeeTrend === "down" ? "-5" : "0",
    },
    {
      title: "Market Share",
      value: company.kpis.marketShare,
      icon: PieChart,
      trend: "up" as const,
      change: "+2.3%",
    },
    {
      title: "Burn Rate (Monthly)",
      value: company.kpis.burnRate,
      icon: Flame,
      trend: "down" as const,
      change: "-8.2%",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{company.logo}</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{company.name}</h1>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {company.sector}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Founded {company.foundedDate} • {company.revenueStage}</p>
          </div>
        </div>
        
        {/* Verification Score */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              company.verificationScore >= 90 ? "bg-primary/10" : 
              company.verificationScore >= 70 ? "bg-amber-500/10" : "bg-destructive/10"
            )}>
              <CheckCircle2 className={cn(
                "w-6 h-6",
                company.verificationScore >= 90 ? "text-primary" :
                company.verificationScore >= 70 ? "text-amber-500" : "text-destructive"
              )} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verification Score</p>
              <p className="text-2xl font-bold text-foreground">{company.verificationScore}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-soft"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                kpi.trend === "up" && "bg-primary/10 text-primary",
                kpi.trend === "down" && kpi.title.includes("Burn") ? "bg-primary/10 text-primary" : kpi.trend === "down" && "bg-destructive/10 text-destructive",
                kpi.trend === "neutral" && "bg-muted text-muted-foreground"
              )}>
                {kpi.trend === "up" && <TrendingUp className="w-3 h-3" />}
                {kpi.trend === "down" && <TrendingDown className="w-3 h-3" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-soft"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Growth (12 Months)</h3>
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={company.monthlyData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue (M ETB)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Acquisition Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-soft"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">User Acquisition</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={company.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number) => value?.toLocaleString() ?? "0"}
                />
                <Legend />
                <Bar dataKey="activeUsers" name="Active Users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="registeredUsers" name="Registered Users" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Data Tables with Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
      >
        <Tabs defaultValue="funding" className="w-full">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-muted/30 p-0 h-auto">
            <TabsTrigger 
              value="funding"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Funding Rounds
            </TabsTrigger>
            <TabsTrigger 
              value="executives"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Key Executives
            </TabsTrigger>
            <TabsTrigger 
              value="compliance"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
            >
              <FileText className="w-4 h-4 mr-2" />
              Compliance Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funding" className="p-0 m-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Investor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Round Type</th>
                </tr>
              </thead>
              <tbody>
                {company.fundingRounds.map((round, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-4 px-6 text-sm text-muted-foreground">
                      {new Date(round.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{round.investor}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-primary">{round.amount}</td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary" className="bg-secondary/50">{round.roundType}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="executives" className="p-0 m-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Since</th>
                </tr>
              </thead>
              <tbody>
                {company.executives.map((exec, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{exec.name[0]}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{exec.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{exec.role}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{exec.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="compliance" className="p-0 m-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Document</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {company.complianceDocuments.map((doc, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{doc.name}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        doc.status === "Active" && "bg-primary/10 text-primary border-primary/20",
                        doc.status === "Pending" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                        doc.status === "Submitted" && "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      )}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">
                      {new Date(doc.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default CompanyProfile;
