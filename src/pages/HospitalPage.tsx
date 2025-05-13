
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAppContext } from "@/context/AppContext";
import { getHospitalById, doctors } from "@/data/mockData";
import BackButton from "@/components/ui/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Star, Users } from "lucide-react";
import DoctorCard from "@/components/doctors/DoctorCard";

const HospitalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(id ? getHospitalById(id) : null);
  const { toast } = useToast();
  
  // Find doctors that work at this hospital (random selection for demo)
  const hospitalDoctors = doctors
    .filter(doctor => doctor.location.includes(hospital?.name || ""))
    .slice(0, 5);
  
  useEffect(() => {
    if (!hospital && id) {
      const foundHospital = getHospitalById(id);
      if (foundHospital) {
        setHospital(foundHospital);
      } else {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على بيانات المستشفى",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [id, hospital, navigate, toast]);
  
  if (!hospital) {
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
      <div className="p-4 pb-24">
        <BackButton label="العودة" />
        
        {/* Hospital Header */}
        <div className="relative h-40 mt-3 rounded-t-lg overflow-hidden">
          <img 
            src={hospital.image} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/400x200?text=مستشفى";
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 right-0 p-4 text-white">
            <h1 className="text-xl font-bold">{hospital.name}</h1>
            <div className="flex items-center mt-1 text-sm">
              <MapPin size={14} className="ml-1" />
              {hospital.location}
            </div>
          </div>
        </div>
        
        {/* Rating and Stats */}
        <Card className="mt-4">
          <CardContent className="p-4 grid grid-cols-3">
            <div className="flex flex-col items-center justify-center border-l">
              <Star className="text-yellow-400 fill-yellow-400 mb-1" />
              <span className="font-bold">{hospital.rating}</span>
              <span className="text-xs text-gray-500">التقييم</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l">
              <Users className="text-medical-500 mb-1" />
              <span className="font-bold">{hospital.doctorsCount}</span>
              <span className="text-xs text-gray-500">طبيب</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-medical-500 font-bold text-lg mb-1">{hospital.specialties.length}</div>
              <span className="text-xs text-gray-500">تخصص</span>
            </div>
          </CardContent>
        </Card>
        
        {/* About */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">نبذة عن المستشفى</h2>
          <Card>
            <CardContent className="p-4 text-sm text-gray-700 leading-relaxed">
              {hospital.description}
            </CardContent>
          </Card>
        </div>
        
        {/* Specialties */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">التخصصات</h2>
          <Card>
            <CardContent className="p-4">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-1">
                  {hospital.specialties.map((specialty, index) => (
                    <div 
                      key={index} 
                      className="bg-medical-50 text-medical-700 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Doctors */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">أطباء المستشفى</h2>
          <div className="grid grid-cols-1 gap-4">
            {hospitalDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HospitalPage;
