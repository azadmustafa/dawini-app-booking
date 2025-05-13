
import PageContainer from "@/components/layout/PageContainer";
import {
  User,
  Calendar,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const menuItems = [
    { icon: Calendar, label: "مواعيدي", link: "/appointments" },
    { icon: Bell, label: "الإشعارات", link: "#" },
    { icon: CreditCard, label: "طرق الدفع", link: "#" },
    { icon: HelpCircle, label: "المساعدة", link: "#" },
  ];

  return (
    <PageContainer>
      <div className="p-4 pb-20">
        <h1 className="text-xl font-bold mb-6">حسابي</h1>
        
        {/* Profile Card */}
        <Card className="p-4 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center ml-3">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h2 className="font-bold">المستخدم</h2>
              <p className="text-sm text-gray-500">user@example.com</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 border-dashed text-gray-600"
          >
            تعديل الملف الشخصي
          </Button>
        </Card>
        
        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ml-3">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <span>{item.label}</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
        
        {/* Logout Button */}
        <div className="mt-6">
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
