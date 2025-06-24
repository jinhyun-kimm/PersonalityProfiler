import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedOption?: number;
  onOptionSelect: (optionIndex: number) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedOption,
  onOptionSelect,
}: QuestionCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-8">
      <CardContent className="pt-6">
        <div className="mb-6">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            질문 {questionNumber}
          </span>
          <h3 className="text-2xl font-semibold text-slate-800 mt-4 leading-relaxed">
            {question.question}
          </h3>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <div
                key={index}
                onClick={() => onOptionSelect(index)}
                className={`border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 ${
                  isSelected ? 'border-primary bg-primary/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-slate-700">{option.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
