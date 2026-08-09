// features/Employee/Dashboard/ActivityChart.tsx
"use client";

import { Task } from "../Tasks/Types/Types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from "recharts";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Clock3,
} from "lucide-react";

interface Props {
  tasks: Task[];
}

export default function ActivityChart({ tasks }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const data = days.map((day) => ({
    day,
    fullDay: day,
    count: tasks.filter((task) => {
      const d = new Date(task.creationDate);
      return days[d.getDay()] === day;
    }).length,
  }));

  const maxValue = Math.max(...data.map(d => d.count), 1);
  const total = data.reduce((acc, d) => acc + d.count, 0);
  const average = (total / 7).toFixed(1);
  const peakDay = data.reduce((a, b) => a.count > b.count ? a : b);
  const trend = data[data.length - 1].count >= data[0].count;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
      const isPeak = item.count === peakDay.count && peakDay.count > 0;
      
      return (
        <div className="bg-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-100 min-w-[160px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">{item.fullDay}</span>
            {isPeak && (
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Peak
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900">{item.count}</p>
          <p className="text-xs text-gray-500 mt-1">tasks created</p>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">of total</span>
              <span className="text-xs font-semibold text-indigo-600">{percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#64748B"
        textAnchor="middle"
        fontSize={11}
        fontWeight="600"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      {/* Header Section */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900">Weekly Activity</h3>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-xs text-gray-500">Tasks created this week</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-medium text-gray-700">{total}</span>
              <span className="text-xs text-gray-400">total</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-3 mt-4 pb-4 border-b border-gray-100">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-3">
            <p className="text-[10px] font-medium text-indigo-600 uppercase tracking-wider">Average</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{average}</p>
            <p className="text-[10px] text-gray-500">per day</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3">
            <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">Peak Day</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{peakDay.count}</p>
            <p className="text-[10px] text-gray-500">{peakDay.fullDay}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3">
            <p className="text-[10px] font-medium text-amber-600 uppercase tracking-wider">Busiest</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{peakDay.fullDay}</p>
            <p className="text-[10px] text-gray-500">{peakDay.count} tasks</p>
          </div>
          <div className={`bg-gradient-to-br rounded-xl p-3 ${
            trend ? 'from-emerald-50 to-emerald-100/50' : 'from-red-50 to-red-100/50'
          }`}>
            <p className={`text-[10px] font-medium uppercase tracking-wider ${
              trend ? 'text-emerald-600' : 'text-red-600'
            }`}>
              Trend
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {trend ? (
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <p className="text-lg font-bold text-gray-900">
                {trend ? '↑' : '↓'}
              </p>
            </div>
            <p className="text-[10px] text-gray-500">
              {trend ? 'Improving' : 'Declining'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 pt-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barGap={4}
            >
              <defs>
                <linearGradient id="gradientHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="gradientMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#818CF8" stopOpacity={0.5}/>
                </linearGradient>
                <linearGradient id="gradientLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="gradientPeak" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.95}/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.7}/>
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="#F1F5F9" 
                vertical={false}
                strokeWidth={1}
              />
              
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
                dy={8}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                domain={[0, maxValue + 1]}
                allowDecimals={false}
                width={30}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <ReferenceLine 
                y={Number(average)} 
                stroke="#818CF8" 
                strokeDasharray="6 6" 
                strokeWidth={1.5}
                label={{
                  value: `Avg ${average}`,
                  position: 'right',
                  fill: '#818CF8',
                  fontSize: 10,
                  fontWeight: 600,
                }}
              />

              <Bar 
                dataKey="count" 
                radius={[8, 8, 0, 0]}
                barSize={42}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
                label={renderCustomBarLabel}
              >
                {data.map((entry, index) => {
                  const isPeak = entry.count === peakDay.count && peakDay.count > 0;
                  const isHigh = entry.count >= maxValue * 0.8;
                  
                  let fill;
                  if (isPeak) {
                    fill = "url(#gradientPeak)";
                  } else if (isHigh) {
                    fill = "url(#gradientHigh)";
                  } else if (entry.count >= maxValue * 0.5) {
                    fill = "url(#gradientMedium)";
                  } else {
                    fill = "url(#gradientLow)";
                  }
                  
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={fill}
                      className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      style={{
                        filter: isPeak 
                          ? 'drop-shadow(0 4px 12px rgba(124, 58, 237, 0.3))' 
                          : isHigh 
                          ? 'drop-shadow(0 4px 12px rgba(79, 70, 229, 0.2))' 
                          : 'none',
                      }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-500">Peak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock3 className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}