import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="text-center">
      <Card className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <CardContent className="pt-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">🧠</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">성격 유형 테스트</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            10개의 간단한 질문을 통해<br />
            당신의 고유한 성격 유형을 알아보세요
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                10개 질문
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                약 3분 소요
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                무료 결과
              </div>
            </div>
          </div>
          <Button
            onClick={() => setLocation("/test")}
            className="bg-gradient-to-r from-primary to-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            테스트 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
