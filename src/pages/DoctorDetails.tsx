
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { getDoctorById } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import BackButton from "@/components/ui/BackButton";
import { Star, MapPin, Calendar, Clock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedDoctor } = useAppContext();
  const [doctor, setDoctor] = useState(id ? getDoctorById(id) : null);
  const { toast } = useToast();

  useEffect(() => {
    if (!doctor && id) {
      const foundDoctor = getDoctorById(id);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      } else {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على بيانات الطبيب",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [id, doctor, navigate, toast]);

  const handleBookAppointment = () => {
    if (doctor) {
      setSelectedDoctor(doctor);
      navigate(`/book/${doctor.id}`);
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
      {/* Doctor Header */}
      <div className="h-48 bg-medical-500 relative">
        <div className="absolute top-0 left-0 right-0 p-4">
          <BackButton label="الرئيسية" />
        </div>
        <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
          <h1 className="text-xl font-bold">{doctor.name}</h1>
          <p>{doctor.specialty}</p>
        </div>
      </div>
      
      {/* Doctor Profile Image */}
      <div className="relative h-24 flex justify-center">
        <div className="absolute -top-12 bg-white p-1 rounded-full shadow-md">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://via.placeholder.com/150?text=طبيب";
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Info Cards */}
      <div className="p-4 mt-8 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">سعر الكشف</h3>
          <p className="text-lg font-bold text-medical-600">{doctor.price} ر.س</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">التقييم</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
            <span className="font-bold">{doctor.rating}</span>
            <span className="text-xs text-gray-500 mr-1">({doctor.reviewCount})</span>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">سنوات الخبرة</h3>
          <p className="text-lg font-bold">{doctor.experience} سنوات</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">الموقع</h3>
            <p className="text-sm font-medium truncate">{doctor.location}</p>
          </div>
          <MapPin className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
        </div>
      </div>
      
      {/* About */}
      <div className="p-4 bg-white shadow-sm border-t border-b border-gray-100">
        <h2 className="font-bold text-lg mb-2">عن الطبيب</h2>
        <p className="text-gray-700 text-sm leading-relaxed">{doctor.about}</p>
      </div>
      
      {/* Available Dates Preview */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">المواعيد المتاحة</h2>
          <ChevronLeft className="h-5 w-5 text-gray-400" />
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-medical-500 ml-2" />
            <span className="text-sm">أقرب موعد متاح: اليوم</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-medical-500 ml-2" />
            <span className="text-sm">{doctor.availableDates.length} أيام متاحة</span>
          </div>
        </div>
      </div>
      
      {/* Book Action */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleBookAppointment}
          className="w-full bg-medical-500 hover:bg-medical-600 text-white py-6"
        >
          حجز موعد
        </Button>
      </div>
    </PageContainer>
  );
};

export default DoctorDetails;
