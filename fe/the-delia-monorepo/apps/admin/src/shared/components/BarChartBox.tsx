"use client";
import "./BarChartBox.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

export default function BarChartBox({ data }: Props) {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickMargin={12} tick={{ fontSize: 13 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={30}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
