
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { categories, promotions } from "@/data/mockData";
import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, CalendarRange, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const PromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  
  const filteredPromotions = promotions.filter(
    promo => {
      const matchesSearch = promo.title.includes(searchTerm) || 
                            promo.description.includes(searchTerm) || 
                            promo.category.includes(searchTerm);
                            
      const matchesCategory = selectedCategory === "all" || 
                              promo.category === categories.find(c => c.id === selectedCategory)?.arabicName;
                              
      return matchesSearch && matchesCategory;
    }
  );
  
  return (
    <PageContainer>
      <div className="p-4 pb-24">
        <BackButton label="العودة" />
        <h1 className="text-xl font-bold mt-2 mb-4">العروض والخصومات</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="w-full pr-10 rounded-lg border border-gray-200"
            placeholder="البحث عن عروض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Filter */}
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-medical-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-medical-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.arabicName}
              </button>
            ))}
          </div>
        </ScrollArea>
        
        {/* Promotions List */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="grid">شبكة</TabsTrigger>
            <TabsTrigger value="list">قائمة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-2 gap-3">
              {filteredPromotions.map((promo) => (
                <Card key={promo.id} className="overflow-hidden h-full">
                  <div className="relative h-32 bg-gray-100">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-0 left-0 bg-medical-500 text-white px-2 py-0.5 text-sm font-bold">
                      {promo.discount}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1">{promo.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">{promo.description}</p>
                    <div className="flex flex-col text-xs text-gray-500">
                      <div className="flex items-center">
                        <Tag size={12} className="ml-1" />
                        <span>{promo.category}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <CalendarRange size={12} className="ml-1" />
                        <span>ينتهي: {promo.validUntil}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                      <div className="text-xs">
                        رمز الخصم: <span className="font-mono font-bold text-medical-600">{promo.code}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 gap-4">
              {filteredPromotions.map((promo) => (
                <Card key={promo.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 relative bg-gray-100">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-0 left-0 bg-medical-500 text-white px-1 py-px text-xs font-bold">
                        {promo.discount}
                      </div>
                    </div>
                    <CardContent className="p-3 flex-1">
                      <h3 className="font-medium text-sm">{promo.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Tag size={12} className="ml-1" />
                        <span>{promo.category}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <CalendarRange size={12} className="ml-1" />
                        <span>ينتهي: {promo.validUntil}</span>
                      </div>
                      <div className="mt-1 text-xs">
                        <span className="font-mono font-bold text-medical-600">{promo.code}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {filteredPromotions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-2">لا توجد عروض مطابقة للبحث</p>
            </div>
          )}
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default PromotionsPage;
