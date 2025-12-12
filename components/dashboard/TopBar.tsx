import { motion } from "framer-motion";
import { Search, Command, Bell, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }} 
      className="glass fixed top-0 right-0 left-[250px] z-40 px-6 py-4 border-b border-border/50 bg-white/95"
    >
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Overview</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search startups, sectors, reports..."
              className="w-full pl-11 pr-20 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
              <Command className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">K</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full verified-pulse" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Abebe Kebede</p>
              <p className="text-xs text-muted-foreground">Policy Analyst</p>
            </div>
            <Avatar className="w-10 h-10 ring-2 ring-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=abebe" />
              <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;