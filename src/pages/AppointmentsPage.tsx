
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAppContext } from "@/context/AppContext";
import { getDoctorById } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AppointmentsPage = () => {
  const { myAppointments, isAuthenticated, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Simple filter for demo purposes
  const upcomingAppointments = myAppointments.filter(app => app.status !== 'cancelled');
  const pastAppointments = []; // In a real app, this would filter by date

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'قيد الانتظار';
      case 'cancelled':
        return 'ملغى';
      default:
        return '';
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: typeof myAppointments[0] }) => {
    const doctor = getDoctorById(appointment.doctorId);
    
    if (!doctor) return null;
    
    return (
      <Card className="mb-4 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 ml-3">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/100?text=طبيب";
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{doctor.name}</h3>
                <div className="flex items-center">
                  {getStatusIcon(appointment.status)}
                  <span className="text-xs mr-1">{getStatusText(appointment.status)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin size={14} className="ml-1" />
                <span className="line-clamp-1">{doctor.location}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 ml-2" />
              <span className="text-sm">{appointment.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 ml-2" />
              <span className="text-sm">{appointment.time}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-500">سعر الكشف</span>
            <span className="font-bold text-medical-600">{doctor.price} ر.س</span>
          </div>
        </div>
      </Card>
    );
  };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <div className="p-4 h-[70vh] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">يجب تسجيل الدخول</h2>
          <p className="text-gray-500 text-center mb-6">
            يرجى تسجيل الدخول لعرض مواعيدك الطبية
          </p>
          <div className="flex gap-3">
            <Button asChild className="bg-medical-500 hover:bg-medical-600">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">مواعيدي</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">المواعيد القادمة</TabsTrigger>
            <TabsTrigger value="past">المواعيد السابقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="min-h-[60vh]">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-2">لا توجد مواعيد قادمة</p>
                <p className="text-sm text-gray-400 mb-6">قم بحجز موعد من الصفحة الرئيسية</p>
                <Button asChild className="bg-medical-500 hover:bg-medical-600">
                  <Link to="/">حجز موعد جديد</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="min-h-[60vh]">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">لا توجد مواعيد سابقة</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default AppointmentsPage;
