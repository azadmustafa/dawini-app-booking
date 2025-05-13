
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

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedDoctor, setSelectedDoctor, addAppointment } = useAppContext();
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
        <div className="flex items-center mt-2 pb-4 border-b border-gray-200">
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
            <h2 className="font-bold">{doctor.name}</h2>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        </div>
        
        {/* Select Date */}
        <div className="mt-6">
          <h2 className="font-bold mb-3">اختر التاريخ</h2>
          <DatePicker 
            availableDates={doctor.availableDates}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
        
        {/* Select Time */}
        <div className="mt-6">
          <h2 className="font-bold mb-3">اختر الوقت</h2>
          {selectedDate ? (
            <TimeSlotPicker 
              onSelectTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-500">يرجى اختيار تاريخ أولًا</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
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
    </PageContainer>
  );
};

export default BookingPage;
