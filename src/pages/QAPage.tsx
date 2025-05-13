
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/layout/PageContainer";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Question, categories } from "@/data/mockData";
import { Calendar, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

const QAPage = () => {
  const { isAuthenticated, currentUser, questions, addQuestion } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].arabicName);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "تنبيه",
        description: "يجب تسجيل الدخول لإضافة سؤال",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!title || !content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    const newQuestion = addQuestion(selectedCategory, title, content);
    
    if (newQuestion) {
      toast({
        title: "تم إضافة السؤال بنجاح",
        description: "سيتم الرد عليك من قبل الأطباء المختصين في أقرب وقت",
      });
      setTitle("");
      setContent("");
      setShowForm(false);
    } else {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة السؤال",
        variant: "destructive",
      });
    }
  };

  // Filter questions based on current user if authenticated
  const filteredQuestions = isAuthenticated && currentUser
    ? questions.filter(q => q.patientId === currentUser.id)
    : questions;

  return (
    <PageContainer>
      <div className="p-4 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <BackButton />
            <h1 className="text-xl font-bold mt-2">الأسئلة والاستشارات</h1>
            <p className="text-sm text-gray-600">اسأل طبيباً واحصل على إجابة سريعة</p>
          </div>
          
          {isAuthenticated && !showForm && (
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-medical-500 hover:bg-medical-600"
            >
              سؤال جديد
            </Button>
          )}
        </div>

        {!isAuthenticated && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-lg font-medium mb-2">يجب تسجيل الدخول</h2>
                <p className="text-gray-600 mb-4">لطرح سؤال أو عرض أسئلتك السابقة، يجب عليك تسجيل الدخول أولاً</p>
                <Link to="/login">
                  <Button className="bg-medical-500 hover:bg-medical-600">
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>إضافة سؤال جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">التخصص الطبي</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.arabicName}>
                        {category.arabicName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">عنوان السؤال</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="أدخل عنوان السؤال بشكل مختصر"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">محتوى السؤال</label>
                  <Textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="اكتب تفاصيل سؤالك هنا..."
                  />
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-medical-500 hover:bg-medical-600 mr-2"
                  >
                    إرسال السؤال
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* List of questions */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-2">
            {isAuthenticated ? "أسئلتي" : "أحدث الأسئلة"}
          </h2>

          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">لا توجد أسئلة حالياً</p>
              </CardContent>
            </Card>
          ) : (
            filteredQuestions.map((question: Question) => (
              <Link key={question.id} to={`/qa/${question.id}`}>
                <Card className="hover:border-medical-300 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm px-2 py-0.5 bg-medical-100 text-medical-700 rounded-full">
                        {question.category}
                      </span>
                      <span className={`text-sm px-2 py-0.5 rounded-full flex items-center ${
                        question.status === 'answered' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {question.status === 'answered' ? (
                          <>
                            <CheckCircle2 size={14} className="ml-1" />
                            تمت الإجابة
                          </>
                        ) : (
                          <>
                            <Clock size={14} className="ml-1" />
                            قيد الانتظار
                          </>
                        )}
                      </span>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{question.title}</h3>
                    <p className="text-gray-600 line-clamp-2 mb-3">{question.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="ml-1" />
                        {question.date}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={14} className="ml-1" />
                        {question.answers.length} {question.answers.length === 1 ? 'إجابة' : 'إجابات'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default QAPage;
