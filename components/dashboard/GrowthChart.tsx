import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2020", startups: 245, verified: 180 },
  { year: "2021", startups: 385, verified: 295 },
  { year: "2022", startups: 590, verified: 450 },
  { year: "2023", startups: 820, verified: 680 },
  { year: "2024", startups: 1080, verified: 920 },
  { year: "2025", startups: 1240, verified: 1050 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-medium">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-primary">
            <span className="font-medium">{payload[0].value}</span> Total Startups
          </p>
          <p className="text-sm text-accent">
            <span className="font-medium">{payload[1].value}</span> Verified
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const GrowthChart = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-soft"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Startup Registration Growth</h3>
        <p className="text-sm text-muted-foreground">Ethiopian ecosystem expansion 2020-2025</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStartups" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" vertical={false} />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="startups"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStartups)"
            />
            <Area
              type="monotone"
              dataKey="verified"
              stroke="hsl(172, 66%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVerified)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Startups</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Verified</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthChart;