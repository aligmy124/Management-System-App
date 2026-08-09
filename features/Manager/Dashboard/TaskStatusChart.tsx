// features/Manager/Dashboard/TaskStatusChart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Task } from "../Tasks/Types/Types";
import { CheckCircle, Clock, AlertCircle, Circle, TrendingUp } from "lucide-react";

interface Props {
  tasks: Task[];
}

export default function TaskStatusChart({ tasks }: Props) {
  const total = tasks.length;
  
  const data = [
    {
      name: "To Do",
      value: tasks.filter((t) => t.status === "ToDo").length,
      color: "#94A3B8",
      icon: Circle,
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "InProgress").length,
      color: "#3B82F6",
      icon: Clock,
    },
    {
      name: "Done",
      value: tasks.filter((t) => t.status === "Done").length,
      color: "#10B981",
      icon: CheckCircle,
    },
  ];

  const completionRate = total > 0 ? Math.round((data[2].value / total) * 100) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
      return (
        <div className="bg-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-100 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.payload.color }} />
            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{item.value}</p>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Percentage</span>
              <span className="text-sm font-bold" style={{ color: item.payload.color }}>
                {percentage}%
              </span>
            </div>
            <div className="mt-1 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${percentage}%`, 
                  backgroundColor: item.payload.color,
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Task Status</h3>
            <p className="text-xs text-gray-500 mt-0.5">Distribution overview</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-indigo-100/70 px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-bold text-indigo-700">TOTAL</span>
            <span className="text-sm font-bold text-indigo-900">{total}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pb-3 border-b border-gray-100">
          {data.map((item) => {
            const Icon = item.icon;
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                <Icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                <div>
                  <p className="text-[10px] font-medium text-gray-500">{item.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">{item.value}</span>
                    <span className="text-[10px] text-gray-400">({percentage}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                strokeWidth={2}
                stroke="#fff"
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((item, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={item.color}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      filter: `drop-shadow(0 4px 12px ${item.color}40)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs font-medium text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {completionRate >= 70 && (
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
            <TrendingUp className="h-4 w-4" />
            <span>{completionRate}% completion rate - Great progress!</span>
          </div>
        </div>
      )}
    </div>
  );
}