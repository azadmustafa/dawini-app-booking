
import { hospitals } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HospitalsPreview = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">المشافي</h2>
        <Link to="/hospitals" className="text-sm text-medical-500">
          عرض الكل
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {hospitals.slice(0, 3).map((hospital) => (
          <Link to={`/hospital/${hospital.id}`} key={hospital.id}>
            <Card className="overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-100">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://via.placeholder.com/100?text=مشفى";
                    }}
                  />
                </div>
                <CardContent className="p-3 flex-1">
                  <h3 className="font-bold text-sm">{hospital.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="ml-1" />
                    <span className="line-clamp-1">{hospital.location}</span>
                  </div>
                  <div className="flex items-center text-xs mt-1">
                    <Building2 size={12} className="ml-1 text-gray-500" />
                    <span className="text-gray-600">{hospital.doctorsCount} طبيب</span>
                    <div className="mr-auto flex items-center text-yellow-500">
                      <Star size={12} className="fill-yellow-400 text-yellow-400 ml-1" />
                      {hospital.rating}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HospitalsPreview;
