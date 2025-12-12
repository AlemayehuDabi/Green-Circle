import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Fintech", value: 35, color: "hsl(160, 84%, 39%)" },
  { name: "Agritech", value: 25, color: "hsl(172, 66%, 40%)" },
  { name: "Healthtech", value: 18, color: "hsl(158, 64%, 52%)" },
  { name: "Logistics", value: 12, color: "hsl(166, 72%, 28%)" },
  { name: "Edtech", value: 10, color: "hsl(175, 60%, 35%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-medium">
        <p className="text-sm font-medium text-foreground">
          {payload[0].name}: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const SectorChart = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-soft"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sector Breakdown</h3>
        <p className="text-sm text-muted-foreground">Distribution by industry vertical</p>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-semibold text-foreground ml-auto">{item.value}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectorChart;