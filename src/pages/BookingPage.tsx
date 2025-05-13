
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { useAppContext } from "@/context/AppContext";
import { getDoctorById } from "@/data/mockData";
import BackButton from "@/components/ui/BackButton";
import DatePicker from "@/components/booking/DatePicker";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, BadgeCheck, Star } from "lucide-react";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedDoctor, setSelectedDoctor, addAppointment, isAuthenticated } = useAppContext();
  const [doctor, setDoctor] = useState(selectedDoctor || (id ? getDoctorById(id) : null));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!doctor && id) {
      const foundDoctor = getDoctorById(id);
      if (foundDoctor) {
        setDoctor(foundDoctor);
        setSelectedDoctor(foundDoctor);
      } else {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على بيانات الطبيب",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [id, doctor, setSelectedDoctor, navigate, toast]);

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يرجى تسجيل الدخول لحجز موعد",
        variant: "destructive",
      });
      navigate('/login', { state: { returnUrl: `/book/${id}` } });
      return;
    }

    if (!doctor || !selectedDate || !selectedTime) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار التاريخ والوقت",
        variant: "destructive",
      });
      return;
    }

    try {
      addAppointment(doctor.id, selectedDate, selectedTime);
      toast({
        title: "تم الحجز بنجاح",
        description: `تم حجز موعد مع ${doctor.name} في ${selectedDate} - ${selectedTime}`,
      });
      navigate('/appointments');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حجز الموعد",
        variant: "destructive",
      });
    }
  };

  if (!doctor) {
    return (
      <PageContainer>
        <div className="p-4">
          <BackButton />
          <div className="flex justify-center items-center h-80">
            <p>جاري تحميل البيانات...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="p-4 pb-28">
        <BackButton label="العودة" />
        
        <h1 className="text-xl font-bold mt-4">حجز موعد</h1>
        
        {/* Doctor Info Card */}
        <Card className="mt-4">
          <CardContent className="p-4">
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
                <div className="flex items-center">
                  <h2 className="font-bold text-lg">{doctor.name}</h2>
                  <div className="mr-2 flex items-center text-sm text-yellow-500">
                    <Star size={16} className="fill-yellow-400 text-yellow-400 ml-1" />
                    {doctor.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="ml-1" />
                  {doctor.location}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-sm text-medical-600">
                    <BadgeCheck size={14} className="ml-1" />
                    {doctor.experience} سنوات خبرة
                  </div>
                  <div className="font-bold text-medical-600">
                    {doctor.price} ر.س
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Booking Steps */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-medical-500 text-white flex items-center justify-center ml-2">
              <Calendar size={18} />
            </div>
            <h2 className="font-bold">اختر التاريخ</h2>
          </div>
          
          <DatePicker 
            availableDates={doctor.availableDates}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
        
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-medical-500 text-white flex items-center justify-center ml-2">
              <Clock size={18} />
            </div>
            <h2 className="font-bold">اختر الوقت</h2>
          </div>
          
          {selectedDate ? (
            <TimeSlotPicker 
              onSelectTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">يرجى اختيار تاريخ أولًا</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Confirmation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">سعر الكشف</span>
            <span className="font-bold text-lg">{doctor.price} ر.س</span>
          </div>
          <Button 
            onClick={handleConfirmBooking}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-medical-500 hover:bg-medical-600 text-white py-6 disabled:bg-gray-300"
          >
            تأكيد الحجز
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default BookingPage;
