// features/Manager/Dashboard/WeeklyActivity.tsx
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
import { TrendingUp, TrendingDown, Zap, Clock } from "lucide-react";

interface Props {
  tasks: Task[];
}

export default function WeeklyActivity({ tasks }: Props) {
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
      return (
        <div className="bg-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-100 min-w-[160px]">
          <p className="text-xs font-medium text-gray-500 mb-1">{item.fullDay}</p>
          <p className="text-3xl font-bold text-gray-900">{item.count}</p>
          <p className="text-xs text-gray-500 mt-1">tasks created</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Weekly Activity</h3>
            <p className="text-xs text-gray-500 mt-0.5">Tasks created this week</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-medium text-gray-700">{total}</span>
            <span className="text-xs text-gray-400">total</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 pb-4 border-b border-gray-100">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-2.5">
            <p className="text-[10px] font-medium text-indigo-600">Average</p>
            <p className="text-base font-bold text-gray-900">{average}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-2.5">
            <p className="text-[10px] font-medium text-emerald-600">Peak</p>
            <p className="text-base font-bold text-gray-900">{peakDay.count}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-2.5">
            <p className="text-[10px] font-medium text-amber-600">Busiest</p>
            <p className="text-base font-bold text-gray-900">{peakDay.fullDay}</p>
          </div>
          <div className={`bg-gradient-to-br rounded-xl p-2.5 ${
            trend ? 'from-emerald-50 to-emerald-100/50' : 'from-red-50 to-red-100/50'
          }`}>
            <p className={`text-[10px] font-medium ${trend ? 'text-emerald-600' : 'text-red-600'}`}>
              Trend
            </p>
            <div className="flex items-center gap-1">
              {trend ? (
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <p className="text-base font-bold text-gray-900">
                {trend ? '↑' : '↓'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, maxValue + 1]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={Number(average)} stroke="#818CF8" strokeDasharray="6 6" />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={36}>
                {data.map((entry, index) => {
                  const isPeak = entry.count === peakDay.count && peakDay.count > 0;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isPeak ? '#7C3AED' : '#6366F1'}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        filter: isPeak ? 'drop-shadow(0 4px 12px rgba(124, 58, 237, 0.3))' : 'none',
                      }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}