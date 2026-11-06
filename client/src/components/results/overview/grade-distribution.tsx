"use client";

import { useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartPie, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function GradeDistribution() {
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
            <ChartPie className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold tracking-tight text-slate-800">
              Grade Distribution
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
              <PieChart>
                <Pie
                  data={gradeData}
                  dataKey="value"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  innerRadius="48%"
                  outerRadius="85%"
                  paddingAngle={0}
                  stroke="#ffffff"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {gradeData.map((entry) => (
                    <Cell key={entry.grade} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-3 gap-x-5 gap-y-3 md:grid-cols-1 md:gap-x-0 md:gap-y-2 md:pr-2">
            {gradeData.map((item) => (
              <div key={item.grade} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-500">{item.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
