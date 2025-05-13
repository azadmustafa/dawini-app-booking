
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { doctors, categories } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import SearchBar from "@/components/home/SearchBar";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const SearchPage = () => {
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

  return (
    <PageContainer>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">البحث</h1>
        <SearchBar />
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-500 text-sm">{filteredDoctors.length} نتيجة</p>
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3 w-3 ml-1" />
            فلترة
          </Button>
        </div>
        
        <div className="mt-4 space-y-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">لا توجد نتائج متطابقة مع بحثك</p>
              <p className="text-sm text-gray-400 mt-1">جرب بحثًا آخر أو تصفح التخصصات</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
