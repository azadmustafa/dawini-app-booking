
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  Bell, 
  LogOut,
  LogIn,
  Heart,
  FileText,
  Pill,
  Building2,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  color?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onClick, color = "text-gray-700" }) => (
  <div 
    onClick={onClick} 
    className="flex items-center p-4 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
  >
    <div className={`ml-3 ${color}`}>
      {icon}
    </div>
    <span>{title}</span>
  </div>
);

const MenuPage = () => {
  const { isAuthenticated, logout, currentUser } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    toast({
      title: "تم تسجيل الخروج بنجاح",
    });
    navigate('/');
    setLogoutDialogOpen(false);
  };

  return (
    <PageContainer>
      <div className="p-4 pb-24">
        <h1 className="text-xl font-bold mb-6">القائمة الرئيسية</h1>
        
        {isAuthenticated && currentUser && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden ml-3">
                  {currentUser.profileImage ? (
                    <img 
                      src={currentUser.profileImage} 
                      alt={currentUser.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <User size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{currentUser.fullName}</h3>
                  <p className="text-sm text-gray-600">{currentUser.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="border rounded-lg mb-6">
          <div className="border-b px-4 py-3">
            <h3 className="font-medium text-sm text-gray-500">الرئيسية</h3>
          </div>
          
          <MenuItem
            icon={<Home size={20} />}
            title="الصفحة الرئيسية"
            onClick={() => navigate('/')}
          />
          
          <MenuItem
            icon={<Search size={20} />}
            title="البحث عن طبيب"
            onClick={() => navigate('/search')}
          />
          
          <MenuItem
            icon={<Calendar size={20} />}
            title="مواعيدي"
            onClick={() => navigate('/appointments')}
          />
          
          <MenuItem
            icon={<MessageSquare size={20} />}
            title="الأسئلة والاستشارات"
            onClick={() => navigate('/qa')}
            color="text-medical-500"
          />
        </div>
        
        <div className="border rounded-lg mb-6">
          <div className="border-b px-4 py-3">
            <h3 className="font-medium text-sm text-gray-500">خدمات</h3>
          </div>
          
          <MenuItem
            icon={<Building2 size={20} />}
            title="المشافي"
            onClick={() => navigate('/hospitals')}
          />
          
          <MenuItem
            icon={<Tag size={20} />}
            title="العروض والخصومات"
            onClick={() => navigate('/promotions')}
          />
        </div>
        
        <div className="border rounded-lg mb-6">
          <div className="border-b px-4 py-3">
            <h3 className="font-medium text-sm text-gray-500">صحتي</h3>
          </div>
          
          <MenuItem
            icon={<Heart size={20} />}
            title="تقارير صحية"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
          
          <MenuItem
            icon={<FileText size={20} />}
            title="ملفي الطبي"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
          
          <MenuItem
            icon={<Pill size={20} />}
            title="تذكير الدواء"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
        </div>

        <div className="border rounded-lg mb-6">
          <div className="border-b px-4 py-3">
            <h3 className="font-medium text-sm text-gray-500">الإعدادات</h3>
          </div>
          
          <MenuItem
            icon={<User size={20} />}
            title="الملف الشخصي"
            onClick={() => navigate('/profile')}
          />
          
          <MenuItem
            icon={<Bell size={20} />}
            title="الإشعارات"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
          
          <MenuItem
            icon={<Settings size={20} />}
            title="إعدادات التطبيق"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
          
          <MenuItem
            icon={<HelpCircle size={20} />}
            title="المساعدة والدعم"
            onClick={() => 
              toast({
                title: "قريباً",
                description: "هذه الميزة ستكون متاحة قريباً",
              })
            }
          />
        </div>
        
        {isAuthenticated ? (
          <div className="border rounded-lg">
            <MenuItem
              icon={<LogOut size={20} />}
              title="تسجيل الخروج"
              onClick={handleLogout}
              color="text-red-500"
            />
          </div>
        ) : (
          <div className="border rounded-lg">
            <MenuItem
              icon={<LogIn size={20} />}
              title="تسجيل الدخول"
              onClick={() => navigate('/login')}
              color="text-medical-500"
            />
          </div>
        )}
      </div>

      {/* Logout confirmation dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تسجيل الخروج</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-600 hover:bg-red-700 text-white">
              تسجيل الخروج
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
};

export default MenuPage;
