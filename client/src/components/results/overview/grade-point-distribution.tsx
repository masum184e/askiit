"use client";

import { useRef } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { ChartColumnIncreasing, Download } from "lucide-react";

const gradeData = [
  { grade: "A+", value: 25, color: "#20C463" },
  { grade: "A", value: 15, color: "#48D987" },
  { grade: "A-", value: 10, color: "#7DE9A7" },
  { grade: "B+", value: 11, color: "#FFB91F" },
  { grade: "B", value: 13, color: "#FFD34E" },
  { grade: "B-", value: 13, color: "#FFDF43" },
  { grade: "C+", value: 10, color: "#FF7515" },
  { grade: "C", value: 1, color: "#FF9138" },
  { grade: "D", value: 2, color: "#F44343" },
];

export function GradePointDistribution() {
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadPNG = async () => {
    if (!chartRef.current) return;

    const svg = chartRef.current.querySelector("svg");
    if (!svg) return;

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 700;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = "grade-distribution.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="w-full overflow-hidden rounded-[22px] border-0 border-white bg-white">
      <div className="p-0 border-0 border-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartColumnIncreasing
              className="h-6 w-6  text-blue-500"
            />
            <h2 className="text-xl font-semibold tracking-tight text-slate-800">
              Grade Point Distribution
            </h2>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={downloadPNG}
            className="h-8 rounded-full bg-gray-100 px-4 text-slate-700 hover:bg-gray-200"
          >
            <Download className="mr-2 h-4 w-4" />
            PNG
          </Button>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Donut Chart */}
          <div ref={chartRef} className="h-[340px] min-w-0 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gradeData}
                margin={{
                  top: 5,
                  right: 8,
                  left: -12,
                  bottom: 12,
                }}
                barCategoryGap="28%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#E9EDF2"
                  strokeDasharray="0"
                />

                <XAxis
                  dataKey="grade"
                  tick={{ fill: "#737373", fontSize: 13 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={false}
                  tickMargin={12}
                />

                <YAxis
                  domain={[0, 30]}
                  ticks={[0, 5, 10, 15, 20, 25, 30]}
                  tick={{ fill: "#737373", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  label={{
                    value: "Number of courses",
                    angle: -90,
                    position: "insideLeft",
                    offset: 20,
                    style: {
                      fill: "#666",
                      fontSize: 12,
                    },
                  }}
                />

                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                  formatter={(value) => [value, "Courses"]}
                  labelFormatter={(label) => `Grade: ${label}`}
                />

                <Bar dataKey="value" radius={[9, 9, 0, 0]} maxBarSize={55}>
                  {gradeData.map((entry) => (
                    <Cell key={entry.grade} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Number of courses awarded for each grade point.
        </p>
      </div>
    </div>
  );
}
