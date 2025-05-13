
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { hospitals } from "@/data/mockData";
import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HospitalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHospitals = hospitals.filter(
    hospital => hospital.name.includes(searchTerm) ||
    hospital.location.includes(searchTerm) ||
    hospital.specialties.some(specialty => specialty.includes(searchTerm))
  );
  
  return (
    <PageContainer>
      <div className="p-4 pb-24">
        <BackButton label="العودة" />
        <h1 className="text-xl font-bold mt-2 mb-4">المشافي</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="w-full pr-10 rounded-lg border border-gray-200"
            placeholder="البحث عن مشفى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Hospitals List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredHospitals.map((hospital) => (
            <Link to={`/hospital/${hospital.id}`} key={hospital.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-28 h-28 bg-gray-100">
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
                    <h3 className="font-bold">{hospital.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin size={14} className="ml-1" />
                      <span className="line-clamp-1">{hospital.location}</span>
                    </div>
                    <div className="flex items-center text-xs mt-2">
                      <Building2 size={14} className="ml-1 text-gray-500" />
                      <span className="text-gray-600">{hospital.doctorsCount} طبيب</span>
                      <div className="mr-auto flex items-center text-yellow-500">
                        <Star size={14} className="fill-yellow-400 text-yellow-400 ml-1" />
                        {hospital.rating}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <span className="text-xs text-gray-500 px-1">
                          +{hospital.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
          
          {filteredHospitals.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-2">لم يتم العثور على نتائج</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default HospitalsPage;
