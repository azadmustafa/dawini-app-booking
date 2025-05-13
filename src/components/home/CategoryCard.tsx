
import { DoctorCategory } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Heart, Stethoscope, Eye, Baby, HeartPulse, Activity } from 'lucide-react';

interface CategoryCardProps {
  category: DoctorCategory;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  tooth: Activity, // تم تغيير Tooth إلى Activity لأن Tooth غير موجود في المكتبة
  eye: Eye,
  baby: Baby,
  'heart-pulse': HeartPulse,
  allergens: Heart,
};

const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  const Icon = iconMap[category.icon] || Stethoscope;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all",
        isSelected
          ? "bg-medical-500 text-white"
          : "bg-white text-gray-700 border border-gray-200 hover:border-medical-300"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-2",
          isSelected ? "bg-white text-medical-500" : "bg-medical-50 text-medical-500"
        )}
      >
        <Icon size={24} />
      </div>
      <h3 className="text-sm font-medium">{category.arabicName}</h3>
      <p className={cn("text-xs mt-1", isSelected ? "text-white" : "text-gray-500")}>
        {category.count} طبيب
      </p>
    </div>
  );
};

export default CategoryCard;
