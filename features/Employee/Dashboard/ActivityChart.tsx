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
        <div className="bg-white px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 min-w-[130px] sm:min-w-[160px]">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500">{item.fullDay}</span>
            {isPeak && (
              <span className="text-[8px] sm:text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                Peak
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{item.count}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">tasks created</p>
          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-gray-400">of total</span>
              <span className="text-[10px] sm:text-xs font-semibold text-indigo-600">{percentage}%</span>
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
        y={y - 6}
        fill="#64748B"
        textAnchor="middle"
        fontSize={9}
        fontWeight="600"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      {/* Header Section */}
      <div className="p-4 sm:p-5 md:p-6 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Weekly Activity</h3>
              <span className="bg-indigo-50 text-indigo-700 text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">Tasks created this week</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">{total}</span>
              <span className="text-[10px] sm:text-xs text-gray-400 hidden xs:inline">total</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <p className="text-[8px] sm:text-[10px] font-medium text-indigo-600 uppercase tracking-wider">Average</p>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{average}</p>
            <p className="text-[8px] sm:text-[10px] text-gray-500">per day</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <p className="text-[8px] sm:text-[10px] font-medium text-emerald-600 uppercase tracking-wider">Peak Day</p>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{peakDay.count}</p>
            <p className="text-[8px] sm:text-[10px] text-gray-500">{peakDay.fullDay}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <p className="text-[8px] sm:text-[10px] font-medium text-amber-600 uppercase tracking-wider">Busiest</p>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{peakDay.fullDay}</p>
            <p className="text-[8px] sm:text-[10px] text-gray-500">{peakDay.count} tasks</p>
          </div>
          <div className={`bg-gradient-to-br rounded-lg sm:rounded-xl p-2 sm:p-3 ${
            trend ? 'from-emerald-50 to-emerald-100/50' : 'from-red-50 to-red-100/50'
          }`}>
            <p className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wider ${
              trend ? 'text-emerald-600' : 'text-red-600'
            }`}>
              Trend
            </p>
            <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
              {trend ? (
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
              )}
              <p className="text-base sm:text-lg font-bold text-gray-900">
                {trend ? '↑' : '↓'}
              </p>
            </div>
            <p className="text-[8px] sm:text-[10px] text-gray-500">
              {trend ? 'Improving' : 'Declining'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-3 sm:p-4 pt-1 sm:pt-2">
        <div className="h-48 sm:h-56 md:h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 15, right: 10, left: -5, bottom: 5 }}
              barGap={2}
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
                tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
                dy={4}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 9 }}
                domain={[0, maxValue + 1]}
                allowDecimals={false}
                width={20}
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
                  fontSize: 8,
                  fontWeight: 600,
                }}
              />

              <Bar 
                dataKey="count" 
                radius={[6, 6, 0, 0]}
                barSize={24}
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
      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] sm:text-xs text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-500"></div>
              <span className="text-[10px] sm:text-xs text-gray-500">Peak</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gray-300"></div>
              <span className="text-[10px] sm:text-xs text-gray-500">Inactive</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
            <Clock3 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}