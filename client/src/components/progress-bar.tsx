import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export default function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">진행률</span>
          <span className="text-sm font-medium text-slate-600">{current}/{total}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
