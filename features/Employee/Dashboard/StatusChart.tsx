// components/employee/dashboard/StatusChart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Task } from "../Tasks/Types/Types";
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";

interface Props {
  tasks: Task[];
}

export default function StatusChart({ tasks }: Props) {
  const total = tasks.length;
  
  const data = [
    {
      name: "To Do",
      value: tasks.filter((t) => t.status === "ToDo").length,
      color: "#94A3B8",
      gradient: "from-gray-400 to-gray-500",
      icon: AlertCircle,
      bg: "bg-gray-50",
      textColor: "text-gray-600",
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "InProgress").length,
      color: "#4F46E5",
      gradient: "from-indigo-500 to-indigo-600",
      icon: Clock,
      bg: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "Done").length,
      color: "#059669",
      gradient: "from-emerald-500 to-emerald-600",
      icon: CheckCircle,
      bg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

  const completionRate = total > 0 ? Math.round((data[2].value / total) * 100) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
      const isCompleted = item.name === "Completed";
      
      return (
        <div className="bg-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-100 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.payload.color }}
            />
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
                  background: `linear-gradient(90deg, ${item.payload.color}, ${item.payload.color}dd)`,
                }}
              />
            </div>
          </div>
          {isCompleted && completionRate >= 80 && (
            <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3 w-3" />
              Excellent progress!
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      {/* Header Section */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Task Distribution</h3>
            <p className="text-xs text-gray-500 mt-0.5">Status breakdown</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-indigo-100/70 px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-bold text-indigo-700">TOTAL</span>
            <span className="text-sm font-bold text-indigo-900">{total}</span>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-3 pb-3 border-b border-gray-100">
          {data.map((item) => {
            const Icon = item.icon;
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name} className={`flex items-center gap-2 p-2 rounded-lg ${item.bg}`}>
                <Icon className={`h-4 w-4 ${item.textColor}`} />
                <div>
                  <p className="text-[10px] font-medium text-gray-500">{item.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    <span className="text-[10px] text-gray-400">({percentage}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {data.map((item, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={item.color} stopOpacity={0.9}/>
                    <stop offset="100%" stopColor={item.color} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                strokeWidth={3}
                stroke="#fff"
                label={renderCustomizedLabel}
                labelLine={false}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((item, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${index})`}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      filter: `drop-shadow(0 4px 16px ${item.color}50)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-xs font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-gray-500">Complete</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
          </div>
          {completionRate >= 80 && (
            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3 w-3" />
              {completionRate}% Complete
            </div>
          )}
        </div>
      </div>
    </div>
  );
}