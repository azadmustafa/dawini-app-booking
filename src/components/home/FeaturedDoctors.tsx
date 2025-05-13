
import { featuredDoctors } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedDoctors = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">أطباء متميزون</h2>
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-3">
          {featuredDoctors.map((doctor) => (
            <Link
              to={`/doctor/${doctor.id}`}
              key={doctor.id}
              className="flex-none w-40"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="h-28 overflow-hidden">
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
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">{doctor.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{doctor.specialty}</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-3 h-3 fill-current ml-1" />
                    <span className="text-xs">{doctor.rating}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDoctors;
