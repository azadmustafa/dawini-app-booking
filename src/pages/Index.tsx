
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { categories, doctors } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import SearchBar from "@/components/home/SearchBar";
import CategoryCard from "@/components/home/CategoryCard";
import DoctorCard from "@/components/doctors/DoctorCard";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import AdvertisementCarousel from "@/components/home/AdvertisementCarousel";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import HospitalsPreview from "@/components/home/HospitalsPreview";
import PromotionsPreview from "@/components/home/PromotionsPreview";
import OnlineDoctors from "@/components/home/OnlineDoctors";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  const { searchTerm, selectedCategory, setSelectedCategory, currentUser } = useAppContext();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Filter doctors based on search term and selected category
  useEffect(() => {
    let filtered = [...doctors];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.includes(searchTerm) ||
          doctor.specialty.includes(searchTerm)
      );
    }
    
    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory);
      if (category) {
        filtered = filtered.filter((doctor) => doctor.specialty === category.arabicName);
      }
    }
    
    setFilteredDoctors(filtered);
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <PageContainer className="bg-gray-50">
      {/* Header */}
      <div className="pt-6 pb-3 px-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">
              {currentUser 
                ? `مرحباً ${currentUser.fullName.split(' ')[0]} 👋` 
                : "مرحبًا بك 👋"}
            </h1>
            <p className="text-gray-600 text-sm">دعنا نساعدك في حجز موعد طبي</p>
          </div>
          <Link to="/profile" className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            {currentUser && currentUser.profileImage ? (
              <img 
                src={currentUser.profileImage} 
                alt={currentUser.fullName} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-500" />
            )}
          </Link>
        </div>
        <SearchBar />
      </div>
      
      {/* Advertisement Carousel */}
      <div className="mt-4 px-4">
        <AdvertisementCarousel />
      </div>
      
      {/* Online Doctors */}
      <div className="px-4 pt-5">
        <OnlineDoctors />
      </div>
      
      {/* Featured Doctors */}
      <div className="px-4 pt-5">
        <FeaturedDoctors />
      </div>
      
      {/* Medical Categories */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold mb-3">التخصصات الطبية</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Hospitals Preview */}
      <div className="px-4 py-2">
        <HospitalsPreview />
      </div>
      
      {/* Promotions Preview */}
      <div className="px-4 py-2">
        <PromotionsPreview />
      </div>
      
      {/* Doctors */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.arabicName}`
              : "أطباء متميزون"
            }
          </h2>
          {filteredDoctors.length > 5 && (
            <Link to="/search" className="text-sm text-green-500">
              عرض الكل
            </Link>
          )}
        </div>
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredDoctors.slice(0, 6).map((doctor) => (
              <Link to={`/doctor/${doctor.id}`} key={doctor.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-28 bg-gray-100">
                    <img
                      src={doctor.image || `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`;
                      }}
                    />
                    {doctor.isOnline && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full">
                        متاح
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-bold text-sm line-clamp-1">{doctor.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{doctor.specialty}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-600 font-bold">{doctor.price} ر.س</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg">
            <p className="text-gray-500">لا توجد نتائج متطابقة مع بحثك</p>
          </div>
        )}
      </div>
      
      {/* FAQ Section */}
      <div className="px-4 py-6 bg-white border-t">
        <FAQ />
      </div>
    </PageContainer>
  );
};

export default Index;
