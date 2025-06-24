import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { personalityTypes } from "@/lib/personality-data";

export default function Results() {
  const [match, params] = useRoute("/results/:personalityType");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  if (!match || !params?.personalityType) {
    return (
      <div className="text-center">
        <p>잘못된 접근입니다.</p>
        <Button onClick={() => setLocation("/")} className="mt-4">
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  const personalityType = params.personalityType as string;
  const typeData = personalityTypes[personalityType];

  if (!typeData) {
    return (
      <div className="text-center">
        <p>해당 성격 유형을 찾을 수 없습니다.</p>
        <Button onClick={() => setLocation("/")} className="mt-4">
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  const handleRestart = () => {
    setLocation("/");
  };

  const handleShare = () => {
    const text = `나의 성격 유형은 "${typeData.name}"입니다! 성격 유형 테스트로 당신의 성격도 알아보세요.`;
    
    if (navigator.share) {
      navigator.share({
        title: "성격 유형 테스트 결과",
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`).then(() => {
        toast({
          title: "복사 완료",
          description: "결과가 클립보드에 복사되었습니다.",
        });
      }).catch(() => {
        toast({
          title: "공유하기",
          description: `${typeData.name} 결과를 공유했습니다!`,
        });
      });
    } else {
      toast({
        title: "공유하기",
        description: `${typeData.name} 결과를 공유했습니다!`,
      });
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <CardContent className="pt-6">
        <div className="w-24 h-24 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">{typeData.emoji}</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">테스트 완료!</h2>
        <h3 className="text-2xl font-semibold text-primary mb-4">{typeData.name}</h3>
        
        <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
          <h4 className="font-semibold text-slate-800 mb-3">당신의 성격 특징:</h4>
          <div className="text-slate-700 leading-relaxed">
            <p>{typeData.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-semibold text-blue-600 mb-2">특성</h5>
            <ul className="text-sm text-slate-700 space-y-1">
              {typeData.characteristics.map((characteristic, index) => (
                <li key={index}>• {characteristic}</li>
              ))}
            </ul>
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <h5 className="font-semibold text-primary mb-2">강점</h5>
            <ul className="text-sm text-slate-700 space-y-1">
              {typeData.strengths.map((strength, index) => (
                <li key={index}>• {strength}</li>
              ))}
            </ul>
          </div>
          <div className="bg-pink-500/10 rounded-lg p-4">
            <h5 className="font-semibold text-pink-600 mb-2">조언</h5>
            <ul className="text-sm text-slate-700 space-y-1">
              {typeData.advice.map((adviceItem, index) => (
                <li key={index}>• {adviceItem}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="bg-slate-100 text-slate-700 px-6 py-2 rounded-full font-semibold hover:bg-slate-200"
          >
            다시 테스트하기
          </Button>
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-primary to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg"
          >
            결과 공유하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
