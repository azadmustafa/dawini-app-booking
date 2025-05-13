
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
}

const BackButton = ({ label }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-700 font-medium"
    >
      <ArrowRight className="w-5 h-5 ml-1" />
      {label || "رجوع"}
    </button>
  );
};

export default BackButton;
