
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/layout/PageContainer";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MessageSquare, User } from "lucide-react";

const QuestionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { questions, addAnswer, isAuthenticated, currentUser } = useAppContext();
  const [answerContent, setAnswerContent] = useState("");
  const { toast } = useToast();

  const question = questions.find(q => q.id === id);

  const handleAddAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "تنبيه",
        description: "يجب تسجيل الدخول كطبيب للإجابة على الأسئلة",
        variant: "destructive",
      });
      return;
    }
    
    if (currentUser.role !== 'doctor') {
      toast({
        title: "تنبيه",
        description: "فقط الأطباء يمكنهم الإجابة على الأسئلة",
        variant: "destructive",
      });
      return;
    }
    
    if (!id || !answerContent.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة إجابة",
        variant: "destructive",
      });
      return;
    }
    
    const newAnswer = addAnswer(id, answerContent);
    
    if (newAnswer) {
      toast({
        title: "تم إضافة الإجابة بنجاح",
      });
      setAnswerContent("");
    } else {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الإجابة",
        variant: "destructive",
      });
    }
  };

  if (!question) {
    return (
      <PageContainer>
        <div className="p-4">
          <BackButton />
          <div className="mt-10 text-center">
            <h2 className="text-xl font-medium">لم يتم العثور على السؤال</h2>
            <p className="mt-2 text-gray-600">السؤال المطلوب غير موجود أو تم حذفه</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="p-4 pb-24">
        <BackButton />
        
        {/* Question section */}
        <div className="mt-4">
          <span className="text-sm px-2 py-0.5 bg-medical-100 text-medical-700 rounded-full">
            {question.category}
          </span>
          <h1 className="text-xl font-bold mt-2">{question.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <div className="flex items-center">
              <User size={14} className="ml-1" />
              مريض
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="ml-1" />
              {question.date}
            </div>
          </div>
          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="whitespace-pre-line">{question.content}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Answers section */}
        <div className="mt-8">
          <h2 className="font-medium flex items-center">
            <MessageSquare size={18} className="ml-2" />
            الإجابات ({question.answers.length})
          </h2>
          
          {question.answers.length === 0 ? (
            <div className="text-center bg-gray-50 p-6 rounded-lg mt-4">
              <p className="text-gray-500">لا توجد إجابات بعد</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {question.answers.map((answer) => (
                <Card key={answer.id} className="border-r-4 border-r-medical-500">
                  <CardContent className="p-4">
                    <div className="flex items-start mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 ml-3">
                        <img 
                          src={answer.doctorImage} 
                          alt={answer.doctorName} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://via.placeholder.com/40?text=د";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{answer.doctorName}</h3>
                        <p className="text-sm text-gray-600">{answer.specialty}</p>
                      </div>
                      <div className="mr-auto text-sm text-gray-500">
                        <Calendar size={14} className="inline ml-1" />
                        {answer.date}
                      </div>
                    </div>
                    <p className="whitespace-pre-line">{answer.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Add answer form (for doctors only) */}
        {isAuthenticated && currentUser && currentUser.role === 'doctor' && (
          <div className="mt-8">
            <h3 className="font-medium mb-2">إضافة إجابة</h3>
            <form onSubmit={handleAddAnswer}>
              <Textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="اكتب إجابتك هنا..."
                className="min-h-[120px]"
              />
              <Button 
                type="submit"
                className="mt-3 bg-medical-500 hover:bg-medical-600"
              >
                إرسال الإجابة
              </Button>
            </form>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default QuestionDetailPage;
