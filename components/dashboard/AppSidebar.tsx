import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Building2, 
  Map, 
  Settings,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewType = "overview" | "directory" | "market-maps" | "settings";

interface NavItem {
  icon: React.ElementType;
  label: string;
  view: ViewType;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", view: "overview" },
  { icon: Building2, label: "Startup Directory", view: "directory" },
  { icon: Map, label: "Market Maps", view: "market-maps" },
  { icon: Settings, label: "Settings", view: "settings" },
];

interface AppSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const AppSidebar = ({ currentView, onViewChange }: AppSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-[250px] bg-card border-r border-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="font-bold text-primary tracking-tight text-lg">GreenCircle</span>
            <span className="text-xs text-muted-foreground">Ecosystem Intelligence</span>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = currentView === item.view;
            return (
              <motion.li
                key={item.view}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onViewChange(item.view)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative",
                    "hover:bg-primary/5 group",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-primary" : ""
                  )}>
                    {item.label}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-1">Data Updated</p>
          <p className="text-sm font-medium text-foreground">Dec 12, 2025 • 14:32</p>
        </div>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
