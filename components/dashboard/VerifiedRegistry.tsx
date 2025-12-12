import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Building2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { companies, Company } from "@/data/companies";

interface VerifiedRegistryProps {
  onSelectCompany?: (company: Company) => void;
}

const VerifiedRegistry = ({ onSelectCompany }: VerifiedRegistryProps) => {
  // Use the first 6 companies from our data
  const displayedCompanies = companies.slice(0, 6);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recently Verified Entities</h3>
            <p className="text-sm text-muted-foreground">Latest additions to the verified registry</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Founded
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Revenue Est.
              </th>
              {onSelectCompany && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayedCompanies.map((company, index) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => onSelectCompany?.(company)}
                className={`hover:bg-muted/20 transition-colors ${onSelectCompany ? 'cursor-pointer group' : ''}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="font-bold text-primary">{company.logo}</span>
                    </div>
                    <span className="font-medium text-foreground">{company.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{company.sector}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`border-0 gap-1 ${
                    company.status === "Verified" 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {company.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{company.foundedDate}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-foreground">{company.kpis.annualRevenue}</span>
                </td>
                {onSelectCompany && (
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all inline-block" />
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default VerifiedRegistry;
