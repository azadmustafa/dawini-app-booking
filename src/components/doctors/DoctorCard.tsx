
import { Doctor } from '@/data/mockData';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Link
      to={`/doctor/${doctor.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col h-full">
        <div className="relative h-40 bg-gray-100">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/300x200?text=طبيب"; // Fallback image
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-1">{doctor.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 w-4 h-4 fill-current ml-1" />
            <span className="text-gray-700 font-medium text-sm">{doctor.rating}</span>
            <span className="text-gray-500 text-xs mr-1">({doctor.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-500">{doctor.experience} سنوات خبرة</span>
            <span className="text-medical-600 font-bold">{doctor.price} ر.س</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
