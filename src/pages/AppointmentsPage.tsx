
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAppContext } from "@/context/AppContext";
import { getDoctorById } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppointmentsPage = () => {
  const { myAppointments } = useAppContext();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Simple filter for demo purposes
  const upcomingAppointments = myAppointments.filter(app => app.status !== 'cancelled');
  const pastAppointments = []; // In a real app, this would filter by date

  const AppointmentCard = ({ appointment }: { appointment: typeof myAppointments[0] }) => {
    const doctor = getDoctorById(appointment.doctorId);
    
    if (!doctor) return null;
    
    return (
      <Card className="mb-4 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 ml-3">
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
            <div>
              <h3 className="font-bold">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
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
                <p className="text-sm text-gray-400">قم بحجز موعد من الصفحة الرئيسية</p>
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
