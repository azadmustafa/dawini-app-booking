
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { categories, doctors } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import SearchBar from "@/components/home/SearchBar";
import CategoryCard from "@/components/home/CategoryCard";
import DoctorCard from "@/components/doctors/DoctorCard";
import { User } from "lucide-react";

const Index = () => {
  const { searchTerm, selectedCategory, setSelectedCategory } = useAppContext();
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
            <h1 className="text-xl font-bold">مرحبًا بك 👋</h1>
            <p className="text-gray-600 text-sm">دعنا نساعدك في حجز موعد طبي</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <SearchBar />
      </div>
      
      {/* Categories */}
      <div className="px-4 py-5">
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
      
      {/* Top Doctors */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold mb-3">
          {selectedCategory 
            ? `${categories.find(c => c.id === selectedCategory)?.arabicName}`
            : filteredDoctors.length === doctors.length
            ? "أطباء مميزون"
            : "نتائج البحث"
          }
        </h2>
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg">
            <p className="text-gray-500">لا توجد نتائج متطابقة مع بحثك</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Index;
