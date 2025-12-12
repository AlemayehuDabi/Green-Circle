import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronRight } from "lucide-react";
import { companies, Company } from "@/data/companies";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface StartupDirectoryProps {
  onSelectCompany: (company: Company) => void;
}

const StartupDirectory = ({ onSelectCompany }: StartupDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);

  const sectors = [...new Set(companies.map((c) => c.sector))];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || company.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Startup Directory</h1>
        <p className="text-muted-foreground mt-1">Browse and analyze verified Ethiopian startups</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search startups by name or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base bg-card border-border rounded-xl shadow-soft"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSectorFilter(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              !sectorFilter
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSectorFilter(sector)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                sectorFilter === sector
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Showing {filteredCompanies.length} of {companies.length} startups</span>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Company</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Sector</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Revenue Stage</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Last Funding</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectCompany(company)}
                  className="border-b border-border last:border-0 hover:bg-primary/5 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{company.logo}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{company.name}</p>
                        <p className="text-xs text-muted-foreground">Founded {company.foundedDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className="bg-secondary/50">
                      {company.sector}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={cn(
                        "font-medium",
                        company.status === "Verified" && "bg-primary/10 text-primary border-primary/20",
                        company.status === "Pending" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                        company.status === "Under Review" && "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      )}
                    >
                      {company.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">{company.revenueStage}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(company.lastFunding).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all inline-block" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default StartupDirectory;
