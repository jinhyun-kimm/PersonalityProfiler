import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { testQuestions } from "@/lib/personality-data";
import QuestionCard from "@/components/question-card";
import ProgressBar from "@/components/progress-bar";

export default function Test() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  useEffect(() => {
    // Check if we have questions data
    if (!testQuestions || testQuestions.length === 0) {
      toast({
        title: "오류",
        description: "테스트 질문을 불러올 수 없습니다.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [toast, setLocation]);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    // Reset scores
    const newScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Calculate scores based on answers
    testQuestions.forEach((question, qIndex) => {
      const answerIndex = answers[qIndex];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        Object.keys(selectedOption.score).forEach(key => {
          newScores[key as keyof typeof newScores] += selectedOption.score[key] || 0;
        });
      }
    });

    // Determine personality type
    let personalityType = '';
    personalityType += newScores.E > newScores.I ? 'E' : 'I';
    personalityType += newScores.S > newScores.N ? 'S' : 'N';
    personalityType += newScores.T > newScores.F ? 'T' : 'F';
    personalityType += newScores.J > newScores.P ? 'J' : 'P';

    setLocation(`/results/${personalityType}`);
  };

  const isCurrentQuestionAnswered = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === testQuestions.length - 1;

  if (!testQuestions || testQuestions.length === 0) {
    return (
      <Card className="bg-white rounded-2xl shadow-lg p-8">
        <CardContent className="pt-6 text-center">
          <p className="text-slate-600">테스트를 불러오는 중...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <ProgressBar
        current={currentQuestion + 1}
        total={testQuestions.length}
        percentage={((currentQuestion + 1) / testQuestions.length) * 100}
      />

      <QuestionCard
        question={testQuestions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        selectedOption={answers[currentQuestion]}
        onOptionSelect={(optionIndex) => handleAnswerSelect(currentQuestion, optionIndex)}
      />

      <div className="flex justify-between mt-8">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="ghost"
          className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium"
        >
          이전
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered}
          className="bg-primary text-white px-8 py-2 rounded-full font-semibold hover:bg-primary/90"
        >
          {isLastQuestion ? "결과 보기" : "다음"}
        </Button>
      </div>
    </div>
  );
}
