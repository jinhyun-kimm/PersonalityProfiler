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
  const [step, setStep] = useState<'gender' | 'questions' | 'complete'>('gender');
  const [gender, setGender] = useState<'남자' | '여자' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ T: 0, E: 0 });

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

  const handleGenderSelect = (selectedGender: '남자' | '여자') => {
    setGender(selectedGender);
    setStep('questions');
  };

  const calculateResults = () => {
    // Reset scores
    const newScores = { T: 0, E: 0 };

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

    // Determine personality type based on T (테토) vs E (에겐) scores and gender
    let personalityType = '';
    if (newScores.T > newScores.E) {
      personalityType = gender === '남자' ? '테토남' : '테토녀';
    } else {
      personalityType = gender === '남자' ? '에겐남' : '에겐녀';
    }

    setLocation(`/results/${personalityType}`);
  };

  // Gender selection step
  if (step === 'gender') {
    return (
      <Card className="bg-white rounded-2xl shadow-lg p-8">
        <CardContent className="pt-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">성별을 선택해주세요</h2>
          <p className="text-slate-600 mb-8">정확한 결과를 위해 성별을 선택해주세요.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleGenderSelect('남자')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              남자 👨
            </Button>
            <Button
              onClick={() => handleGenderSelect('여자')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              여자 👩
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
