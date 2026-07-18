"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardChart({ data }: { data: any[] }) {
  // Aggregate orders by date (last 7 days for simplicity, or just map existing data)
  const chartData = data.reduce((acc: any[], order: any) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.revenue += order.totalAmount;
    } else {
      acc.push({ date, revenue: order.totalAmount });
    }
    return acc;
  }, []).reverse(); // Assuming orders are fetched desc, we want asc for chart

  // If there's no data or only 1 data point, add some dummy points to make the line chart look good initially
  if (chartData.length < 2) {
    const dummyData = [
      { date: "Jul 10", revenue: 0 },
      { date: "Jul 11", revenue: 15000 },
      { date: "Jul 12", revenue: 12000 },
      { date: "Jul 13", revenue: 35000 },
      { date: "Jul 14", revenue: 20000 },
      ...chartData
    ];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `Rs.${val/1000}k`} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']}
          />
          <Line type="monotone" dataKey="revenue" stroke="#1c4bc3" strokeWidth={3} dot={{ r: 4, fill: '#1c4bc3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `Rs.${val/1000}k`} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']}
        />
        <Line type="monotone" dataKey="revenue" stroke="#1c4bc3" strokeWidth={3} dot={{ r: 4, fill: '#1c4bc3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
