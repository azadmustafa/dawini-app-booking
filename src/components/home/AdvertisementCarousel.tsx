
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { promotions } from "@/data/mockData";

const AdvertisementCarousel = () => {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {promotions.slice(0, 5).map((promo) => (
          <CarouselItem key={promo.id} className="md:basis-1/1">
            <Card className="overflow-hidden relative h-32 border-0 shadow-sm">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-medical-900/80 to-medical-700/40 flex flex-col justify-center px-6 text-white">
                <h3 className="font-bold text-lg">{promo.title}</h3>
                <p className="text-sm opacity-90">{promo.description}</p>
                <div className="text-white text-xs mt-2 bg-medical-500 w-fit px-2 py-0.5 rounded">
                  خصم {promo.discount}
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default AdvertisementCarousel;
