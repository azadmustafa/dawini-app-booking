
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName || !email || !phoneNumber || !password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = register({
        fullName,
        email,
        phoneNumber,
        password,
        role: 'patient'
      });
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً، ${user.fullName}`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
            <CardDescription>أدخل بياناتك لإنشاء حساب جديد</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="محمد أحمد"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="text-right"
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowPassword}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="text-right"
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowPassword}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-medical-500 hover:bg-medical-600"
                disabled={isLoading}
              >
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center flex-col space-y-2">
            <div className="text-center text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-medical-500 hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
