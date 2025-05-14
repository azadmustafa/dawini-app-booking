
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { promotions } from "@/data/mockData";
import { Link } from "react-router-dom";

const AdvertisementCarousel = () => {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {promotions.slice(0, 5).map((promo) => (
          <CarouselItem key={promo.id} className="md:basis-1/1">
            <Link to={`/doctor/${promo.doctorId}?promo=${promo.id}`}>
              <Card className="overflow-hidden relative h-32 border-0 shadow-sm">
                <img
                  src={promo.image || `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`}
                  alt={promo.title}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `/doctors/doctor${Math.floor(Math.random() * 6) + 1}.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/40 flex flex-col justify-center px-6 text-white">
                  <h3 className="font-bold text-lg">{promo.title}</h3>
                  <p className="text-sm opacity-90">{promo.description}</p>
                  <div className="text-white text-xs mt-2 bg-green-500 w-fit px-2 py-0.5 rounded">
                    خصم {promo.discount}
                  </div>
                </div>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default AdvertisementCarousel;
