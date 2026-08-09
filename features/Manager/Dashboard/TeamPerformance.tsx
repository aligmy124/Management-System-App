// features/Manager/Dashboard/TeamPerformance.tsx
"use client";

import { Task } from "../Tasks/Types/Types";
import { Project } from "../Projects/Types/Types";
import { Users, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";

interface Props {
  tasks: Task[];
  projects: Project[];
}

export default function TeamPerformance({ tasks, projects }: Props) {
  // Group tasks by employee
  const employeeStats = tasks.reduce((acc, task) => {
    const employeeId = task.employee?.id;
    if (!employeeId) return acc;
    
    if (!acc[employeeId]) {
      acc[employeeId] = {
        name: task.employee.userName,
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0,
      };
    }
    
    acc[employeeId].total++;
    if (task.status === "Done") acc[employeeId].completed++;
    if (task.status === "InProgress") acc[employeeId].inProgress++;
    if (task.status === "ToDo") acc[employeeId].todo++;
    
    return acc;
  }, {} as Record<number, any>);

  const teamData = Object.values(employeeStats)
    .map((employee) => ({
      ...employee,
      completionRate: employee.total > 0 
        ? Math.round((employee.completed / employee.total) * 100) 
        : 0,
    }))
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 5);

  const totalTeamMembers = Object.keys(employeeStats).length;
  const avgCompletion = teamData.length > 0 
    ? Math.round(teamData.reduce((acc, emp) => acc + emp.completionRate, 0) / teamData.length) 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Team Performance</h3>
            <p className="text-xs text-gray-500 mt-0.5">Member contribution</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Users className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">{totalTeamMembers}</span>
            </div>
          </div>
        </div>

        {teamData.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-sm text-gray-400">No team data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teamData.map((employee, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors truncate block">
                        {employee.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{employee.total} tasks</span>
                        {employee.inProgress > 0 && (
                          <span className="text-blue-500">• {employee.inProgress} active</span>
                        )}
                        
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className={`text-xs font-semibold ${
                      employee.completionRate >= 80 ? 'text-emerald-600' :
                      employee.completionRate >= 50 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {employee.completionRate}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                      employee.completionRate >= 80 ? 'bg-emerald-500' :
                      employee.completionRate >= 50 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${employee.completionRate}%` }}
                  />
                </div>
              </div>
            ))}

            {avgCompletion > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-medium text-gray-600">Team Average</span>
                  </div>
                  <span className={`text-sm font-bold ${
                    avgCompletion >= 80 ? 'text-emerald-600' :
                    avgCompletion >= 50 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {avgCompletion}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}