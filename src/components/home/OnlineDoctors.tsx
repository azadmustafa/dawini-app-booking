
import { useState, useEffect } from "react";
import { doctors } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const OnlineDoctors = () => {
  // Set random doctors as online (about 10% of the total)
  const [onlineDoctors, setOnlineDoctors] = useState<typeof doctors>([]);
  
  useEffect(() => {
    // Get random doctors with online status
    const doctorsWithOnlineStatus = doctors.map(doctor => ({
      ...doctor,
      isOnline: Math.random() < 0.1
    })).filter(doctor => doctor.isOnline).slice(0, 10);
    
    setOnlineDoctors(doctorsWithOnlineStatus);
  }, []);

  if (onlineDoctors.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">أطباء متاحون الآن</h2>
        <Link to="/online-doctors" className="text-sm text-green-500">
          عرض الكل
        </Link>
      </div>
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-3">
          {onlineDoctors.map((doctor) => (
            <Link
              to={`/doctor/${doctor.id}`}
              key={doctor.id}
              className="flex-none w-44"
            >
              <Card className="h-full hover:shadow-md transition-shadow border-green-100">
                <div className="relative p-3 flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage 
                        src={doctor.image || `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`;
                        }}
                      />
                      <AvatarFallback>{doctor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                  </div>
                  <CardContent className="p-0 pt-2 text-center">
                    <h3 className="font-medium text-sm line-clamp-1">{doctor.name}</h3>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{doctor.specialty}</p>
                    <div className="flex items-center justify-center">
                      <Star className="text-yellow-400 w-3 h-3 fill-current ml-1" />
                      <span className="text-xs">{doctor.rating}</span>
                    </div>
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center justify-center gap-1">
                        <Video size={10} />
                        استشارة فورية
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineDoctors;
