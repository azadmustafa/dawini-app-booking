
import { promotions } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tag, CalendarRange } from "lucide-react";

const PromotionsPreview = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">العروض والخصومات</h2>
        <Link to="/promotions" className="text-sm text-medical-500">
          عرض الكل
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {promotions.slice(0, 4).map((promo) => (
          <Card key={promo.id} className="overflow-hidden h-full">
            <div className="relative h-28 bg-gray-100">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-0 left-0 bg-medical-500 text-white px-2 py-0.5 text-sm font-bold">
                {promo.discount}
              </div>
            </div>
            <CardContent className="p-2">
              <h3 className="font-medium text-xs mb-1 line-clamp-1">{promo.title}</h3>
              <div className="flex flex-col text-xs text-gray-500">
                <div className="flex items-center">
                  <Tag size={10} className="ml-1" />
                  <span className="line-clamp-1">{promo.category}</span>
                </div>
                <div className="flex items-center mt-0.5">
                  <CalendarRange size={10} className="ml-1" />
                  <span>ينتهي: {promo.validUntil}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromotionsPreview;
